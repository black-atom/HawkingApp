import { Component } from '@angular/core';
import {
  AlertController,
  NavParams,
  NavController,
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
} from '../../redux/reducers/atividade.reduce';

@Component({
  selector: 'atividade-detail',
  templateUrl: 'atividade-detail.html',
})
export class AtividadeDetail {

  public atividade;
  public title = 'Detalhes';
  public actionSegments = 'acoes';
  private tecnicoId: string;

  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    private navParams: NavParams,
    private launchNavigator: LaunchNavigator,
    private store: Store<State>,
  ) {
    this.atividade = this.navParams.get('id');
    this.store.select('login').subscribe(user => this.tecnicoId = user._id);
  }

  criarAtividade() {
    this.store.dispatch(new CriarAtividade(this.tecnicoId, this.atividade));
  }

  criarAtividadeDescricao({ descricao }) {
    this.store.dispatch(new CriarAtividadeDescricao(this.tecnicoId, this.atividade, descricao));
  }

  iniciarAtividade() {
    const { atividade_id } = this.atividade;
    this.store.dispatch(new IniciaAtividade(atividade_id));
  }

  finalizarAtividade() {
    const { atividade_id } = this.atividade;
    this.store.dispatch(new FinalizaAtividade(atividade_id));
  }

  inicializaDeslocamento() {
    if (!this.atividade.tipo && this.atividade !== 'outros') return this.criarAtividade();
    const { atividade_id } = this.atividade;
    this.store.dispatch(new InicializaDeslocamento(atividade_id));
  }

  finalizaDeslocamento() {
    const { atividade_id } = this.atividade;
    this.store.dispatch(new FinalizaDeslocamento(atividade_id));
  }

  pausaAtividade() {
    const { atividade_id } = this.atividade;
    this.store.dispatch(new PauseAtividade(atividade_id));
  }
  openGPS() {
    const { atendimento: { endereco } } = this.atividade;
    endereco && this.launchNavigator
      .navigate(`${endereco.numero} ${endereco.rua},${endereco.bairro},${endereco.cidade}`);
  }
  openRelatorioInteracaoPage(atividade) {
    this.navCtrl.push(RelatorioInteracaoPage, { atividade });
  }


  showPrompt() {
    const prompt = this.alertCtrl.create({
      title: 'Descrição da Atividade',
      message: 'Digite a descrição da atividade',
      inputs: [
        {
          name: 'descricao',
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
            this.criarAtividadeDescricao(data);
          },
        },
      ],
    });
    prompt.present();
  }

}
