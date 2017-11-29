import {Component} from '@angular/core';
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
import {PictureManagerProvider} from "../../providers/picture-manager/picture-manager";

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

    tags: string = "";


    product: Product;
    originalProduct: Product;
    create: Boolean;


    constructor(public navCtrl: NavController, public navParams: NavParams,
                public modal: ModalController, private locationStore: LocationStoreProvider, private productStore: ProductStoreProvider,
                private toastCtrl: ToastController, private pictureManager: PictureManagerProvider) {
        this.create = navParams.get("create");
        if (this.create) {
            let tgs: string[]
            this.product = new Product("", new Location("", 0, 0), 0, "", 3, 0, 0, null, "./assets/img/default-placeholder.png", tgs);
        } else {
            this.product = navParams.get("product");
            this.originalProduct = this.product;
            this.locationStore.lat = this.product.location.x;
            this.locationStore.lng = this.product.location.y;
            this.showTags()
        }
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad NewProductPage');
    }

    createProduct() {

        if (this.validInput()) {
            let tgs: string[] = this.tags.toLowerCase().trim().split(" ");
            this.removeBlankSpace(tgs);
            this.product.location = new Location(this.product.location.name, this.locationStore.lat, this.locationStore.lng);

            switch (this.create) {
                case true: {

                    tgs.push(this.product.name.toLowerCase().trim().replace(" ", ""));
                    tgs.push(this.product.location.name.toLowerCase().trim().replace(" ", ""));
                    tgs.push(this.product.food.name.toLowerCase().trim().replace(" ", ""));
                    this.product.tags = tgs;
                    console.log(this.product.photo);

                    this.productStore.addProduct(this.product);
                    this.navCtrl.pop();
                    this.navCtrl.push(ProductDetailPage, {
                        product: this.product
                    });
                    break;
                }
                case false: {
                    this.product.tags = tgs;
                    console.log("photo" + this.product.photo);
                    this.productStore.updateProduct(this.originalProduct, this.product);
                    this.navCtrl.pop();
                    break;
                }
            }

        }

    }

    takeAPhoto() {

        this.pictureManager.takeAPhoto().then(imageData => {
            this.product.photo = imageData;
            console.log("toto je photo v novom produkte: " + this.product.photo);
        })

    }

    selectFromGalery() {
        this.pictureManager.selectFromGalery().then(imageData => {
            this.product.photo = imageData;
            console.log("toto je galery v novom produkte: " + this.product.photo);
        });
    }

    getLocation() {
        switch (this.create) {
            case true: {
                this.navCtrl.push(GoogleMapsWindowPage, {});
                break;
            }
            case false: {
                this.navCtrl.push(GoogleMapsWindowPage, {
                    location: this.product.location,
                    change: true
                });
                break;
            }
        }

    };

    addFood() {
        let modal = this.modal.create(AddFoodComponent, {showCount: false});
        modal.onDidDismiss(data => {
            if (data == null) return;
            this.product.food = data.food;
        });

        modal.present();
    }

    validInput() {
        if (this.product.name.trim() == "") {
            this.presentToast("Insert name!");
            return false
        } else if (this.product.price == 0) {
            this.presentToast("Insert price!");
            return false
        } else if (this.product.food == null) {
            this.presentToast("Select food!");
            return false
        } else if (this.product.location.name.trim() == "") {
            this.presentToast("Insert Location name!");
            return false
        } else if (this.product.quantity == 0) {
            this.presentToast("Insert quantity!");
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

    showTags() {
        let tgs = "";
        for (let i = 0; i < this.product.tags.length; i++) {
            tgs += this.product.tags[i] + " ";
        }
        this.tags = tgs
    }

    removeBlankSpace(array: string[]) {
        for (let i = 0; i < array.length; i++) {
            if (array[i] == " ") {
                array.splice(i, 1);
                i--;
            }
        }
    }

    public convertToNumber(event): number {
        return +event;
    }


}
