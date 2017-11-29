import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {ImagePicker, ImagePickerOptions} from "@ionic-native/image-picker";
import {Camera, CameraOptions} from "@ionic-native/camera";

/*
  Generated class for the PictureManagerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PictureManagerProvider {
  private photo: string;

  constructor(private camera: Camera, private imagePicker: ImagePicker) {

  }
  takeAPhoto(): string{
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

    return this.photo
  }

  selectFromGalery(): string {
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
    console.log(this.photo);
    return this.photo
  }
}
