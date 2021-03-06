import { Component } from '@angular/core';
import {ViewController} from "ionic-angular";
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

  constructor(private viewCtrl: ViewController,
              private db: DatabaseProvider) {
  }

  close(){
    this.viewCtrl.dismiss()
  }

  create(){
    let food = new Food(this.name,this.unit);
    this.db.addFood(food)
    this.viewCtrl.dismiss({food})
  }
}
