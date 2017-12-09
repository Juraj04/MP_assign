import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Recipe} from "../../models/recipe";
import {Food, Unit} from "../../models/food";
import {RecipeStore} from "../../providers/recipe-store/recipe-store";
import {RecipeDetailPopoverComponent} from "../../components/recipe-detail-popover/recipe-detail-popover";

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
  private originalRecipe: Recipe;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private recipeStore: RecipeStore,
              public popoverCtrl: PopoverController) {
    this.recipe = this.navParams.get("recipe");
  this.originalRecipe = this.recipe;}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecipeDetailPage');
    console.log(this.recipe);
  }

  ionViewWillLeave() {
    this.recipeStore.updateRecipe(this.originalRecipe, this.recipe);
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

  getColorByRating() {
    let colors = ["danger", "danger", "rating2", "rating3", "rating4", "rating5"];
    return colors[this.recipe.rating];
  }

  getEmojiByRating() {
    if (this.recipe.rating > 2) {
      return "md-happy";
    } else {
      return "md-sad";
    }
  }

  ratingPlus() {
    if (this.recipe.rating < 5) {
      this.recipe.rating++;
      this.recipeStore.updateRecipe(this.originalRecipe, this.recipe);
    }

  }

  ratingMinus() {
    if (this.recipe.rating > 0) {
      this.recipe.rating--;
      this.recipeStore.updateRecipe(this.originalRecipe, this.recipe);
    }
  }

  presentPopover(event) {
    let popover = this.popoverCtrl.create(RecipeDetailPopoverComponent, {recipe: this.recipe});
    popover.present({
      ev: event
    });
  }
}
