import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {ProductStoreProvider} from "../product-store/product-store";
import {Food} from "../../models/food";
import {RecipeItem} from "../../models/recipeItem";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";

/*
  Generated class for the FridgeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FridgeProvider {

  private _foods:BehaviorSubject<RecipeItem[]> = new BehaviorSubject([]);
  public readonly  foods:Observable<RecipeItem[]> = this._foods.asObservable();

  constructor(private productsStore: ProductStoreProvider) {
    productsStore.products.subscribe(recipes => {
      let foods: Map<Food, number> = new Map()

      recipes.forEach(value => {
        if (value.count_fridge > 0) {
          var count = value.count_fridge
          if (foods.has(value.food)) {
            count += foods.get(value.food);
          }
          foods.set(value.food, count)
        }
      })

      let recipeItems: RecipeItem[] = [];
      foods.forEach((value, key) => {
        recipeItems.push(new RecipeItem(key, value))
      })

      this._foods.next(recipeItems)

    })
    console.log('Hello FridgeProvider Provider');
  }

}
