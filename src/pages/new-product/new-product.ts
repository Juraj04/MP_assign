import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {Food} from "../../models/food";
import {ProductStoreProvider} from "../../providers/product-store/product-store";
import {AddFoodComponent} from "../../components/add-food/add-food";
import {Product} from "../../models/product";
import {Location} from "../../models/location";
import {ImagePicker, ImagePickerOptions} from "@ionic-native/image-picker";
import {Camera, CameraOptions} from "@ionic-native/camera";

/**
 * Generated class for the NewProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-product',
  templateUrl: 'new-product.html',
})
export class NewProductPage {

  name: string;
  locationName: string;
  price: number;
  rating: number = 3;
  photo: string = "./assets/img/default-placeholder.png";
  tags: string = "";
  quantity: number;
  food: Food;



  constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera, private imagePicker: ImagePicker,
              public modal: ModalController,/* private locationStore: LocationStoreProvider,*/ private productStore:ProductStoreProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewProductPage');
  }

  createProduct(){
    let tgs: string[] = this.tags.toLowerCase().split(" ");
    tgs.push(this.name.replace(" ",""));
    //tgs.push(this.location.replace(" ",""));
    tgs.push(this.food.name.replace(" ",""));

    let loc = new Location("TEST", 69, 69);
    //TODO: opravit tvorbu produktov, lebo toto je cele na chuja
    let product: Product = new Product(this.name, loc, this.price, "sss", this.rating, this.quantity, 0, this.food, "hhh", tgs);

    this.productStore.addProduct(product);
    this.navCtrl.pop();

  }

  takeAPhoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: true
    };

    this.camera.getPicture(options).then((imageData) => {
      console.log(imageData)
      this.photo = imageData
    }, (err) => {
      console.log("photo failed")
    });
  }

  selectFromGalery() {
    const options: ImagePickerOptions = {
      quality: 100,
      maximumImagesCount: 1

    };

    this.imagePicker.getPictures(options).then((imageData) => {
      console.log(imageData)
      this.photo = imageData
    }, (err) => {
      console.log("photo failed")
    });
  }

  getLocation() {
    //TODO: dorobit location store, a googlemaps window
    //this.navCtrl.push(GoogleMapsWindowPage, {});
  };

  addFood(){
    //TODO: wat
    let modal = this.modal.create(AddFoodComponent);
    modal.onDidDismiss(data => {
      if (data == null) return;
      this.food = data.recipeItem.food;
    });

    modal.present();
  }


}
