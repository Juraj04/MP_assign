import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {Food} from "../../models/food";
import {DatabaseProvider} from "../../providers/database/database";
import {DummyDatabaseProvider} from "../../providers/dummy-database/dummy-database";
import {ProductStoreProvider} from "../../providers/product-store/product-store";
import {AddFoodComponent} from "../../components/add-food/add-food";
import {Product} from "../../models/product";
import {getSystemData} from "@ionic/app-scripts";

/**
 * Generated class for the NewProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-product',
  templateUrl: 'new-product.html',
})
export class NewProductPage {

  name: string;
  location: string;
  price: number;
  rating: number = 0;
  quantity: number;
  food: Food;
  photo: string;
  tags: string = "";



  constructor(public navCtrl: NavController, public modal: ModalController, private productStore:ProductStoreProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewProductPage');
  }

  createProduct(){
    var tgs: string[] = this.tags.split(" ");
    tgs.push(this.name.replace(" ",""));
    tgs.push(this.location.replace(" ",""));
    tgs.push(this.food.name.replace(" ",""));

    let product: Product = new Product(this.name, this.location, this.price, "sss", this.rating, this.quantity, 0, this.food, "hhh", tgs);

    this.productStore.addProduct(product);
    this.navCtrl.pop();

  }

  addFood(){
    let modal = this.modal.create(AddFoodComponent);
    modal.onDidDismiss(data => {
      if (data == null) return;
      this.food = data.recipeItem.food;
    });

    modal.present();
  }


}
