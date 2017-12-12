import { Component } from '@angular/core';
import {Events, IonicPage, ModalController, NavController, NavParams, PopoverController, Toast} from 'ionic-angular';
import {Product} from "../../models/product";
import {ProductStoreProvider} from "../../providers/product-store/product-store";
import {GoogleMapsWindowPage} from "../google-maps-window/google-maps-window";
import {AddProductToFridgeComponent} from "../../components/add-product-to-fridge/add-product-to-fridge";
import {RecipeDetailPopoverComponent} from "../../components/recipe-detail-popover/recipe-detail-popover";
import {NewProductPage} from "../new-product/new-product";

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
  product: Product
  originalProduct: Product;

  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private productStore: ProductStoreProvider,
              private modal: ModalController,
              private popoverCtrl: PopoverController,
              private events: Events) {
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
    let count: number;
    count = this.product.count_fridge == 0 ? this.product.quantity : this.product.count_fridge;
    let modal = this.modal.create(AddProductToFridgeComponent, {
      quantity: count
    });

    modal.onDidDismiss(data => {
      if (data == null) return;
      console.log(data.countInFridge);
      this.product.count_fridge = data.countInFridge;
      this.productStore.updateProduct(this.originalProduct, this.product);

    });
    modal.present();
  }

  presentPopover(event) {
    let popover = this.popoverCtrl.create(RecipeDetailPopoverComponent, {product: this.product});
    popover.present({
      ev: event
    });
    popover.onDidDismiss((data) => {
      if(data == null) return;
      this.navCtrl.pop();
      if(data.edit && data != null){
        this.navCtrl.push(NewProductPage, {
          product: this.product,
          create: false
        })
      }

    })
  }

  onTagClick(tag){
    this.events.publish("on_product_tag_click",tag)
    this.navCtrl.pop()
  }

}
