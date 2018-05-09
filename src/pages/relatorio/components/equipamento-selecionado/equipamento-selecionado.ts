import { Component, OnInit } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-equipamento-selecionado',
  templateUrl: 'equipamento-selecionado.html',
})
export class EquipamentoSelecionadoPage implements OnInit {

  public equipamentoSelecionado;
  public model: string = '';
  public numberEquipments: string = '';
  public quantity: number = 1;
  public pecasSelecionadas = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
  ) { }

  ngOnInit() {
    this.equipamentoSelecionado = this.navParams.get('equipamento');
  }



  setModelEquipments(model) {
    this.model = model;
  }

  showCheckbox() {
    const alert = this.alertCtrl.create();
    alert.setTitle('Selecione os itens!');

    this.equipamentoSelecionado.pecas.map((peca) => {
      return  alert.addInput({
        type: 'checkbox',
        label: peca.descricao,
        value: peca,
      });
    });


    alert.addButton('Cancelar');
    alert.addButton({
      text: 'Ok',
      handler: (data) => {
        const pecas = data.map((peca) => {
          const quantidade = 1;
          return { ...peca, quantidade };
        });
        this.pecasSelecionadas = [...this.pecasSelecionadas, ...pecas];
      },
    });
    alert.present();
  }

  modifyQuantity(peca, action) {

  }

}
