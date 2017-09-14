import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Product } from '../../Models/Product';

/**
 * Generated class for the ProductsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {
    products: Product[];

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.products = new Array<Product>();
        this.createSomeProducts();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductsPage');
  }

  createSomeProducts() {
      var names = ["voda", "natierka", "maso", "chipsik"];
      var locations = ["prisma", "lidl", "kmarket"];
      var prices = [1, 2, 3, 4, 5];
      var dates = ["1.1.2017", "2.2.2017", "3.3.2017"];
      var ratings = [1, 2, 3, 4, 5];
      var quanTITIES = [0, 85, 9, 13000];
      var counts = [0, 3, 50, 6, 8, 2];

      for (let data of names) {
          this.products.push(new Product(data, locations[Math.round(Math.random() * 10 % locations.length)],
              prices[Math.round(Math.random() * 10 % prices.length)],
              dates[Math.round(Math.random() * 10 % dates.length)],
              ratings[Math.round(Math.random() * 10 % ratings.length)],
              quanTITIES[Math.round(Math.random() * 10 % quanTITIES.length)]));         

      }

      
      
  }

}
