import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {Events, IonicPage, NavController, NavParams} from 'ionic-angular';
import {SelectRightProviderProvider} from "../../providers/select-right-provider/select-right-provider";
import {DatabaseProvider} from "../../providers/database/database";
import {DummyDatabaseProvider} from "../../providers/dummy-database/dummy-database";
import {Recipe} from "../../models/recipe";
import {RecipeDetailPage} from "../recipe-detail/recipe-detail";
import {NewRecipePage} from "../new-recipe/new-recipe";
import {RecipeStore} from "../../providers/recipe-store/recipe-store";

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
  recipes: Recipe[] = [];
  allRecipes: Recipe[] = [];
  searchInput: string = "";

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

  ionViewDidEnter(){
    this.selectRecipes();
  }

  doRefresh($event) {
    this.ionViewDidLoad();
    $event.complete();
  }

  createRecipe() {
    this.navCtrl.push(NewRecipePage, {
      create: true
    });
  }

  onCardClicked(recipe) {
    this.navCtrl.push(RecipeDetailPage, {recipe: recipe});
  }

  onTagClicked(tag) {
    console.log("clicked on tag: " + tag);
    this.searchInput = tag;
    this.selectRecipes();
  }

  selectRecipes() {
    if (this.searchInput != null) {
      if (this.searchInput.trim() == "") {
        this.recipes = this.allRecipes;
        return;
      }
      this.recipes = this.allRecipes.filter(value => value.tags.indexOf(this.searchInput.toLowerCase().trim()) > -1);
    }
  }

  getDifficulty(diff: number): string {
    var a: string[] = ["EASY", "MEDIUM", "HARD"];
    return a[diff - 1];
  }
}
