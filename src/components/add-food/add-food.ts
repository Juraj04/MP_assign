import {Component} from '@angular/core';
import {Food, Unit} from "../../models/food";
import {RecipeItem} from "../../models/recipeItem";
import {NavController, NavParams, ViewController} from "ionic-angular";
import {DatabaseProvider} from "../../providers/database/database";

/**
 * Generated class for the AddFoodComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'add-food',
  templateUrl: 'add-food.html'
})
export class AddFoodComponent {

  searchText: string;

  foods: Food[] = [];
  all_foods: Food[] = [];

  food: Food;
  newFood: boolean = true;
  unit: Unit;
  count: number;
  showCount: boolean = true;

  constructor(public viewCtrl: ViewController, public db: DatabaseProvider, public params: NavParams) {
    console.log('Hello AddFoodComponent Component');
    db.getAllFoods().then(value => {
      this.foods = value;
      this.all_foods = value
    });
    this.showCount = params.get("showCount");
    //this.foods = db.get;  //TODO: JJ: toto som zapoznamkoval lebo to pindalo, momentalne som neriesil opravu
  }

  getItems($event) {
    this.searchText = this.searchText.toLowerCase().replace(/ /g, "");

    if (this.searchText == "") {
      this.foods = this.all_foods;
      this.food = null;
      return;
    }

    this.foods = this.all_foods.filter(value => value.name.indexOf(this.searchText) > -1);
    if (this.foods.length == 0 && this.searchText != "") {
      let f: Food = new Food(this.searchText, Unit.kg);
      this.foods.push(f);
    }
  }


  selectFood(food: Food) {
    this.food = food;
    this.newFood = this.all_foods.indexOf(food) < 0;
    this.searchText = food.name;
    //this.getItems(null);
  }


  addItem() {
    if (this.newFood) {
      this.food.unit = this.unit;
      this.all_foods.push(this.food);
      this.db.addFood(this.food);
    }
    if (this.showCount) {
      let recipeItem: RecipeItem = new RecipeItem(this.food, this.count);
      this.viewCtrl.dismiss({recipeItem: recipeItem});
    } else {
      this.viewCtrl.dismiss({food: this.food});
    }
  }


}
