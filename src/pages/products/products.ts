import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {DummyDatabaseProvider} from '../../providers/dummy-database/dummy-database';

import {Product} from '../../models/product'
import {SelectRightProviderProvider} from "../../providers/select-right-provider/select-right-provider";
import {DatabaseProvider} from "../../providers/database/database";
import {ProductDetailPage} from "../product-detail/product-detail";

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
    private db: DummyDatabaseProvider | DatabaseProvider;


    constructor(public navCtrl: NavController, public navParams: NavParams, select: SelectRightProviderProvider) {
        this.db = select.GetDatabaseProvider();
        this.loadProducts();
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

            }
        })
    }

    itemSelected(product) {
        this.navCtrl.push(ProductDetailPage, {
            product: product
        });
    }
}


