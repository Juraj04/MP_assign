import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {GoogleMap, GoogleMapOptions, GoogleMaps, GoogleMapsEvent} from "@ionic-native/google-maps";
import {LocationStoreProvider} from "../../providers/location-store/location-store";
import {Location} from "../../models/location";
import {Geolocation} from '@ionic-native/geolocation';

/**
 * Generated class for the GoogleMapsWindowPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-google-maps-window',
    templateUrl: 'google-maps-window.html',
})
export class GoogleMapsWindowPage {
    map: GoogleMap;
    lat: number;
    lng: number;
    location: Location;
    change: Boolean;

    constructor(public navCtrl: NavController, public navParams: NavParams, private googleMaps: GoogleMaps, private geolocation: Geolocation,
                private locationStore: LocationStoreProvider, private toastCtrl: ToastController) {
        if (navParams.get("location") != null && navParams.get("change") != null) {
            this.location = navParams.get("location");
            this.change = navParams.get("change");
            console.log(this.location);
            console.log(this.change);
        }
    }

    ionViewDidLoad() {
        console.log(this.location);
        if (this.location == null) {
            this.loadMap();
        } else {
            switch (this.change){
                case true: {this.changeLocation();break;}
                case false:{this.showMap();break;}
            }
        }
    }

    ionViewWillLeave() {
        this.map.clear();
    }

    loadMap() {
        console.log("LOAD MAP");
        this.geolocation.getCurrentPosition().then((resp) => {
            this.lat = resp.coords.latitude;
            this.lng = resp.coords.longitude;

            let mapElement = document.getElementById('map');
            let mapOptions: GoogleMapOptions = {
                camera: {
                    target: {
                        lat: this.lat,
                        lng: this.lng
                    },
                    zoom: 18,
                    tilt: 30
                }
            };

            this.map = this.googleMaps.create(mapElement, mapOptions);

            this.map.one(GoogleMapsEvent.MAP_READY)
                .then(() => {
                    console.log('Map is ready!');

                    this.presentToast('Click on location and save', 'bottom');

                    this.map.addMarker({
                        title: 'Ionic',
                        icon: 'blue',
                        animation: 'DROP',
                        position: {
                            lat: this.lat,
                            lng: this.lng
                        }

                    })
                        .then(marker => {
                            marker.on(GoogleMapsEvent.MARKER_CLICK)
                                .subscribe(() => {
                                    alert('Lat: ' + this.lat + '| Lng: ' + this.lng);
                                });

                        });
                    this.map.on(GoogleMapsEvent.MAP_CLICK)
                        .subscribe(data => {
                            this.map.clear()
                                .then(() => {
                                    let coordinates = JSON.parse(data);
                                    this.lat = coordinates['lat'];
                                    this.lng = coordinates['lng'];
                                    this.presentToast('New location at: ' + 'Lat: ' + this.lat + '| Lng: ' + this.lng, 'bottom');

                                    this.map.addMarker({
                                        icon: 'blue',
                                        animation: 'DROP',
                                        position: {
                                            lat: this.lat,
                                            lng: this.lng
                                        }
                                    })
                                        .then(marker => {
                                            marker.on(GoogleMapsEvent.MARKER_CLICK)
                                                .subscribe(() => {
                                                    alert('Lat: ' + this.lat + '| Lng: ' + this.lng);

                                                });
                                        });
                                });

                        })

                });
        }).catch((error) => {
            console.log('Error getting location', error);
        });
    }

    saveLocation() {
        if (this.location == null || this.change) {
            this.locationStore.lng = this.lng;
            this.locationStore.lat = this.lat;
            console.log(this.locationStore.lng + "  " + this.locationStore.lat);

            this.presentToast('Saved location: ' + 'Lat: ' + this.lat + '| Lng: ' + this.lng, 'bottom');
        }
        this.map.clear();
        this.navCtrl.pop();
    }

    showMap() {
        console.log("SHOW MAP");
        let mapElement = document.getElementById('map');
        let mapOptions: GoogleMapOptions = {
            camera: {
                target: {
                    lat: this.location.x,
                    lng: this.location.y,
                },
                zoom: 18,
                tilt: 30
            }
        };

        this.map = this.googleMaps.create(mapElement, mapOptions);

        // Wait the MAP_READY before using any methods.
        this.map.one(GoogleMapsEvent.MAP_READY)
            .then(() => {
                console.log('Map is ready!');


                // Now you can use all methods safely.
                this.map.addMarker({
                    title: this.location.name,
                    icon: 'blue',
                    animation: 'DROP',
                    position: {
                        lat: this.location.x,
                        lng: this.location.y
                    },

                })
            });

    }

    changeLocation(){
        console.log("CHANGE LOCATION");
        let mapElement = document.getElementById('map');
        let mapOptions: GoogleMapOptions = {
            camera: {
                target: {
                    lat: this.location.x,
                    lng: this.location.y,
                },
                zoom: 18,
                tilt: 30
            }
        };

        this.map = this.googleMaps.create(mapElement, mapOptions);

        // Wait the MAP_READY before using any methods.
        this.map.one(GoogleMapsEvent.MAP_READY)
            .then(() => {
                console.log('Map is ready!');


                // Now you can use all methods safely.
                this.map.addMarker({
                    title: this.location.name,
                    icon: 'blue',
                    animation: 'DROP',
                    position: {
                        lat: this.location.x,
                        lng: this.location.y
                    },

                });

                this.map.on(GoogleMapsEvent.MAP_CLICK)
                    .subscribe(data => {
                        this.map.clear()
                            .then(() => {
                                let coordinates = JSON.parse(data);
                                this.lat = coordinates['lat'];
                                this.lng = coordinates['lng'];
                                this.presentToast('New location at: ' + 'Lat: ' + this.lat + '| Lng: ' + this.lng, 'bottom');

                                this.map.addMarker({
                                    icon: 'blue',
                                    animation: 'DROP',
                                    position: {
                                        lat: this.lat,
                                        lng: this.lng
                                    }
                                })
                                    .then(marker => {
                                        marker.on(GoogleMapsEvent.MARKER_CLICK)
                                            .subscribe(() => {
                                                alert('Lat: ' + this.lat + '| Lng: ' + this.lng);

                                            });
                                    });
                            });

                    })
            });



    }

    presentToast(message: string, position: string) {
        const toast = this.toastCtrl.create({
            message: message,
            duration: 2000,
            position: position
        });

        toast.onDidDismiss(() => {
            console.log('Dismissed toast');
        });
        toast.present();
    }


}
