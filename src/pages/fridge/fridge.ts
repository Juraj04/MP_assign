import {Component} from '@angular/core';
import {Events, IonicPage, NavController} from 'ionic-angular';
import {FridgeProvider} from "../../providers/fridge/fridge";
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

  constructor(private navCtrl: NavController,
              private fridge: FridgeProvider,
              private events: Events) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FridgePage');
  }

  showProducts(item: RecipeItem) {

    this.events.publish("search_from_fridge", item.food.name)
    this.navCtrl.parent.select(0);
  }

  SwipeToProducts() {
    this.navCtrl.parent.select(0);
  }
}
