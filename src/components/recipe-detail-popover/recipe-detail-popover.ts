import {Component} from '@angular/core';
import {NavController, NavParams, ViewController} from "ionic-angular";
import {NewRecipePage} from "../../pages/new-recipe/new-recipe";
import {Recipe} from "../../models/recipe";
import {RecipeStore} from "../../providers/recipe-store/recipe-store";

/**
 * Generated class for the RecipeDetailPopoverComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'recipe-detail-popover',
  templateUrl: 'recipe-detail-popover.html'
})
export class RecipeDetailPopoverComponent {
  recipe: Recipe;

  constructor(public navCtrl: NavController,
              public params: NavParams,
              public viewCtrl: ViewController,
              private recipeStore: RecipeStore) {
    console.log('Hello RecipeDetailPopoverComponent Component');
    this.recipe = this.params.get("recipe");
  }

  close() {
    this.viewCtrl.dismiss();
  }

  editRecipe() {
    this.navCtrl.push(NewRecipePage, {
      recipe: this.recipe,
      create: false
    })
  }

  removeRecipe() {
    this.navCtrl.pop();
    this.recipeStore.deleteRecipe(this.recipe);
  }
}
