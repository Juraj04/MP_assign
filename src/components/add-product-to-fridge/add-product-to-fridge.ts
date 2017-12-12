import {Component} from '@angular/core';
import {NavParams, ViewController} from "ionic-angular";

/**
 * Generated class for the AddProductToFridgeComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'add-product-to-fridge',
  templateUrl: 'add-product-to-fridge.html'
})
export class AddProductToFridgeComponent {
  quantity: number;

  constructor(private params: NavParams,
              private viewCtrl: ViewController) {
    console.log('Hello AddProductToFridgeComponent Component');
    this.quantity = params.get("quantity");
  }

  convertToNumber(event): number {
    return +event;
  }

  addToFridge() {
    this.viewCtrl.dismiss({countInFridge: this.quantity});
  }

  addOne() {
    this.quantity++;
  }

  subtractOne() {
    if (this.quantity != 0)
      this.quantity--;
  }

  close() {
    this.viewCtrl.dismiss()
  }
}
