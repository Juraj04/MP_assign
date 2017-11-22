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

  private recipe_items: Array<any[]> = [];
  private recipe_tags: Array<any[]> = [];
  private recipe_id: number = 1;
  private recipes: Recipe[] = [];


  constructor() {
    console.log('Hello DummyDatabaseProvider Provider');

    this.createDummyProducts();
    this.createDummyRecipes();
  }

  private createDummyProducts() {
    let names = ["voda", "mnasko", "cipsik", "vlocky", "jogurt", "kondomy", "chlieb", "ryza"];
    let locations = [new Location('Prisma', 0, 0), new Location('Lidl', 0, 0), new Location('K-Market', 0, 0), new Location('Tesco', 0, 0)];
    let dates = ["1.1.2017", "2.2.2017", "3.3.2017", "4.4.2017", "5.5.2017", "6.6.2017"];
    let foods = [new Food("water", Unit.l), new Food("meat", Unit.kg), new Food("yogurt", Unit.pcs)];
    let product_tags = ["glutenFree", "raw", "hipster", "nom", "nomnom", "nomnomnom", "chefmode"];
    let photos = ["https://cdn.i0.cz/public-data/ec/aa/37f79c813099a191d3c4e7392612_r16:9_w1180_h664_gi:photo:600657.jpg", "http://metabolizmus.sk/wp-content/uploads/jogurt.jpg", "http://www.bageta.eu/fotky-nr/chlieb-razny.jpg"];

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

  private createDummyRecipes() {
    let names = ["Halusky", "Rizoto", "Plnena paprika"];
    let description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";
    let photos = ["https://upload.wikimedia.org/wikipedia/commons/a/ad/Bryndzov%C3%A9_halu%C5%A1ky_so_slaninou.jpg", "https://t3.aimg.sk/magaziny/_s9Ln897Tl2N3M98rzvOtA.1280~Rybacie-rizoto-s-paprikou.jpg", "https://bonvivani.sk/sites/default/files/styles/large/public/recept/87/459/11759.jpg"];
    let recipe_items = [new RecipeItem(new Food("milk", Unit.l), 1), new RecipeItem(new Food("eggs", Unit.pcs), 5)];
    let recipe_tags = ["glutenFree", "raw", "hipster", "nom", "nomnom", "nomnomnom", "chefmode"];

    for (let i = 0; i < 3; i++) {
      let portions = Math.trunc((Math.random() * 100) & 15);
      let time = Math.trunc((Math.random() * 1000) & 120);
      let rating = Math.trunc((Math.random() * 10) & 5);
      let difficulty = Math.trunc((Math.random() * 10) & 3) + 1;

      let items = [];
      for (let j = 0; j < (Math.random() * 10) % recipe_items.length; j++) {
        items[j] = recipe_items[Math.trunc((Math.random() * 10) % recipe_items.length)];
      }

      let tags = [];
      for (let j = 0; j < (Math.random() * 10) % recipe_tags.length; j++) {
        tags[j] = recipe_tags[Math.trunc((Math.random() * 10) % recipe_tags.length)];
      }

      this.addRecipe(new Recipe(
        names[Math.trunc((Math.random() * 10) % names.length)],
        portions,
        time,
        rating,
        difficulty,
        description,
        photos[Math.trunc((Math.random() * 10) % photos.length)],
        items,
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

  /*//useless
  updateLocation(location: Location): Promise<Location> {
    return null;
  }*/

  /*deleteLocation(location: Location): Promise<Location> {
    return null;
  }*/

  getLocation(id: number): Promise<Location> {
    for (let location of this.locations) {
      if (id == location.id) {
        return Promise.resolve(location);
      }
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

  /*//useless
  updateFood(food: Food): Promise<Food> {
    return null;
  }*/

  /*deleteFood(food: Food): Promise<Food> {
    return null;
  }*/

  getFood(id: number): Promise<Food> {
    for (let food of this.foods) {
      if (id == food.id) {
        return Promise.resolve(food);
      }
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

  deleteAllProductTagsByProductId(id: number): Promise<boolean> {
    for (let tag of this.product_tags) {
      if (id == tag[0]) {
        const index: number = this.product_tags.indexOf(tag);
        if (index != -1) {
          this.product_tags.splice(index, 1);
        }
      }
    }
    return Promise.resolve(true);
  }

  getAllProductTagsByProductId(id: number): Promise<string[]> {
    let tags: string[] = [];
    for (let tag of this.product_tags) {
      if (id == tag[0]) {
        tags.push(tag[1]);
      }
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

  updateProduct(product: Product): Promise<Product> {
    for (let varProduct of this.products) {
      if (varProduct.id == product.id) {
        this.addLocation(product.location);
        this.addFood(product.food);
        this.deleteAllProductTagsByProductId(varProduct.id);
        for (let tag of product.tags) {
          this.addProductTag(product.id, tag);
        }
        varProduct = product;
        return Promise.resolve(product);
      }
    }
    return Promise.resolve(null);
  }

  deleteProduct(product: Product): Promise<Product> {
    const index: number = this.products.indexOf(product);
    if (index != -1) {
      this.deleteAllProductTagsByProductId(product.id);
      this.products.splice(index, 1);
      return Promise.resolve(product);
    }
    return Promise.resolve(null);
  }

  getProduct(id: number): Promise<Product> {
    for (let product of this.products) {
      if (id == product.id) {
        return Promise.resolve(product);
      }
    }
    return Promise.resolve(null);
  }

  getAllProducts(): Promise<Product[]> {
    return Promise.resolve(this.products);
  }

  addRecipe(recipe: Recipe): Promise<Recipe> {
    if (recipe.id == null) {
      recipe.id = this.recipe_id++;
      this.recipes.push(recipe);
      for (let item of recipe.items) {
        this.addRecipeItem(recipe.id, item);
      }
      for (let tag of recipe.tags) {
        this.addRecipeTag(recipe.id, tag);
      }
    }
    return Promise.resolve(recipe);
  }

  updateRecipe(recipe: Recipe): Promise<Recipe> {
    for (let varRecipe of this.recipes) {
      if (recipe.id == varRecipe.id) {
        this.deleteAllRecipeItemsByRecipeId(varRecipe.id);
        for (let item of recipe.items) {
          this.addRecipeItem(recipe.id, item);
        }
        this.deleteAllRecipeTagsByRecipeId(varRecipe.id);
        for (let tag of recipe.tags) {
          this.addRecipeTag(recipe.id, tag);
        }
        varRecipe = recipe;
        return Promise.resolve(recipe);
      }
    }
    return Promise.resolve(null);
  }

  deleteRecipe(recipe: Recipe): Promise<Recipe> {
    const index: number = this.recipes.indexOf(recipe);
    if (index != -1) {
      this.deleteAllRecipeItemsByRecipeId(recipe.id);
      this.deleteAllRecipeTagsByRecipeId(recipe.id);
      this.recipes.splice(index, 1);
      return Promise.resolve(recipe);
    }
    return Promise.resolve(null);
  }

  getRecipe(id: number): Promise<Recipe> {
    for (let recipe of this.recipes) {
      if (id == recipe.id) {
        return Promise.resolve(recipe);
      }
    }
    return Promise.resolve(null);
  }

  getAllRecipes(): Promise<Recipe[]> {
    return Promise.resolve(this.recipes);
  }

  addRecipeItem(id_recipe: number, recipeItem: RecipeItem) {
    this.addFood(recipeItem.food)
      .then((data) => {
        for (let item of this.recipe_items) {
          if (item[0] == id_recipe && item[1].food.id == data.id) {
            return Promise.resolve(recipeItem);
          }
        }
        recipeItem.food.id = data.id;
        this.recipe_items.push([id_recipe, recipeItem]);
        return Promise.resolve(recipeItem);
      })

  }

  deleteAllRecipeItemsByRecipeId(id: number): Promise<boolean> {
    for (let item of this.recipe_items) {
      if (id == item[0]) {
        const index: number = this.recipe_tags.indexOf(item);
        if (index != -1) {
          this.recipe_items.splice(index, 1);
        }
      }
    }
    return Promise.resolve(true);
  }

  getAllRecipeItemsByRecipeId(id: number): Promise<RecipeItem[]> {
    let items: RecipeItem[] = [];
    for (let item of this.recipe_items) {
      if (id == item[0]) {
        items.push(item[1]);
      }
    }
    return Promise.resolve(items);
  }

  getAllRecipeItems(): Promise<RecipeItem[]> {
    let items: RecipeItem[] = [];
    for (let item of this.recipe_items) {
      items.push(item[1]);
    }
    return Promise.resolve(items);
  }

  addRecipeTag(id_recipe: number, name: string): Promise<string> {
    for (let tag of this.recipe_tags) {
      if (tag[0] == id_recipe && tag[1] == name) {
        return Promise.resolve(name);
      }
    }
    this.recipe_tags.push([id_recipe, name]);
    return Promise.resolve(name);
  }

  deleteAllRecipeTagsByRecipeId(id: number): Promise<boolean> {
    for (let tag of this.recipe_tags) {
      if (id == tag[0]) {
        const index: number = this.recipe_tags.indexOf(tag);
        if (index != -1) {
          this.recipe_tags.splice(index, 1);
        }
      }
    }
    return Promise.resolve(true);
  }

  getAllRecipeTagsByRecipeId(id: number): Promise<string[]> {
    let tags: string[] = [];
    for (let tag of this.recipe_tags) {
      if (id == tag[0]) {
        tags.push(tag[1]);
      }
    }
    return Promise.resolve(tags);
  }

  getAllRecipeTags(): Promise<string[]> {
    let tags: string[] = [];
    for (let tag of this.recipe_tags) {
      tags.push(tag[1]);
    }
    return Promise.resolve(tags);
  }

  getDatabaseState(): Observable<boolean> {
    return this.databaseReady.asObservable();
  }
}


