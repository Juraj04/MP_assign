import { Component } from '@angular/core';
import {NavParams, ViewController} from "ionic-angular";
import {Food, Unit} from "../../models/food";
import {DatabaseProvider} from "../../providers/database/database";

/**
 * Generated class for the CreateNewFoodComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'create-new-food',
  templateUrl: 'create-new-food.html'
})
export class CreateNewFoodComponent {

  name: string = "";
  unit: Unit;

  constructor(public viewCtrl: ViewController, public db: DatabaseProvider) {

  }
  close(){
    this.viewCtrl.dismiss()
  }
  create(){
    //TODO check input
    let food = new Food(this.name,this.unit);
    this.db.addFood(food)
    this.viewCtrl.dismiss({food})
  }



}
