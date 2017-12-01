import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FridgeProvider} from "../../providers/fridge/fridge";
import {ProductsPage} from "../products/products";
import {Food} from "../../models/food";
import {RecipeItem} from "../../models/recipeItem";

/**
 * Generated class for the FridgePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-fridge',
  templateUrl: 'fridge.html',
})
export class FridgePage {

  constructor(public navCtrl: NavController, public fridge:FridgeProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FridgePage');
  }

  showProducts(item: RecipeItem){
    this.navCtrl.push(ProductsPage, {
      food: item.food
    });
  }

}
