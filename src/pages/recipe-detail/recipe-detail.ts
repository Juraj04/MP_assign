import {Component} from '@angular/core';
import {AlertController, Events, IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import {Recipe} from "../../models/recipe";
import {FridgeProvider} from "../../providers/fridge/fridge";
import {RecipeItem} from "../../models/recipeItem";
import {RecipeStoreProvider} from "../../providers/recipe-store/recipe-store";
import {ProductStoreProvider} from "../../providers/product-store/product-store";
import {RecipeDetailPopoverComponent} from "../../components/recipe-detail-popover/recipe-detail-popover";
import {NewRecipePage} from "../new-recipe/new-recipe";
import {Food, Unit} from "../../models/food";

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
  recipe: Recipe;
  originalRecipe: Recipe;
  missing: Map<Food,number> = new Map<Food,number>();
  data: string = "ingredients";

  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private recipeStore: RecipeStoreProvider,
              private productsStore: ProductStoreProvider,
              private popoverCtrl: PopoverController,
              private fridge: FridgeProvider,
              private alertCtrl: AlertController,
              private events: Events) {
    this.recipe = this.navParams.get("recipe");
    this.originalRecipe = this.recipe;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecipeDetailPage');
    console.log(this.recipe);
  }

  ionViewWillLeave() {
    this.recipeStore.updateRecipe(this.originalRecipe, this.recipe);
  }

  checkFood(item: RecipeItem): boolean {
    let missingCount = this.fridge.howMuchMissing(item)

    if (missingCount  == 0) {
      this.missing.delete(item.food)
    } else {
      this.missing.set(item.food,missingCount)
    }
    return missingCount == 0
  }


  prepareFood() {
    console.log(this.missing)
    if (this.missing.size > 0) {

      let missingFoodString: string = "<ul class='no-balls'>"


      for (let entry of Array.from(this.missing.entries())) {
        let food:Food = entry[0];
        let count:number = entry[1];
        missingFoodString += "<li>"+food.name + " " + count + " " + Unit[food.unit]  + "</li>"
      }

      missingFoodString += "</ul>"

      this.alertCtrl.create({
        title: "No enough food",
        message: "There is no enough food in you fridge\n" + missingFoodString,
        buttons: ["Ok"]
      }).present();
    } else {

      let usedProductsString: string = "<ul class='no-balls'>"

      for (let item of this.recipe.items) {
        let suitableProducts = this.productsStore.getProductByFood(item.food);

        let balance = item.count;

        for (let sp of suitableProducts) {
          if (balance == 0) break
          var count = Math.min(balance, sp.count_fridge)
          balance -= count
          sp.count_fridge -= count
          usedProductsString += "<li>"+sp.name + " " + count + " " + Unit[sp.food.unit]  + "</li>"
          this.productsStore.updateProduct(sp,sp);
        }
      }
      usedProductsString += "</ul>"


      this.alertCtrl.create({
        title: "Recipe cooked",
        message: "Amount of following products was removed \n" + usedProductsString,
        buttons: ["Ok"]
      }).present();


    }
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
      this.recipe.refreshArray();
    }

  }

  ratingMinus() {
    if (this.recipe.rating > 1) {
      this.recipe.rating--;
      this.recipeStore.updateRecipe(this.originalRecipe, this.recipe);
      this.recipe.refreshArray();
    }
  }

  presentPopover(event) {
    let popover = this.popoverCtrl.create(RecipeDetailPopoverComponent, {recipe: this.recipe});
    popover.present({
      ev: event
    });
    popover.onDidDismiss((data) => {
      if (data == null) return;

      this.navCtrl.pop();
      if (data.edit && data != null) {
        this.navCtrl.push(NewRecipePage, {
          recipe: this.recipe,
          create: false
        })
      }
    })
  }

  onTagClick(tag){
    this.events.publish("on_recipe_tag_click",tag)
    this.navCtrl.pop()
  }

  showProducts(item: RecipeItem){

    this.events.publish("search_from_fridge", item.food.name)
    this.navCtrl.parent.select(0);
    this.navCtrl.pop()
  }

}
