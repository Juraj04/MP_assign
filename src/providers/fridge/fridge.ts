import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {ProductStoreProvider} from "../product-store/product-store";
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

  private _foods: BehaviorSubject<RecipeItem[]> = new BehaviorSubject([]);
  public readonly foods: Observable<RecipeItem[]> = this._foods.asObservable();

  constructor(private productsStore: ProductStoreProvider) {

    this.productsStore.products.subscribe(products => {
      let foods: Map<number, RecipeItem> = new Map();

      products.forEach(value => {
        if (value.count_fridge > 0) {
          let count = value.count_fridge;
          if (foods.has(value.food.id)) {
            count += foods.get(value.food.id).count;
          }
          foods.set(value.food.id, new RecipeItem(value.food, count))
        }
      });

      this._foods.next(Array.from(foods.values()))

    });
    console.log('Hello FridgeProvider Provider');
  }

  public howMuchMissing(item: RecipeItem): number {

    for (let value of this._foods.getValue()) {
      if (item.food.name == value.food.name) {
        return item.count - Math.min(value.count,item.count);
      }
    }
    return item.count;
  }



}
