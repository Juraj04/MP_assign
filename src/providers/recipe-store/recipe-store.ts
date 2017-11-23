import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Recipe} from "../../models/recipe";
import {Observable} from "rxjs/Observable";
import {SelectRightProviderProvider} from "../select-right-provider/select-right-provider";
import {DatabaseProvider} from "../database/database";
import {DummyDatabaseProvider} from "../dummy-database/dummy-database";

/*
  Generated class for the RecipeStoreProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RecipeStore {
private _recipes:BehaviorSubject<Recipe[]> = new BehaviorSubject([]);
public readonly  recipes:Observable<Recipe[]> = this._recipes.asObservable();



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


  addRecipe(recipe:Recipe){
    this.db.addRecipe( recipe);
    let array = this._recipes.getValue();
    array.push(recipe);
    this._recipes.next(array);
  }




}
