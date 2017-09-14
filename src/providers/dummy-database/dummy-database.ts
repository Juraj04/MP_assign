import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {BehaviorSubject} from 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';

import {Product} from '../../models/product';
import {Food, Unit} from "../../models/food";
import {Recipe} from "../../models/recipe";
import {RecipeItem} from "../../models/recipeItem";

/*
  Generated class for the DummyDatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DummyDatabaseProvider {
  private databaseReady: BehaviorSubject<boolean> = new BehaviorSubject(true);
  products: Product[];
  food: Food[];
  tags: string[];
  recipes: Recipe[];

  constructor() {
    console.log('Hello DummyDatabaseProvider Provider');
    this.food = [new Food("voda", Unit.l), new Food("maso", Unit.kg), new Food("jogurt", Unit.pcs)];
    this.products = [];
    this.tags = ["glutenFree", "raw", "hipster", "nom", "nomnom", "nomnomnom", "chefmode"];
    this.createDummyProducts();
    this.createDummyRecipes();
  }

  addProduct(product: Product): Promise<any> {
    this.products.push(product);
    return null;
  }

  getAllProducts(): Promise<Product[]> {
    return new Promise((resolve, reject) => {
      resolve(this.products)
    })
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
  }

  getAllRecipes():Promise<Recipe[]> {
    return new Promise(resolve => resolve(this.recipes))
  }

  getDatabaseState(): Observable<boolean> {
    return this.databaseReady.asObservable();
  }

  private createDummyRecipes(){

    var items: RecipeItem[] = [];
    for(let i =0 ;i< 3;i++){

      let it: RecipeItem = new RecipeItem(this.food[i],i);
      items.push(it);
    }
    var rec: Recipe = new Recipe("Sracka",3,60,4,1,"Toto je postup varenia ...","nejaka skurvena url pre fotku",items,this.tags)
  }

  createDummyProducts() {
    let names = ["voda", "mnasko", "cipsik", "vlocky", "jogurt", "kondomy", "chlieb", "ryza"];
    let locations = ["prisma", "lidl", "kmarket", "tesco"];
    let dates = ["1.1.2017", "2.2.2017", "3.3.2017", "4.4.2017", "5.5.2017", "6.6.2017"];
    let photos = ["1.jpg", "2.jpg", "3.jpg"];

    for (let i = 0; i < 30; i++) {
      let price = Math.trunc((Math.random() * 100) % 100);
      let rating = Math.trunc((Math.random() * 10) & 5);
      let quantity = Math.trunc((Math.random() * 100) % 100);
      let count_fridge = Math.trunc((Math.random() * 100) % 10);

      let tags = [];
      for (let j = 0; j < Math.random() % this.tags.length; j++) {
        tags[j] = this.tags[Math.trunc((Math.random() * 10) % tags.length)];
      }

      this.products.push(new Product(names[Math.trunc((Math.random() * 10) % names.length)],
        locations[Math.trunc((Math.random() * 10) % locations.length)],
        price,
        dates[Math.trunc((Math.random() * 10) % dates.length)],
        rating, quantity, count_fridge,
        this.food[Math.trunc((Math.random() * 10) % this.food.length)],
        photos[Math.trunc((Math.random() * 10) % this.food.length)],
        tags
      ));
    }
  }

}


