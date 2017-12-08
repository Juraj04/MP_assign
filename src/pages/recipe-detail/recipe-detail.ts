import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Recipe} from "../../models/recipe";
import {Food, Unit} from "../../models/food";
import {FridgePage} from "../fridge/fridge";
import {FridgeProvider} from "../../providers/fridge/fridge";
import {RecipeItem} from "../../models/recipeItem";

/**
 * Generated class for the RecipeDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recipe-detail',
  templateUrl: 'recipe-detail.html',
})
export class RecipeDetailPage {
  private recipe: Recipe;

  constructor(public navCtrl: NavController, public navParams: NavParams, public fridge: FridgeProvider) {
    this.recipe = this.navParams.get("recipe");
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecipeDetailPage');
  }

  getDifficulty(diff:number):string{
    var a:string[] = [ "EASY", "MEDIUM", "HARD"];
    return a[diff-1];
  }


  getUnit(unit:number){

    return Unit[unit];
  }


  prepareFood(){
    console.log("prepareFood()");
  }


}
