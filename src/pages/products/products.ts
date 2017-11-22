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
    products: Product[] = [];
    allProducts: Product[] = [];
    searchInput: string;


    constructor(public navCtrl: NavController, public navParams: NavParams, private productStore: ProductStoreProvider) {

    }

    ionViewDidLoad() {
        this.productStore.products.subscribe(data => {
            this.allProducts = data
            console.log(data);
            this.products = this.allProducts;

        })

    }

    itemSelected(product) {
        this.navCtrl.push(ProductDetailPage, {
            product: product
        });
    }

    editProduct(product) {

    }

    removeProduct(index) {
        //might work
        let product = this.products[index];
        this.products.splice(index,1);

        let i = this.allProducts.indexOf(product);
        if(this.allProducts.indexOf(product) !== -1){
            this.allProducts.splice(i,1);
        }

    }

    gotoCreateProduct() {
        this.navCtrl.push(NewProductPage, {});
    }

    selectProducts() {
        if (this.searchInput.trim() == "") {
            this.products = this.allProducts;
            return;
        }

        let tgs: string[] = this.searchInput.split(" ");
        this.products = [];
        //my eyes are bleeding from this code as well... :(


        for (var i = 0; i < tgs.length; i++) {
            for (var j = 0; j < this.allProducts.length; j++) {
                for (var k = 0; k < this.allProducts[j].tags.length; k++) {
                    if (tgs[i] == this.allProducts[j].tags[k]) {
                        this.products.push(this.allProducts[j]);
                        break;
                    }
                }
            }
        }
    }
}


