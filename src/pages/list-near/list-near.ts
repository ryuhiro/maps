import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { RumahSakitPage } from '../rumah-sakit/rumah-sakit';
import { SpbuPage } from '../spbu/spbu';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-list-near',
  templateUrl: 'list-near.html'
})
export class ListNearPage {

  homeRoot = HomePage
  rumahSakitRoot = RumahSakitPage
  spbuRoot = SpbuPage
  restoranRoot = 'RestoranPage'
  stasiunRoot = 'StasiunPage'
  halteRoot = 'HaltePage'
  cafeRoot = 'CafePage'


  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidEnter() {
    // var latlng = this.navParams.get('location');
    // this.selectSearchResult(latlng);
    console.log("tets")
  }

}
