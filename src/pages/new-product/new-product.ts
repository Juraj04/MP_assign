import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams, ToastController} from 'ionic-angular';
import {Food} from "../../models/food";
import {ProductStoreProvider} from "../../providers/product-store/product-store";
import {AddFoodComponent} from "../../components/add-food/add-food";
import {Product} from "../../models/product";
import {Location} from "../../models/location";
import {ImagePicker, ImagePickerOptions} from "@ionic-native/image-picker";
import {Camera, CameraOptions} from "@ionic-native/camera";
import {GoogleMapsWindowPage} from "../google-maps-window/google-maps-window";
import {LocationStoreProvider} from "../../providers/location-store/location-store";
import {ProductDetailPage} from "../product-detail/product-detail";

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
  price: number = 0;
  rating: number = 3;
  photo: string = "./assets/img/default-placeholder.png";
  tags: string = "";
  quantity: number = 0;
  food: Food;



  constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera, private imagePicker: ImagePicker,
              public modal: ModalController, private locationStore: LocationStoreProvider, private productStore:ProductStoreProvider,
              private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewProductPage');
  }

  createProduct(){

    if(this.validInput()){
      let tgs: string[] = this.tags.toLowerCase().split(" ");
      tgs.push(this.name.toLowerCase().replace(" ",""));
      tgs.push(this.locationName.toLowerCase().replace(" ",""));
      tgs.push(this.food.name.toLowerCase().replace(" ",""));

      let location = new Location(this.locationName,this.locationStore.lat,this.locationStore.lng);

      let product: Product = new Product(this.name, location, this.price, "date", this.rating, this.quantity, 0, this.food, this.photo, tgs);

      this.productStore.addProduct(product);
      this.navCtrl.pop();
      this.navCtrl.push(ProductDetailPage, {
        product: product
      });
    }

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
    this.navCtrl.push(GoogleMapsWindowPage, {});
  };

  addFood(){
    //TODO: wat
    let modal = this.modal.create(AddFoodComponent,{showCount : false});
    modal.onDidDismiss(data => {
      if (data == null) return;
      this.food = data.food;
    });

    modal.present();
  }

  validInput(){
    if(this.name != ""){
      this.presentToast("Insert name!")
      return false
    } else if(this.photo != ""){
      this.presentToast("Select photo!")
      return false
    } else if(this.price != 0){
      this.presentToast("Insert price!")
      return false
    } else if(this.food != null){
      this.presentToast("Select food!")
      return false
    } else {
      return true
    }
  }
  presentToast(message: string) {
    const toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    toast.present();
  }
}
