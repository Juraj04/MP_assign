import {Component} from '@angular/core';
import {AlertController, Events, IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import {Recipe} from "../../models/recipe";
import {FridgeProvider} from "../../providers/fridge/fridge";
import {RecipeItem} from "../../models/recipeItem";
import {RecipeStore} from "../../providers/recipe-store/recipe-store";
import {ProductStoreProvider} from "../../providers/product-store/product-store";
import {RecipeDetailPopoverComponent} from "../../components/recipe-detail-popover/recipe-detail-popover";
import {NewRecipePage} from "../new-recipe/new-recipe";
import {Product} from "../../models/product";
import {min} from "rxjs/operator/min";
import {Unit} from "../../models/food";

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
  private missing: Set<RecipeItem> = new Set<RecipeItem>();


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private recipeStore: RecipeStore,
              private productsStore: ProductStoreProvider,
              public popoverCtrl: PopoverController,
              public fridge: FridgeProvider,
              public alertCtrl: AlertController,
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
        message: "Following products was reduced from fridge \n" + usedProductsString,
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
