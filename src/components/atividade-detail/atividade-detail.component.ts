import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  AlertController,
  NavParams,
  NavController,
  ToastController,
  PopoverController,
} from 'ionic-angular';
import { LaunchNavigator } from '@ionic-native/launch-navigator';

import {
  RelatorioInteracaoPage,
} from '../../pages/atividades/components/relatorio-interacao/relatorio-interacao.component';
import { State } from '../../redux/reducers';
import { Store } from '@ngrx/store';
import {
  IniciaAtividade,
  FinalizaAtividade,
  InicializaDeslocamento,
  FinalizaDeslocamento,
  PauseAtividade,
  CriarAtividade,
  CriarAtividadeDescricao,
  CancelarAtividade,
  selectButton,
  getAtividadesEmExecucao,
  getAllAtividadesOfToday,
} from '../../redux/reducers/atividade.reduce';
import { configAlertInputAtividade } from '../../utils/AlertInputAtividade';


import { AtividadeI } from '../../models';
import { Subscription } from 'rxjs';

import { ClientDataPage } from '../../pages/client-data/client-data-page';


@Component({
  selector: 'atividade-detail',
  templateUrl: 'atividade-detail.html',
})
export class AtividadeDetail implements OnInit, OnDestroy{

  public atividade: AtividadeI = null;
  public atividadeID: string = null;
  public atividadeTipo: string = null;
  public title = 'Detalhes';
  public actionSegments = 'acoes';
  private tecnicoId: string;
  public configAlertInput = configAlertInputAtividade;
  public buttonState;
  public relatorioTecnico;

  public subscriptions: Subscription[] = [];

  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    private navParams: NavParams,
    public popoverCtrl: PopoverController,
    private launchNavigator: LaunchNavigator,
    public toastCtrl: ToastController,
    private store: Store<State>,
  ) {

  }

  ngOnDestroy() {
    this.subscriptions
      .filter(Boolean)
      .forEach(subscription => subscription.unsubscribe());
  }

  ngOnInit() {
    this.atividadeID = this.navParams.get('id');
    this.atividadeTipo = this.navParams.get('tipo');

    const sub1 = this.atividadeTipo && this.store
      .select(getAtividadesEmExecucao)
      .filter(atividades => atividades.length > 0)
      .map(atividade => atividade[0].atividade_id)
      .mergeMap((id) => {
        this.atividadeID = id;
        return this.store
          .select(getAllAtividadesOfToday)
          .map(atividades => atividades.find(at => at.atividade_id === id));
      })
      .filter(atividade => Boolean(atividade))
      .subscribe((atividade) => {
        this.atividade = atividade;
      });

    const sub2 = this.atividadeID && this.store
      .select(getAllAtividadesOfToday)
      .map(atividades => atividades.find(at => at.atividade_id === this.atividadeID))
      .filter(atividade => Boolean(atividade))
      .subscribe((atividade) => {
        this.atividade = atividade;
      });

    const sub3 = this.store.select('login').subscribe(user => this.tecnicoId = user._id);
    const sub4 = this.store
      .select(selectButton)
      .subscribe(buttonState => this.buttonState = buttonState);

    this.subscriptions = [sub1, sub2, sub3, sub4];
  }

  get selectedButton() {
    const buttonStates = {
      CRIAR_ATIVIDADE: 'iniciar_deslocamento',
      INICIO_DESLOCAMENTO: 'finalizar_deslocamento',
      FIM_DESLOCAMENTO: 'iniciar_atividade',
      INICIO_ATIVIDADE: 'finalizar_atividade',
    };
    const { status= null } = this.atividade || {};
    const defaultTo = this.atividadeTipo === 'outros' ? 'descricao' : 'iniciar_deslocamento';
    return buttonStates[status] || defaultTo;
  }

  criarAtividade() {
    const message = 'Descolamento iniciado com sucesso!';
    this.store.dispatch(new CriarAtividade(this.tecnicoId, this.atividadeTipo));
    this.presentToast(message);
  }

  criarAtividadeDescricao({ descricao }) {
    const message = 'Nova atividade criada!';
    this.store.dispatch(new CriarAtividadeDescricao(this.tecnicoId, this.atividadeTipo, descricao));
    this.presentToast(message);
  }

  cancelarAtividade({ motivo }) {
    const message = 'Atividade cancelada com sucesso!';
    this.store.dispatch(new CancelarAtividade(this.atividadeID, motivo));
    this.presentToast(message);
  }

  iniciarAtividade() {
    const message = 'Atividade iniciada com sucesso!';
    this.store.dispatch(new IniciaAtividade(this.atividadeID));
    this.presentToast(message);
  }

  finalizarAtividade() {
    const message = 'Atividade finalizada com sucesso!';
    this.store.dispatch(new FinalizaAtividade(this.atividadeID));
    this.presentToast(message);
  }

  inicializaDeslocamento() {
    const message = 'Descolamento iniciado com sucesso!';

    if (
      (this.atividadeTipo && this.atividadeTipo !== 'outros') ||
      (
        this.atividade &&
        this.atividade.tipo !== 'outros' &&
        this.atividade.tipo !== 'atendimento' && this.atividade.status === 'PENDENTE'
      )) return this.criarAtividade();

    this.store.dispatch(new InicializaDeslocamento(this.atividadeID));
    this.presentToast(message);
  }

  finalizaDeslocamento() {
    const message = 'Descolamento finalizado com sucesso!';
    this.store.dispatch(new FinalizaDeslocamento(this.atividadeID));
    this.presentToast(message);
  }

  pausaAtividade({ motivo }) {
    const message = 'Atividade foi pausada!';
    this.store.dispatch(new PauseAtividade(this.atividadeID, motivo));
    this.presentToast(message);
  }

  openGPS() {
    const { atendimento: { endereco } } = this.atividade;
    endereco && this.launchNavigator
      .navigate(`${endereco.numero} ${endereco.rua},${endereco.bairro},${endereco.cidade}`);
  }

  openRelatorioInteracaoPage(atividade) {
    this.navCtrl.push(RelatorioInteracaoPage, { atividade });
  }

  showPrompt({ title, message, name, type }) {
    const prompt = this.alertCtrl.create({
      title,
      message,
      inputs: [
        {
          name,
          placeholder: 'digite aqui!',
        },
      ],
      buttons: [
        {
          text: 'cancelar',
          handler: () => { },
        },
        {
          text: 'salvar',
          handler: (data) => {
            if (type === 'cancelar') {
              return this.cancelarAtividade(data);
            }
            if (type === 'pausar') {
              return this.pausaAtividade(data);
            }
            return this.criarAtividadeDescricao(data);
          },
        },
      ],
    });
    prompt.present();
  }

  presentToast(message) {
    const toast = this.toastCtrl.create({
      message,
      duration: 3000,
    });
    toast.present();
  }

  openAssinatura() {
    this.navCtrl.push(ClientDataPage);
  }

}
