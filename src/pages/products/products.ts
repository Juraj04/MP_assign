import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {DummyDatabaseProvider} from '../../providers/dummy-database/dummy-database';

import {Product} from '../../models/product'
import {SelectRightProviderProvider} from "../../providers/select-right-provider/select-right-provider";
import {DatabaseProvider} from "../../providers/database/database";
import {ProductDetailPage} from "../product-detail/product-detail";
import {NewProductPage} from "../new-product/new-product";
import {ProductStoreProvider} from "../../providers/product-store/product-store";
import {EditProductPage} from "../edit-product/edit-product";
import {Food} from "../../models/food";

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

    food: Food;


    constructor(public navCtrl: NavController, private productStore: ProductStoreProvider,public navParams: NavParams) {
        if(navParams.get("food") != null){
            this.food = navParams.get("food");
        }
    }

    ionViewDidLoad() {
        this.productStore.products.subscribe(data => {
            this.allProducts = data;
            this.products = this.allProducts;

            if(this.food != null)
                this.sortProductsByFood();
        })

    }
    doRefresh($event) {
        this.ionViewDidLoad();
        $event.complete();
    }

    productDetail(product) {
        this.navCtrl.push(ProductDetailPage, {
            product: product
        });
    }

    editProduct(product) {
        this.navCtrl.push(NewProductPage, {
            product: product,
            create: false
        })
    }

    removeProduct(product){
        this.productStore.deleteProduct(product);
    }

    createProduct() {
        this.navCtrl.push(NewProductPage, {
            create: true
        });
    }

    selectProducts() {

        //TODO: OPRAVIT
        if (this.searchInput.trim() == "") {
            this.products = this.allProducts;
            return;
        }
        /*
        let tgs: string[] = this.searchInput.toLowerCase().split(" ");
        console.log(tgs);
        console.log(tgs.length)*/

        this.products = [];
        this.products.length = 0;
        this.products = this.allProducts.filter(value => value.tags.indexOf(this.searchInput.toLowerCase().trim()) > -1);
        /*
         for (let i = 0; i < tgs.length; i++) {
         let helpArray = this.allProducts.filter(value => value.tags.indexOf(tgs[i].trim()) > -1);
         this.addArrays(this.products, helpArray);
         }*/

    }

    sortProductsByFood(){
        this.products = this.allProducts.filter(value => value.food.id == this.food.id);
    }
}


