import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Food} from "../../models/food";
import {DatabaseProvider} from "../../providers/database/database";
import {DummyDatabaseProvider} from "../../providers/dummy-database/dummy-database";
import {ProductStoreProvider} from "../../providers/product-store/product-store";

/**
 * Generated class for the NewProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-product',
  templateUrl: 'new-product.html',
})
export class NewProductPage {

  name: string;
  location: string;
  price: number;
  rating: number = 0;
  quantity: number;
  food: Food;
  photo: string;
  tags: string = "";



  constructor(public navCtrl: NavController, public navParams: NavParams, private productStore:ProductStoreProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewProductPage');
  }

  createProduct(){
    var tgs: string[] = this.tags.split(" ");
  }

}
