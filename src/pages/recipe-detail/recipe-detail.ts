import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Recipe} from "../../models/recipe";
import {Food, Unit} from "../../models/food";
import {FridgePage} from "../fridge/fridge";
import {FridgeProvider} from "../../providers/fridge/fridge";
import {RecipeItem} from "../../models/recipeItem";
import {ProductStoreProvider} from "../../providers/product-store/product-store";

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
  private missing: Set<RecipeItem> = new Set<RecipeItem>();

  constructor(public navParams: NavParams, public fridge: FridgeProvider, private alertCtrl: AlertController, private productsStore: ProductStoreProvider) {
    this.recipe = this.navParams.get("recipe");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecipeDetailPage');
  }

  checkFood(food: RecipeItem): boolean {
    let ret = this.fridge.haveEnough(food)

    if (ret) {
      this.missing.delete(food)
    } else {

      this.missing.add(food)
    }

    return ret
  }


  prepareFood() {
    console.log(this.missing)
    if (this.missing.size > 0) {

      //TODO vypisat ktore chybaju

      this.alertCtrl.create({
        title: "No enough food",
        message: "There is no enough food in you fridge",
        buttons: ["Ok"]
      }).present();
    } else {

      for(let item of this.recipe.items){
        let suitableProducts = this.productsStore.getProductByFood(item.food);
        if (suitableProducts.length == 0) {
          //hmm toto by nastat nikdy nemalo
        } else if (suitableProducts.length == 1) {
          // iba jeden najdeny !! parada ez
          console.log(suitableProducts);
          console.log(suitableProducts[0])
          suitableProducts[0].count_fridge -= item.count;
          this.productsStore.updateProduct(suitableProducts[0], suitableProducts[0])

        } else {
          // shit je ich viac co teraz ?
          // TODO
        }
      }


      this.alertCtrl.create({
        title: "Recipe cooked",
        message: "All food was successfully reduced from fridge",
        buttons: ["Ok"]
      }).present();



    }
    console.log("prepareFood()");
  }


}
