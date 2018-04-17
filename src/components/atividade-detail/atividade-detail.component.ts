import { Component } from '@angular/core';
import {
  AlertController,
  NavParams,
  NavController,
  ToastController,
} from 'ionic-angular';
import { LaunchNavigator } from '@ionic-native/launch-navigator';

import {
  RelatorioInteracaoPage,
} from '../../pages/atividades/components/relatorio-interacao/relatorio-interacao.component';
import { AtividadeI } from '../../models';
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
} from '../../redux/reducers/atividade.reduce';
import { configAlertInputAtividade } from '../../utils/AlertInputAtividade';

@Component({
  selector: 'atividade-detail',
  templateUrl: 'atividade-detail.html',
})
export class AtividadeDetail {

  public atividade;
  public title = 'Detalhes';
  public actionSegments = 'acoes';
  private tecnicoId: string;
  public configAlertInput = configAlertInputAtividade;
  public buttonState;

  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    private navParams: NavParams,
    private launchNavigator: LaunchNavigator,
    public toastCtrl: ToastController,
    private store: Store<State>,
  ) {
    this.atividade = this.navParams.get('id');
    this.store.select('login').subscribe(user => this.tecnicoId = user._id);
    this.store.select(selectButton).subscribe(buttonState => {
      this.buttonState = buttonState;
      console.log(buttonState);
    });
  }

  criarAtividade() {
    const message = 'Descolamento iniciado com sucesso!';
    this.store.dispatch(new CriarAtividade(this.tecnicoId, this.atividade));
    this.presentToast(message);
  }

  criarAtividadeDescricao({ descricao }) {
    const message = 'Nova atividade criada!';
    this.store.dispatch(new CriarAtividadeDescricao(this.tecnicoId, this.atividade, descricao));
    this.presentToast(message);
  }

  cancelarAtividade({ motivo }) {
    const message = 'Atividade cancelada com sucesso!';
    const { atividade_id } = this.atividade;
    this.store.dispatch(new CancelarAtividade(atividade_id, motivo));
    this.presentToast(message);
  }

  iniciarAtividade() {
    const message = 'Atividade iniciada com sucesso!';
    const { atividade_id } = this.atividade;
    this.store.dispatch(new IniciaAtividade(atividade_id));
    this.presentToast(message);
  }

  finalizarAtividade() {
    const message = 'Atividade finalizada com sucesso!';
    const { atividade_id } = this.atividade;
    this.store.dispatch(new FinalizaAtividade(atividade_id));
    this.presentToast(message);
  }

  inicializaDeslocamento() {
    const message = 'Descolamento iniciado com sucesso!';
    if (!this.atividade.tipo && this.atividade !== 'outros') return this.criarAtividade();
    const { atividade_id } = this.atividade;
    this.store.dispatch(new InicializaDeslocamento(atividade_id));
    this.presentToast(message);
  }

  finalizaDeslocamento() {
    const message = 'Descolamento finalizado com sucesso!';
    const { atividade_id } = this.atividade;
    this.store.dispatch(new FinalizaDeslocamento(atividade_id));
    this.presentToast(message);
  }

  pausaAtividade({ motivo }) {
    const message = 'Atividade foi pausada!';
    const { atividade_id } = this.atividade;
    this.store.dispatch(new PauseAtividade(atividade_id, motivo));
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

}
