import {
  RemoverEquipamentoSelecionadoPage,
} from './../remover-equipamento-selecionado/remover-equipamento-selecionado';
import { Store } from '@ngrx/store';
import { atendimentosAll } from './../../../../redux/reducers/atendimento.reducer';
import { NavController, NavParams, PopoverController } from 'ionic-angular';
import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { CategoriasPage } from './../categorias/categorias';
import { State } from '../../../../redux/reducers';

@Component({
  selector: 'form-equipamentos-retirados',
  templateUrl: 'form-equipamentos-retirados.html',
})
export class FormEquipamentosRetiradosComponent  implements OnInit {

  subscription : Subscription;

  @Input()
  atividadeSelecionada;
  atividadeSelecionadaStore;

  page = CategoriasPage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private store: Store<State>,
    public popoverCtrl: PopoverController,
  ) {}

  ngOnInit(): void {
    this.store.select(atendimentosAll).subscribe((atendimentos) => {
      this.atividadeSelecionadaStore = atendimentos.
        find(atendimento =>
          atendimento._id === this.atividadeSelecionada.atendimento._id);
    });
  }

  navPageDetail() {
    this.navCtrl.push(this.page, {
      atividade: this.atividadeSelecionada,
      tipoPage: 'retirar',
    });
  }

  editarEquipamento(equipamento) {
    this.navCtrl.push(RemoverEquipamentoSelecionadoPage, {
      equipamento,
      atividade: this.atividadeSelecionada,
      tipoPage: 'retirar',
    });
  }

}
