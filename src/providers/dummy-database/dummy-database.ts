import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {BehaviorSubject} from 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';

import {Product} from '../../models/product';
import {Food, Unit} from "../../models/food";
import {Recipe} from "../../models/recipe";
import {RecipeItem} from "../../models/recipeItem";
import {Location} from '../../models/location';

/*
  Generated class for the DummyDatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DummyDatabaseProvider {
  private databaseReady: BehaviorSubject<boolean> = new BehaviorSubject(true);

  private location_id: number = 1;
  private locations: Location[] = [];
  private food_id: number = 1;
  private foods: Food[] = [];
  private product_tags: Array<any[]> = [];
  private product_id: number = 1;
  private products: Product[] = [];

  private recipes: Recipe[] = [];


  constructor() {
    console.log('Hello DummyDatabaseProvider Provider');

    this.createDummyProducts();
    //this.createDummyRecipes();
  }

  createDummyProducts() {
    let names = ["voda", "mnasko", "cipsik", "vlocky", "jogurt", "kondomy", "chlieb", "ryza"];
    let locations = [new Location('Prisma', 0, 0), new Location('Lidl', 0, 0), new Location('K-Market', 0, 0), new Location('Tesco', 0, 0)];
    let dates = ["1.1.2017", "2.2.2017", "3.3.2017", "4.4.2017", "5.5.2017", "6.6.2017"];
    let foods = [new Food("water", Unit.l), new Food("meat", Unit.kg), new Food("yogurt", Unit.pcs)];
    let product_tags = ["glutenFree", "raw", "hipster", "nom", "nomnom", "nomnomnom", "chefmode"];
    let photos = ["1.jpg", "2.jpg", "3.jpg"];

    for (let i = 0; i < 10; i++) {
      let price = Math.trunc((Math.random() * 100) % 100);
      let rating = Math.trunc((Math.random() * 10) & 5);
      let quantity = Math.trunc((Math.random() * 100) % 100);
      let count_fridge = Math.trunc((Math.random() * 100) % 10);

      let tags = [];
      for (let j = 0; j < Math.random() % product_tags.length; j++) {
        tags[j] = product_tags[Math.trunc((Math.random() * 10) % product_tags.length)];
      }

      this.addProduct(new Product(
        names[Math.trunc((Math.random() * 10) % names.length)],
        locations[Math.trunc((Math.random() * 10) % locations.length)],
        price,
        dates[Math.trunc((Math.random() * 10) % dates.length)],
        rating,
        quantity,
        count_fridge,
        foods[Math.trunc((Math.random() * 10) % foods.length)],
        photos[Math.trunc((Math.random() * 10) % photos.length)],
        tags
      ));
    }
  }

  addLocation(location: Location): Promise<Location> {
    if (location.id == null) {
      location.id = this.location_id++;
      this.locations.push(location);
    }
    return Promise.resolve(location);
  }

  getLocation(id: number): Promise<Location> {
    for (let location of this.locations) {
      if (id == location.id)
        return Promise.resolve(location);
    }
    return Promise.resolve(null);
  }

  getAllLocations(): Promise<Location[]> {
    return Promise.resolve(this.locations);
  }

  addFood(food: Food): Promise<Food> {
    if (food.id == null) {
      food.id = this.food_id++;
      this.foods.push(food);
    }
    return Promise.resolve(food);
  }

  getFood(id: number): Promise<Food> {
    for (let food of this.foods) {
      if (id == food.id)
        return Promise.resolve(food);
    }
    return Promise.resolve(null);
  }

  getAllFoods(): Promise<Food[]> {
    return Promise.resolve(this.foods);
  }

  addProductTag(id_product: number, name: string): Promise<string> {
    for (let tag of this.product_tags) {
      if (tag[0] == id_product && tag[1] == name) {
        return Promise.resolve(name);
      }
    }
    this.product_tags.push([id_product, name]);
    return Promise.resolve(name);
  }

  getAllProductTagsByProductId(id: number): Promise<string[]> {
    let tags: string[] = [];
    for (let tag of this.product_tags) {
      if (id == tag[0])
        tags.push(tag[1]);
    }
    return Promise.resolve(tags);
  }

  getAllProductTags(): Promise<string[]> {
    let tags: string[] = [];
    for (let tag of this.product_tags) {
      tags.push(tag[1]);
    }
    return Promise.resolve(tags);
  }

  addProduct(product: Product): Promise<Product> {
    if (product.id == null) {
      product.id = this.product_id++;
      this.addLocation(product.location);
      this.addFood(product.food);
      this.products.push(product);
      for (let tag of product.tags) {
        this.addProductTag(product.id, tag);
      }
    }
    return Promise.resolve(product);
  }

  getProduct(id: number): Promise<Product> {
    for (let product of this.products) {
      if (id == product.id)
        return Promise.resolve(product);
    }
    return Promise.resolve(null);
  }

  getAllProducts(): Promise<Product[]> {
    return Promise.resolve(this.products);
  }

  //TODO: Recipes
  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    console.log(this.recipes);
  }

  getAllRecipes(): Promise<Recipe[]> {
    return new Promise(resolve => resolve(this.recipes))
  }

  getDatabaseState(): Observable<boolean> {
    return this.databaseReady.asObservable();
  }

  private createDummyRecipes() {
    /*
        var items: RecipeItem[] = [];
        for (let i = 0; i < 3; i++) {

          let it: RecipeItem = new RecipeItem(this.foods[i], i);
          items.push(it);
        }
        var rec: Recipe = new Recipe("Sracka", 3, 60, 4, 1, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.", "http://www.seriouseats.com/images/2015/09/20150914-pressure-cooker-recipes-roundup-09.jpg", items, this.product_tags)

        this.recipes.push(rec);*/
  }
}


