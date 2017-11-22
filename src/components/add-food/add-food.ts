import {Component} from '@angular/core';
import {Food, Unit} from "../../models/food";
import {RecipeItem} from "../../models/recipeItem";
import {NavController, ViewController} from "ionic-angular";
import {DummyDatabaseProvider} from "../../providers/dummy-database/dummy-database";

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

  constructor(public viewCtrl: ViewController, db: DummyDatabaseProvider) {
    console.log('Hello AddFoodComponent Component');
    //this.foods = db.food;  TODO: JJ: toto som zapoznamkoval lebo to pindalo, momentalne som neriesil opravu
  }

  getItems($event) {
    if (this.searchText.trim() == "") {
      this.foods = [];
      return;
    }

    this.foods = this.all_foods.filter(value => value.name.indexOf(this.searchText) > -1);
    if (this.foods.length == 0 && this.searchText.trim() != "") {
      var f: Food = new Food(this.searchText, Unit.kg);
      this.foods.push(f);
    }

  }


  selectFood(food: Food) {
    this.food = food;
    this.newFood = this.all_foods.indexOf(food) < 0;
    this.searchText="";
    this.getItems(null);
  }


  addItem(){
    if(this.newFood){
      this.food.unit = this.unit;
      this.all_foods.push(this.food);
      //TODO pridat Food aj do databazy
    }
    var recipeItem:RecipeItem = new RecipeItem(this.food,this.count);
    this.viewCtrl.dismiss({recipeItem: recipeItem});
  }


}
