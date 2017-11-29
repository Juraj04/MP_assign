import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {Product} from "../../models/product";
import {ProductStoreProvider} from "../../providers/product-store/product-store";
import {GoogleMapsWindowPage} from "../google-maps-window/google-maps-window";
import {LocationStoreProvider} from "../../providers/location-store/location-store";
import {Location} from "../../models/location";
import {PictureManagerProvider} from "../../providers/picture-manager/picture-manager";
import {AddFoodComponent} from "../../components/add-food/add-food";

/**
 * Generated class for the EditProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-product',
  templateUrl: 'edit-product.html',
})
export class EditProductPage {

  private product: Product
  private originalProduct: Product;
  private tags: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private productStore: ProductStoreProvider,
              private locationStore: LocationStoreProvider, private pictureManager: PictureManagerProvider, public modal: ModalController) {
    this.product = navParams.get("product");
    this.originalProduct = this.product
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProductPage');
    this.showTags()
  }

  ionViewWillLeave() {
    this.productStore.updateProduct(this.originalProduct, this.product);
  }

  saveProduct(){
    let location: Location = new Location(this.product.location.name,this.locationStore.lat,this.locationStore.lng);
    this.product.location = location;

    this.product.tags = this.tags.split(",");

    this.productStore.updateProduct(this.originalProduct, this.product);
    this.navCtrl.pop();
  }
  takeAPhoto(){
    this.product.photo = this.pictureManager.takeAPhoto();
  }

  selectFromGalery(){
    this.product.photo = this.pictureManager.selectFromGalery();
  }

  changeLocation(){
    this.navCtrl.push(GoogleMapsWindowPage, {
      location: this.product.location,
      change: true
    })
  }

  changeFood(){
    let modal = this.modal.create(AddFoodComponent,{showCount : false});
    modal.onDidDismiss(data => {
      if (data == null) return;
      this.product.food = data.food;
    });

    modal.present();
  }

  showTags(){
  let tgs = this.product.tags.toString();
  this.tags = tgs.replace(',', ' ');
}

  public convertToNumber(event):number {  return +event; }
}
