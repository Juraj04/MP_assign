import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {DummyDatabaseProvider} from '../../providers/dummy-database/dummy-database';

import {Product} from '../../models/product'
import {SelectRightProviderProvider} from "../../providers/select-right-provider/select-right-provider";
import {DatabaseProvider} from "../../providers/database/database";
import {ProductDetailPage} from "../product-detail/product-detail";
import {NewProductPage} from "../new-product/new-product";
import {ProductStoreProvider} from "../../providers/product-store/product-store";

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
    products: Product[]= [];
    allProducts: Product[] = [];


    constructor(public navCtrl: NavController, public navParams: NavParams, private productStore: ProductStoreProvider) {

    }

    ionViewDidLoad() {
        this.productStore.products.subscribe(data => {
            this.allProducts = data
            this.products = this.allProducts;
        })
    }

    itemSelected(product) {
        this.navCtrl.push(ProductDetailPage, {
            product: product
        });
    }

    gotoCreateProduct() {
        this.navCtrl.push(NewProductPage, {});
    }
}


