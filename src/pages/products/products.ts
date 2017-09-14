import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';

import { Product } from '../../models/product'

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
    products = [];

    constructor(public navCtrl: NavController, public navParams: NavParams, private db: DatabaseProvider) {

    }

    loadProducts() {
        this.db.getAllProducts().then(data => {
            this.products = data;
        })
        console.log(this.products);
    }

    addProduct(product: Product) {
        this.db.addProduct(product)
            .then(data => {
                this.loadProducts();
            });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ProductsPage');

        this.db.getDatabaseState().subscribe(rdy => {
            if (rdy) {
                this.loadProducts();

                let product = new Product('test_name', "test_location", 123, "01.01.2000", 5, 100, 50);
                this.addProduct(product);
            }
        })
    }

}
