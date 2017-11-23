import {Component} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {RecipeItem} from "../../models/recipeItem";
import {AddFoodComponent} from "../../components/add-food/add-food";
import {Recipe} from "../../models/recipe";
import {SelectRightProviderProvider} from "../../providers/select-right-provider/select-right-provider";
import {DatabaseProvider} from "../../providers/database/database";
import {DummyDatabaseProvider} from "../../providers/dummy-database/dummy-database";
import {RecipeStore} from "../../providers/recipe-store/recipe-store";

/**
 * Generated class for the NewRecipePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-recipe',
  templateUrl: 'new-recipe.html',
})
export class NewRecipePage {

  difficulty: number = 2;
  portions: number;
  time: number;
  name: string;
  items: RecipeItem[] = [];
  description: string;
  tags: string = "";
  photo: string = "http://www.seriouseats.com/images/2015/09/20150914-pressure-cooker-recipes-roundup-09.jpg";

  constructor(public navCtrl: NavController, public modal: ModalController,private recipeStore:RecipeStore) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewRecipePage');
  }

  addItem() {
    let modal = this.modal.create(AddFoodComponent, {showCount : true});
    modal.onDidDismiss(data => {
      if (data == null) return;
      this.items.push(data.recipeItem);
    });

    modal.present();
  }


  createRecipe() {

    var tgs: string[] = this.tags.split(" ");
    this.items.forEach(value => tgs.push(value.food.name));
    var recipe: Recipe = new Recipe(this.name, this.portions, this.time, 5, this.difficulty, this.description, this.photo, this.items, tgs);
    this.recipeStore.addRecipe(recipe);
    this.navCtrl.pop();

  }


}
