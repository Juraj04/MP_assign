import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Recipe} from "../../models/recipe";
import {Observable} from "rxjs/Observable";
import {DatabaseProvider} from "../database/database";

/*
  Generated class for the RecipeStoreProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RecipeStoreProvider {
  private _recipes: BehaviorSubject<Recipe[]> = new BehaviorSubject([]);
  public readonly recipes: Observable<Recipe[]> = this._recipes.asObservable();

  constructor(private db: DatabaseProvider) {
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.db.getAllRecipes().then(value => {
          this._recipes.next(value);
          console.log("recipe store :" + value);
        })
      }
    })
  }

  addRecipe(recipe: Recipe) {
    this.db.addRecipe(recipe).then(value => {
      let n = this._recipes.getValue();
      n.push(value);
      this._recipes.next(n);
    })
  }

  updateRecipe(original: Recipe, changed: Recipe) {
    this.db.updateRecipe(changed).then(value => {
      let n = this._recipes.getValue();
      let index = n.indexOf(original);
      n[index] = value;
      this._recipes.next(n);
    })
  }

  deleteRecipe(recipe: Recipe) {
    this.db.deleteRecipe(recipe).then(value => {
      let n = this._recipes.getValue();
      let index = n.indexOf(recipe);
      n.splice(index, 1);
      this._recipes.next(n);
    })
  }
}
