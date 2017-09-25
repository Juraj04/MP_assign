import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, Toast} from 'ionic-angular';
import {Product} from "../../models/product";

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
  product: Product;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.product = navParams.get("product");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailPage');
  }

  clickLocation(){
    console.log(this.product.tags[0]);
  }

  getColorByRating(){
    let colors = ["danger","danger","rating2","rating3", "rating4","rating5"];
    return colors[this.product.rating];
  }

  getEmojiByRating(){
    if (this.product.rating > 2){
      return "md-happy";
    } else {
      return "md-sad";
    }
  }
}
