import {Component} from '@angular/core';
import {Food, Unit} from "../../models/food";
import {RecipeItem} from "../../models/recipeItem";
import {AlertController, ModalController, NavParams, ViewController} from "ionic-angular";
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
  unit: Unit;
  count: number;
  getCount: boolean = true;

  constructor(private viewCtrl: ViewController,
              private db: DatabaseProvider,
              private params: NavParams,
              private modalCtrl: ModalController,
              private alertCtrl: AlertController) {
    console.log('Hello AddFoodComponent Component');
    db.getAllFoods().then(value => {
      this.foods = value;
      this.all_foods = value
    });
    this.getCount = params.get("getCount");
  }

  getItems($event) {
    this.searchText = this.searchText.toLowerCase().replace(/ /g, "");

    if (this.searchText == "") {
      this.foods = this.all_foods;
      this.food = null;
      return;
    }

    this.foods = this.all_foods.filter(value => value.name.indexOf(this.searchText) > -1);
  }

  selectFood(food: Food) {
    console.log(this.getCount, food);
    if (this.getCount) {
      this.getCountForFood(food);

    } else {
      this.viewCtrl.dismiss({food: food});
    }
  }

  close() {
    this.viewCtrl.dismiss()
  }

  createFood() {
    this.alertCtrl.create({
      title: 'Create food',
      inputs: [
        {
          name: 'name',
          placeholder: 'name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Ok',
          handler: data => {
            this.continueCreate(data.name)
          }
        }
      ]
    }).present();
  }

  private continueCreate(name: string) {
    let prompt = this.alertCtrl.create({
      title: 'Choose unit',
      message: 'Unit: ',
      inputs: [
        {
          type: 'radio',
          label: 'l',
          value: '1'
        },
        {
          type: 'radio',
          label: 'kg',
          value: '2'
        },
        {
          type: 'radio',
          label: 'pcs',
          value: '3'
        }],
      buttons: [
        {
          text: "Cancel"
        },
        {
          text: "Ok",
          handler: data => {
            let newFood = new Food(name, data)
            this.db.addFood(newFood)
            this.selectFood(newFood)
          }
        }]
    });
    prompt.present();
  }

  private getCountForFood(food: Food) {
    this.alertCtrl.create({
      title: 'Set count',
      inputs: [
        {
          name: 'count',
          type: 'number',
          placeholder: '1'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Ok',
          handler: data => {
            console.log(data);
            let recipeItem: RecipeItem = new RecipeItem(food, data.count);
            this.viewCtrl.dismiss({recipeItem: recipeItem});
          }
        }
      ]
    }).present();
  }
}
