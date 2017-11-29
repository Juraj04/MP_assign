import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, Toast} from 'ionic-angular';
import {Product} from "../../models/product";
import {ProductStoreProvider} from "../../providers/product-store/product-store";
import {GoogleMapsWindowPage} from "../google-maps-window/google-maps-window";

/**
 * Generated class for the ProductDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
})
export class ProductDetailPage {
  private product: Product
  private originalProduct: Product;

  constructor(public navCtrl: NavController, public navParams: NavParams, public productStore: ProductStoreProvider) {
    this.product = navParams.get("product");
    this.originalProduct = this.product;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailPage');
    console.log(this.product)
  }

  ionViewWillLeave() {
    this.productStore.updateProduct(this.originalProduct, this.product);
  }

  showInMap() {
    console.log(this.product.location);
    this.navCtrl.push(GoogleMapsWindowPage, {
      location: this.product.location,
      change: false
    })
  }

  getColorByRating() {
    let colors = ["danger", "danger", "rating2", "rating3", "rating4", "rating5"];
    return colors[this.product.rating];
  }

  getEmojiByRating() {
    if (this.product.rating > 2) {
      return "md-happy";
    } else {
      return "md-sad";
    }
  }

  ratingPlus() {
    if (this.product.rating < 5) {
      this.product.rating++;
      this.productStore.updateProduct(this.originalProduct, this.product);
    }

  }

  ratingMinus() {
    if (this.product.rating > 0) {
      this.product.rating--;
      this.productStore.updateProduct(this.originalProduct, this.product);
    }
  }

  addToFridge(){
    this.product.count_fridge = this.product.count_fridge + this.product.quantity
    this.productStore.updateProduct(this.originalProduct, this.product);
    console.log(this.product.count_fridge)
  }
}
