import {Component} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams, ToastController} from 'ionic-angular';
import {RecipeItem} from "../../models/recipeItem";
import {AddFoodComponent} from "../../components/add-food/add-food";
import {Recipe} from "../../models/recipe";
import {RecipeStore} from "../../providers/recipe-store/recipe-store";
import {PictureManagerProvider} from "../../providers/picture-manager/picture-manager";
import {RecipeDetailPage} from "../recipe-detail/recipe-detail";

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
  tags: string = "";
  recipe: Recipe;
  originalRecipe: Recipe;
  create: Boolean;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modal: ModalController,
              private recipeStore: RecipeStore,
              private toastCtrl: ToastController,
              private pictureManager: PictureManagerProvider) {
    this.create = navParams.get("create");
    if (this.create) {
      let tgs: string[];
      let items: RecipeItem[] = [];
      this.recipe = new Recipe("", null, null, 3, 2, "", "./assets/img/default-placeholder.png", items, tgs);
    } else {
      this.recipe = navParams.get("recipe");
      this.originalRecipe = this.recipe;
      this.showTags()
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewRecipePage');
  }

  createRecipe() {
    if (this.validInput()) {
      this.recipe.name = this.recipe.name.trim();
      let tgs: Set<string> = new Set<string>();
      tgs.add(this.recipe.name.toLowerCase().replace(/ /g, ""));
      if (this.tags != "") {
        let arrayTgs = this.tags.toLowerCase().trim().split(" ");
        for (let i = 0; i < arrayTgs.length; i++) {
          if (arrayTgs[i] != " " && arrayTgs[i] != "")
            tgs.add(arrayTgs[i]);
        }
      }
      this.recipe.items.forEach(value => tgs.add(value.food.name));
      this.recipe.tags = Array.from(tgs);

      switch (this.create) {
        case true: {
          //tgs.push(this.recipe.name.toLowerCase().trim().replace(" ", ""));

          this.recipeStore.addRecipe(this.recipe);
          this.navCtrl.pop();
          this.navCtrl.push(RecipeDetailPage, {
            recipe: this.recipe
          });
          break;
        }
        case false: {
          this.recipeStore.updateRecipe(this.originalRecipe, this.recipe);
          this.navCtrl.pop();
          this.navCtrl.push(RecipeDetailPage, {
            recipe: this.recipe
          });
          break;
        }
      }
    }
  }

  takeAPhoto() {
    this.pictureManager.takeAPhoto().then(imageData => {
      if(imageData == null)return;
      this.recipe.photo = imageData;
      console.log("toto je photo v novom recepte: " + this.recipe.photo);
    })
  }

  selectFromGalery() {
    this.pictureManager.selectFromGalery().then(imageData => {
      if(imageData == null)return;
      this.recipe.photo = imageData;
      console.log("toto je galery v novom recepte: " + this.recipe.photo);
    });
  }

  //toto bude treba opravit
  addItem() {
    let modal = this.modal.create(AddFoodComponent, {getCount: true});
    modal.onDidDismiss(data => {
      if (data == null) {
        console.log("addItem - modal-data-null");
        return;
      }
      console.log("addItem - modal-data-NOT-null");
      this.recipe.items.push(data.recipeItem);
    });

    modal.present();
  }

  validInput() {
    if (this.recipe.name.trim() == "") {
      this.presentToast("Insert name!");
      return false
    } else if (this.recipe.portions == 0 && this.recipe.portions != null) {
      this.presentToast("Insert portions!");
      return false
    } else if (this.recipe.time == 0 && this.recipe.time != null) {
      this.presentToast("Insert time!");
      return false
    } else if (this.recipe.items.length == 0) {
      this.presentToast("Add at least one item!");
      return false
    } else {
      return true
    }
  }

  presentToast(message: string) {
    const toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    toast.present();
  }

  showTags() {
    let tgs = "";
    for (let i = 0; i < this.recipe.tags.length; i++) {
      tgs += this.recipe.tags[i] + " ";
    }
    this.tags = tgs;
  }

}
