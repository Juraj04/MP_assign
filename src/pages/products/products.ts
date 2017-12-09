import {Component} from '@angular/core';
import {Events, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Product} from '../../models/product'
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

  constructor(public navCtrl: NavController, private productStore: ProductStoreProvider, private events: Events) {
    this.events.subscribe("search_from_fridge", (item) => {
      this.searchInput = item;
      this.selectProducts();
    })
  }

  ionViewDidLoad() {
    this.productStore.products.subscribe(data => {
      this.allProducts = data;
      this.products = this.allProducts;
    });
    this.selectProducts();
  }
  ionViewDidEnter(){
    this.selectProducts();
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

  removeProduct(product) {
    this.productStore.deleteProduct(product);
  }

  createProduct() {
    this.navCtrl.push(NewProductPage, {
      create: true
    });
  }

  selectProducts() {
    if(this.searchInput != null){
      if (this.searchInput.trim() == "") {
        this.products = this.allProducts;
        return;
      }
      this.products = this.allProducts.filter(value => value.tags.indexOf(this.searchInput.toLowerCase().trim()) > -1);
    }


  }


}


