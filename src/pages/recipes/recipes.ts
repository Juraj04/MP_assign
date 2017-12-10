import {Component} from '@angular/core';
import {Events, IonicPage, NavController, NavParams} from 'ionic-angular';
import {SelectRightProviderProvider} from "../../providers/select-right-provider/select-right-provider";
import {DatabaseProvider} from "../../providers/database/database";
import {DummyDatabaseProvider} from "../../providers/dummy-database/dummy-database";
import {Recipe} from "../../models/recipe";
import {RecipeDetailPage} from "../recipe-detail/recipe-detail";
import {NewRecipePage} from "../new-recipe/new-recipe";
import {DifficultyPipe} from "../../pipes/difficulty/difficulty";
import {RecipeStore} from "../../providers/recipe-store/recipe-store";
import {NewProductPage} from "../new-product/new-product";

/**
 * Generated class for the RecipesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',

})
export class RecipesPage {

  myInput: string = "";
  allRecipes: Recipe[] = [];
  recipes: Recipe[] = [];

  constructor(public navCtrl: NavController, private recipeStore: RecipeStore, private events: Events) {

    this.events.subscribe("on_recipe_tag_click",(tag) => {
      this.onTagClicked(tag)
    })

  }

  ionViewDidLoad() {
    this.recipeStore.recipes.subscribe(data => {
      this.allRecipes = data
      this.recipes = this.allRecipes;
    })

  }

  doRefresh($event) {
    this.ionViewDidLoad();
    $event.complete();
  }


  onCardClicked(recipe) {
    this.navCtrl.push(RecipeDetailPage, {recipe: recipe});
  }


  onTagClicked(tag) {
    console.log("clicked on tag: " + tag);
    this.myInput = tag;
    this.onInput(null);
  }

  getDifficulty(diff: number): string {
    var a: string[] = ["EASY", "MEDIUM", "HARD"];
    return a[diff - 1];
  }


  onInput($event) {
    if (this.myInput.trim() == "") {
      this.recipes = this.allRecipes;
      return;
    }

    this.recipes = this.allRecipes.filter(value => value.tags.indexOf(this.myInput.trim()) > -1);

  }

  createRecipe() {
    this.navCtrl.push(NewRecipePage, {
      create: true
    });
  }


  onCancel($event) {

    console.log($event)
  }

}
