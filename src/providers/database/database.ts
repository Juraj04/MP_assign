import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Platform} from "ionic-angular";
import {SQLite, SQLiteObject} from '@ionic-native/sqlite';
import {SQLitePorter} from '@ionic-native/sqlite-porter';
import {Observable} from 'rxjs/Observable';

import {Product} from '../../models/product';
import {Difficulty, Recipe} from "../../models/recipe";
import {DatabaseModel} from "../../models/database-model";
import {Food, Unit} from "../../models/food";
import {Location} from '../../models/location';
import {RecipeItem} from "../../models/recipeItem";

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {
  private readonly databaseName: string = 'data.db';
  private database: SQLiteObject;

  constructor(private sqlite: SQLite, private sqlitePorter: SQLitePorter, private platform: Platform) {
    console.log('Hello DatabaseProvider Provider');

    this.platform.ready().then(() => {
      this.sqlite.create({
        name: this.databaseName,
        location: 'default'
      })
        .then((database: SQLiteObject) => {
          this.database = database;
          //DatabaseModel.dropAllTables(sqlitePorter, this.database).then(() => {
          DatabaseModel.createTables(sqlitePorter, this.database);
          //});
        });
    });

    this.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        //this.createProducts();
        //this.createDummyRecipes();
      }
    })
  }

  //TODO: zapoznamkovat vypisy

  private createProducts() {
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
      let sql = 'INSERT INTO ' + DatabaseModel.TABLE_LOCATIONS
        + ' ('
        + DatabaseModel.COLUMN_NAME + ', '
        + DatabaseModel.COLUMN_X + ', '
        + DatabaseModel.COLUMN_Y
        + ') VALUES (?, ?, ?)';

      return this.database.executeSql(sql, [location.name, location.x, location.y])
        .then(data => {
          console.log('Executed: ', sql);
          location.id = data.insertId;
          //console.log('addLocation location= ', location);
          return location;
        }).catch(err => console.log(err));
    } else return Promise.resolve(location);
  }

  /*//useless
  updateLocation(location: Location): Promise<Location> {
    let sql = 'UPDATE ' + DatabaseModel.TABLE_LOCATIONS
      + ' SET '
      + DatabaseModel.COLUMN_NAME + ' = (?), '
      + DatabaseModel.COLUMN_X + ' = (?), '
      + DatabaseModel.COLUMN_Y + ' = (?)'
      + ' WHERE ' + DatabaseModel.COLUMN_ID + ' = (?)';

    return this.database.executeSql(sql, [location.name, location.x, location.y, location.id])
      .then(() => {
        console.log('Executed: ', sql);
        //console.log('updateLocation location= ', location);
        return location;
      }).catch(err => console.log(err));
  }*/

  /*deleteLocation(location: Location): Promise<Location> {
    return null;
  }*/

  getLocation(id: number): Promise<Location> {
    let sql = 'SELECT * FROM ' + DatabaseModel.TABLE_LOCATIONS + ' WHERE ' + DatabaseModel.COLUMN_ID + ' = (?)';

    return this.database.executeSql(sql, [id])
      .then(data => {
        console.log('Executed: ', sql);
        let location: Location = null;
        if (data.rows.length == 1) {
          location = new Location(data.rows.item(0).name, data.rows.item(0).x, data.rows.item(0).y);
          location.id = data.rows.item(0).id;
        }
        //console.log('getLocation location= ', location);
        return location;
      }).catch(err => console.log(err));
  }

  getAllLocations(): Promise<Location[]> {
    let sql = 'SELECT * FROM ' + DatabaseModel.TABLE_LOCATIONS;

    return this.database.executeSql(sql, [])
      .then((data) => {
        console.log('Executed: ', sql);
        let locations: Location[] = [];
        if (data.rows.length > 0) {
          for (let i = 0; i < data.rows.length; i++) {
            let location: Location = new Location(data.rows.item(i).name, data.rows.item(i).x, data.rows.item(i).y);
            location.id = data.rows.item(i).id;
            locations.push(location);
          }
        }
        //console.log('getAllLocations locations= ', locations);
        return locations;
      }).catch(err => console.log(err));
  }

  addFood(food: Food): Promise<Food> {
    if (food.id == null
    ) {
      let sql = 'INSERT INTO ' + DatabaseModel.TABLE_FOODS
        + ' ('
        + DatabaseModel.COLUMN_NAME + ', '
        + DatabaseModel.COLUMN_UNIT
        + ') VALUES (?, ?)';

      return this.database.executeSql(sql, [food.name, food.unit])
        .then(data => {
          console.log('Executed: ', sql);
          food.id = data.insertId;
          //console.log('addFood food= ', food);
          return food;
        }).catch(err => console.log(err));
    }
    else
      return Promise.resolve(food);
  }

  /*//useless
  updateFood(food: Food): Promise<Food> {
    let sql = 'UPDATE ' + DatabaseModel.TABLE_FOODS
      + ' SET '
      + DatabaseModel.COLUMN_NAME + ' = (?), '
      + DatabaseModel.COLUMN_UNIT + ' = (?)'
      + ' WHERE ' + DatabaseModel.COLUMN_ID + ' = (?)';

    return this.database.executeSql(sql, [food.name, food.unit, food.id])
      .then(() => {
        console.log('Executed: ', sql);
        //console.log('updateFood food= ', food);
        return food;
      }).catch(err => console.log(err));
  }*/

  /*deleteFood(food: Food): Promise<Food> {
    return null;
  }*/

  getFood(id: number): Promise<Food> {
    let sql = 'SELECT * FROM ' + DatabaseModel.TABLE_FOODS + ' WHERE ' + DatabaseModel.COLUMN_ID + ' = (?)';

    return this.database.executeSql(sql, [id])
      .then(data => {
        console.log('Executed: ', sql);
        let food: Food = null;
        if (data.rows.length > 0) {
          food = new Food(data.rows.item(0).name, data.rows.item(0).unit);
          food.id = data.rows.item(0).id;
        }
        //console.log('getFood food= ', food);
        return food;
      }).catch(err => console.log(err));
  }

  getAllFoods(): Promise<Food[]> {
    let sql = 'SELECT * FROM ' + DatabaseModel.TABLE_FOODS;

    return this.database.executeSql(sql, [])
      .then((data) => {
        console.log('Executed: ', sql);
        let foods: Food[] = [];
        if (data.rows.length > 0) {
          for (let i = 0; i < data.rows.length; i++) {
            let food: Food = new Food(data.rows.item(i).name, data.rows.item(i).unit);
            food.id = data.rows.item(i).id;
            foods.push(food);
          }
        }
        //console.log('getAllFoods foods= ', foods);
        return foods;
      }).catch(err => console.log(err));
  }

  addProduct(product: Product): Promise<Product> {
    if (product.id == null
    ) {
      return Promise.all([this.addLocation(product.location), this.addFood(product.food)]).then(data => {
        let sql = 'INSERT INTO ' + DatabaseModel.TABLE_PRODUCTS
          + ' ('
          + DatabaseModel.COLUMN_NAME + ', '
          + DatabaseModel.COLUMN_PRICE + ', '
          + DatabaseModel.COLUMN_DATE + ', '
          + DatabaseModel.COLUMN_RATING + ', '
          + DatabaseModel.COLUMN_QUANTITY + ', '
          + DatabaseModel.COLUMN_COUNT_FRIDGE + ', '
          + DatabaseModel.COLUMN_PHOTO + ', '
          + DatabaseModel.COLUMN_ID_LOCATION + ', '
          + DatabaseModel.COLUMN_ID_FOOD
          + ') VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';

        return this.database.executeSql(sql,
          [product.name, product.price, product.date, product.rating, product.quantity, product.count_fridge, product.photo, data[0].id, data[1].id])
          .then(data => {
            console.log('Executed: ', sql);
            product.id = data.insertId;
            let inserts = [];
            for (let tag of product.tags) {
              inserts.push(this.addProductTag(product.id, tag));
            }
            return Promise.all(inserts)
              .then(() => {
                //console.log('addProduct product= ', product);
                return product;
              });
          }).catch(err => console.log(err));
      });
    }
    else
      return Promise.resolve(product);
  }

  updateProduct(product: Product): Promise<Product> {
    return Promise.all([this.addLocation(product.location), this.addFood(product.food)]).then(data => {
      let sql = 'UPDATE ' + DatabaseModel.TABLE_PRODUCTS
        + ' SET '
        + DatabaseModel.COLUMN_NAME + ' = (?), '
        + DatabaseModel.COLUMN_PRICE + ' = (?), '
        + DatabaseModel.COLUMN_DATE + ' = (?), '
        + DatabaseModel.COLUMN_RATING + ' = (?), '
        + DatabaseModel.COLUMN_QUANTITY + ' = (?), '
        + DatabaseModel.COLUMN_COUNT_FRIDGE + ' = (?), '
        + DatabaseModel.COLUMN_PHOTO + ' = (?), '
        + DatabaseModel.COLUMN_ID_LOCATION + ' = (?), '
        + DatabaseModel.COLUMN_ID_FOOD + ' = (?)'
        + ' WHERE ' + DatabaseModel.COLUMN_ID + ' = (?)';

      return this.database.executeSql(sql,
        [product.name, product.price, product.date, product.rating, product.quantity, product.count_fridge, product.photo, data[0].id, data[1].id, product.id])
        .then(() => {
          console.log('Executed: ', sql);
          let inserts = [];
          this.deleteAllProductTagsByProductId(product.id)
            .then(() => {
              for (let tag of product.tags) {
                inserts.push(this.addProductTag(product.id, tag));
              }
            });
          return Promise.all(inserts)
            .then(() => {
              //console.log('updateProduct product= ', product);
              return product;
            });
        }).catch(err => console.log(err));
    });
  }

  deleteProduct(product: Product): Promise<Product> {
    return this.deleteAllProductTagsByProductId(product.id)
      .then(() => {
        let sql = 'DELETE FROM ' + DatabaseModel.TABLE_PRODUCTS + ' WHERE ' + DatabaseModel.COLUMN_ID + ' = (?)';

        return this.database.executeSql(sql, [product.id])
          .then(() => {
            console.log('Executed: ', sql);
            //console.log('deleteProduct= product', product);
            return product;
          }).catch(err => console.log(err));
      });
  }

  getProduct(id: number): Promise<Product> {
    let sql = 'SELECT '
      + DatabaseModel.TABLE_PRODUCTS + '.' + DatabaseModel.COLUMN_ID + ' AS id, '
      + DatabaseModel.TABLE_PRODUCTS + '.' + DatabaseModel.COLUMN_NAME + ' AS name, '
      + DatabaseModel.TABLE_PRODUCTS + '.' + DatabaseModel.COLUMN_PRICE + ' AS price, '
      + DatabaseModel.TABLE_PRODUCTS + '.' + DatabaseModel.COLUMN_DATE + ' AS date, '
      + DatabaseModel.TABLE_PRODUCTS + '.' + DatabaseModel.COLUMN_RATING + ' AS rating, '
      + DatabaseModel.TABLE_PRODUCTS + '.' + DatabaseModel.COLUMN_QUANTITY + ' AS quantity, '
      + DatabaseModel.TABLE_PRODUCTS + '.' + DatabaseModel.COLUMN_COUNT_FRIDGE + ' AS count_fridge, '
      + DatabaseModel.TABLE_PRODUCTS + '.' + DatabaseModel.COLUMN_PHOTO + ' AS photo, '
      + DatabaseModel.TABLE_LOCATIONS + '.' + DatabaseModel.COLUMN_ID + ' AS location_id, '
      + DatabaseModel.TABLE_LOCATIONS + '.' + DatabaseModel.COLUMN_NAME + ' AS location_name, '
      + DatabaseModel.TABLE_LOCATIONS + '.' + DatabaseModel.COLUMN_X + ' AS location_x, '
      + DatabaseModel.TABLE_LOCATIONS + '.' + DatabaseModel.COLUMN_Y + ' AS location_y, '
      + DatabaseModel.TABLE_FOODS + '.' + DatabaseModel.COLUMN_ID + ' AS food_id, '
      + DatabaseModel.TABLE_FOODS + '.' + DatabaseModel.COLUMN_NAME + ' AS food_name, '
      + DatabaseModel.TABLE_FOODS + '.' + DatabaseModel.COLUMN_UNIT + ' AS food_unit'
      + ' FROM ' + DatabaseModel.TABLE_PRODUCTS
      + ' JOIN ' + DatabaseModel.TABLE_LOCATIONS + ' ON '
      + DatabaseModel.TABLE_PRODUCTS + '.' + DatabaseModel.COLUMN_ID_LOCATION + ' = ' + DatabaseModel.TABLE_LOCATIONS + '.' + DatabaseModel.COLUMN_ID
      + ' JOIN ' + DatabaseModel.TABLE_FOODS + ' ON '
      + DatabaseModel.TABLE_PRODUCTS + '.' + DatabaseModel.COLUMN_ID_FOOD + ' = ' + DatabaseModel.TABLE_FOODS + '.' + DatabaseModel.COLUMN_ID
      + ' WHERE ' + DatabaseModel.TABLE_PRODUCTS + '.' + DatabaseModel.COLUMN_ID + ' = (?)';

    return Promise.all([this.database.executeSql(sql, [id]), this.getAllProductTagsByProductId(id)]).then((data) => {
      console.log('Executed: ', sql);
      let product: Product = null;
      if (data[0].rows.length > 0) {
        let location: Location = new Location(data[0].rows.item(0).location_name, data[0].rows.item(0).location_x, data[0].rows.item(0).location_y)
        location.id = data[0].rows.item(0).location_id;
        let food: Food = new Food(data[0].rows.item(0).food_name, data[0].rows.item(0).food_unit);
        food.id = data[0].rows.item(0).food_id;

        product = new Product(
          data[0].rows.item(0).name,
          location,
          data[0].rows.item(0).price,
          data[0].rows.item(0).date,
          data[0].rows.item(0).rating,
          data[0].rows.item(0).quantity,
          data[0].rows.item(0).count_fridge,
          food,
          data[0].rows.item(0).photo,
          data[1]);
        product.id = data[0].rows.item(0).id;
      }
      //console.log('getProduct product= ', product);
      return product;
    }).catch(err => console.log(err));
  }

  getAllProducts(): Promise<Product[]> {
    let sql = 'SELECT '
      + DatabaseModel.TABLE_PRODUCTS + '.' + DatabaseModel.COLUMN_ID + ' AS id, '
      + DatabaseModel.TABLE_PRODUCTS + '.' + DatabaseModel.COLUMN_NAME + ' AS name, '
      + DatabaseModel.TABLE_PRODUCTS + '.' + DatabaseModel.COLUMN_PRICE + ' AS price, '
      + DatabaseModel.TABLE_PRODUCTS + '.' + DatabaseModel.COLUMN_DATE + ' AS date, '
      + DatabaseModel.TABLE_PRODUCTS + '.' + DatabaseModel.COLUMN_RATING + ' AS rating, '
      + DatabaseModel.TABLE_PRODUCTS + '.' + DatabaseModel.COLUMN_QUANTITY + ' AS quantity, '
      + DatabaseModel.TABLE_PRODUCTS + '.' + DatabaseModel.COLUMN_COUNT_FRIDGE + ' AS count_fridge, '
      + DatabaseModel.TABLE_PRODUCTS + '.' + DatabaseModel.COLUMN_PHOTO + ' AS photo, '
      + DatabaseModel.TABLE_LOCATIONS + '.' + DatabaseModel.COLUMN_ID + ' AS location_id, '
      + DatabaseModel.TABLE_LOCATIONS + '.' + DatabaseModel.COLUMN_NAME + ' AS location_name, '
      + DatabaseModel.TABLE_LOCATIONS + '.' + DatabaseModel.COLUMN_X + ' AS location_x, '
      + DatabaseModel.TABLE_LOCATIONS + '.' + DatabaseModel.COLUMN_Y + ' AS location_y, '
      + DatabaseModel.TABLE_FOODS + '.' + DatabaseModel.COLUMN_ID + ' AS food_id, '
      + DatabaseModel.TABLE_FOODS + '.' + DatabaseModel.COLUMN_NAME + ' AS food_name, '
      + DatabaseModel.TABLE_FOODS + '.' + DatabaseModel.COLUMN_UNIT + ' AS food_unit'
      + ' FROM ' + DatabaseModel.TABLE_PRODUCTS
      + ' JOIN ' + DatabaseModel.TABLE_LOCATIONS + ' ON '
      + DatabaseModel.TABLE_PRODUCTS + '.' + DatabaseModel.COLUMN_ID_LOCATION + ' = ' + DatabaseModel.TABLE_LOCATIONS + '.' + DatabaseModel.COLUMN_ID
      + ' JOIN ' + DatabaseModel.TABLE_FOODS + ' ON '
      + DatabaseModel.TABLE_PRODUCTS + '.' + DatabaseModel.COLUMN_ID_FOOD + ' = ' + DatabaseModel.TABLE_FOODS + '.' + DatabaseModel.COLUMN_ID;

    return this.database.executeSql(sql, [])
      .then(data => {
        console.log('Executed: ', sql);
        let products: Product[] = [];
        if (data.rows.length > 0) {
          for (let i = 0; i < data.rows.length; i++) {
            let location: Location = new Location(data.rows.item(i).location_name, data.rows.item(i).location_x, data.rows.item(i).location_y)
            location.id = data.rows.item(i).location_id;
            let food: Food = new Food(data.rows.item(i).food_name, data.rows.item(i).food_unit);
            food.id = data.rows.item(i).food_id;

            this.getAllProductTagsByProductId(data.rows.item(i).id)
              .then(tags => {
                let product: Product = new Product(
                  data.rows.item(i).name,
                  location,
                  data.rows.item(i).price,
                  data.rows.item(i).date,
                  data.rows.item(i).rating,
                  data.rows.item(i).quantity,
                  data.rows.item(i).count_fridge,
                  food,
                  data.rows.item(i).photo,
                  tags);
                product.id = data.rows.item(i).id;
                products.push(product);
              })
          }
        }
        //console.log('getAllProducts products= ', products);
        return products;
      }).catch(err => console.log(err));
  }

  addProductTag(id_product: number, name: string): Promise<string> {
    let sql = 'INSERT INTO ' + DatabaseModel.TABLE_PRODUCT_TAGS
      + ' ('
      + DatabaseModel.COLUMN_ID_PRODUCT + ', '
      + DatabaseModel.COLUMN_NAME
      + ') VALUES (?, ?)';

    return this.database.executeSql(sql, [id_product, name])
      .then(() => {
        console.log('Executed: ', sql);
        //console.log('addProductTag name= ', name);
        return name;
      }).catch(err => console.log(err));
  }

  deleteAllProductTagsByProductId(id: number): Promise<boolean> {
    let sql = 'DELETE FROM ' + DatabaseModel.TABLE_PRODUCT_TAGS + ' WHERE ' + DatabaseModel.COLUMN_ID_PRODUCT + ' = (?)';

    return this.database.executeSql(sql, [id])
      .then(() => {
        console.log('Executed: ', sql);
        return true;
      }).catch(err => console.log(err));
  }

  getAllProductTagsByProductId(id: number): Promise<string[]> {
    let sql = 'SELECT * FROM ' + DatabaseModel.TABLE_PRODUCT_TAGS + ' WHERE ' + DatabaseModel.COLUMN_ID_PRODUCT + ' = (?)';

    return this.database.executeSql(sql, [id])
      .then((data) => {
        console.log('Executed: ', sql);
        let productTags: string[] = [];
        if (data.rows.length > 0) {
          for (let i = 0; i < data.rows.length; i++) {
            productTags.push(data.rows.item(i).name);
          }
        }
        //console.log('getAllProductTagsByProductId productTags= ', productTags);
        return productTags;
      }).catch(err => console.log(err));
  }

  getAllProductTags(): Promise<string[]> {
    let sql = 'SELECT * FROM ' + DatabaseModel.TABLE_PRODUCT_TAGS;

    return this.database.executeSql(sql, [])
      .then((data) => {
        console.log('Executed: ', sql);
        let productTags: string[] = [];
        if (data.rows.length > 0) {
          for (let i = 0; i < data.rows.length; i++) {
            productTags.push(data.rows.item(i).name);
          }
        }
        //console.log('getAllProductTags productTags= ', productTags);
        return productTags;
      }).catch(err => console.log(err));
  }

  addRecipe(recipe: Recipe): Promise<Recipe> {
    if (recipe.id == null
    ) {
      let sql = 'INSERT INTO ' + DatabaseModel.TABLE_RECIPES
        + ' ('
        + DatabaseModel.COLUMN_NAME + ', '
        + DatabaseModel.COLUMN_RATING + ', '
        + DatabaseModel.COLUMN_PORTIONS + ', '
        + DatabaseModel.COLUMN_TIME + ', '
        + DatabaseModel.COLUMN_DIFFICULTY + ', '
        + DatabaseModel.COLUMN_DESCRIPTION + ', '
        + DatabaseModel.COLUMN_PHOTO
        + ') VALUES (?, ?, ?, ?, ?, ?, ?)';

      return this.database.executeSql(sql,
        [recipe.name, recipe.rating, recipe.portions, recipe.time, recipe.difficulty, recipe.description, recipe.photo])
        .then(data => {
          console.log('Executed: ', sql);
          recipe.id = data.insertId;
          let inserts = [];
          for (let recipeItem of recipe.items) {
            inserts.push(this.addRecipeItem(recipe.id, recipeItem));
          }
          for (let tag of recipe.tags) {
            inserts.push(this.addRecipeTag(recipe.id, tag));
          }
          return Promise.all(inserts)
            .then(() => {
              console.log('addRecipe recipe= ', recipe);
              return recipe;
            });
        }).catch(err => console.log(err));
    }
    else return Promise.resolve(recipe);
  }

  updateRecipe(recipe: Recipe): Promise<Recipe> {
    let sql = 'UPDATE ' + DatabaseModel.TABLE_RECIPES
      + ' SET '
      + DatabaseModel.COLUMN_NAME + ' = (?), '
      + DatabaseModel.COLUMN_RATING + ' = (?), '
      + DatabaseModel.COLUMN_PORTIONS + ' = (?), '
      + DatabaseModel.COLUMN_TIME + ' = (?), '
      + DatabaseModel.COLUMN_DIFFICULTY + ' = (?), '
      + DatabaseModel.COLUMN_DESCRIPTION + ' = (?), '
      + DatabaseModel.COLUMN_PHOTO + ' = (?)'
      + ' WHERE ' + DatabaseModel.COLUMN_ID + ' = (?)';

    return this.database.executeSql(sql,
      [recipe.name, recipe.rating, recipe.portions, recipe.time, recipe.difficulty, recipe.description, recipe.photo, recipe.id])
      .then(() => {
        console.log('Executed: ', sql);
        let inserts = [];
        this.deleteAllRecipeItemsByRecipeId(recipe.id)
          .then(() => {
            for (let recipeItem of recipe.items) {
              inserts.push(this.addRecipeItem(recipe.id, recipeItem));
            }
          });
        this.deleteAllRecipeTagsByRecipeId(recipe.id)
          .then(() => {
            for (let tag of recipe.tags) {
              inserts.push(this.addRecipeTag(recipe.id, tag));
            }
          });
        return Promise.all(inserts)
          .then(() => {
            console.log('updateRecipe recipe= ', recipe);
            return recipe;
          });
      }).catch(err => console.log(err));
  }

  deleteRecipe(recipe: Recipe): Promise<Recipe> {
    return Promise.all([this.deleteAllRecipeItemsByRecipeId(recipe.id), this.deleteAllRecipeTagsByRecipeId(recipe.id)])
      .then(() => {
        let sql = 'DELETE FROM ' + DatabaseModel.TABLE_RECIPES + ' WHERE ' + DatabaseModel.COLUMN_ID + ' = (?)';

        return this.database.executeSql(sql, [recipe.id])
          .then(() => {
            console.log('Executed: ', sql);
            //console.log('deleteRecipe= recipe', recipe);
            return recipe;
          }).catch(err => console.log(err));
      });
  }

  getRecipe(id: number): Promise<Recipe> {
    let sql = 'SELECT * FROM ' + DatabaseModel.TABLE_RECIPES + ' WHERE ' + DatabaseModel.TABLE_RECIPES + '.' + DatabaseModel.COLUMN_ID + ' = (?)';

    return Promise.all([this.database.executeSql(sql, [id]), this.getAllRecipeItemsByRecipeId(id), this.getAllRecipeTagsByRecipeId(id)])
      .then((data) => {
        console.log('Executed: ', sql);
        let recipe: Recipe = null;
        if (data[0].rows.length > 0) {
          recipe = new Recipe(
            data[0].rows.item(0).name,
            data[0].rows.item(0).portions,
            data[0].rows.item(0).time,
            data[0].rows.item(0).rating,
            data[0].rows.item(0).difficulty,
            data[0].rows.item(0).description,
            data[0].rows.item(0).photo,
            data[1],
            data[2]);
          recipe.id = data[0].rows.item(0).id;
        }
        console.log('getRecipe recipe= ', recipe);
        return recipe;
      })
      .catch(err => console.log(err));
  }

  getAllRecipes(): Promise<Recipe[]> {
    let sql = 'SELECT * FROM ' + DatabaseModel.TABLE_RECIPES;

    return this.database.executeSql(sql, [])
      .then((data) => {
        console.log('Executed: ', sql);
        let recipes: Recipe[] = [];
        if (data.rows.length > 0) {
          for (let i = 0; i < data.rows.length; i++) {
            Promise.all([this.getAllRecipeItemsByRecipeId(data.rows.item(i).id), this.getAllRecipeTagsByRecipeId(data.rows.item(i).id)])
              .then((data2) => {
                let recipe: Recipe = new Recipe(
                  data.rows.item(i).name,
                  data.rows.item(i).portions,
                  data.rows.item(i).time,
                  data.rows.item(i).rating,
                  data.rows.item(i).difficulty,
                  data.rows.item(i).description,
                  data.rows.item(i).photo,
                  data2[0],
                  data2[1]);
                recipe.id = data.rows.item(i).id;
                recipes.push(recipe);
              })
          }
        }
        console.log('getAllRecipes recipes= ', recipes);
        return recipes;
      })
      .catch(err => console.log(err));
  }

  addRecipeItem(id_recipe: number, recipeItem: RecipeItem) : Promise<RecipeItem> {
    let sql = 'INSERT INTO ' + DatabaseModel.TABLE_RECIPE_ITEMS
      + ' ('
      + DatabaseModel.COLUMN_ID_RECIPE + ', '
      + DatabaseModel.COLUMN_ID_FOOD + ', '
      + DatabaseModel.COLUMN_COUNT
      + ') VALUES (?, ?, ?)';

    return this.addFood(recipeItem.food)
      .then((data) => {
        return this.database.executeSql(sql, [id_recipe, data.id, recipeItem.count])
          .then(() => {
            console.log('Executed: ', sql);
            console.log('addRecipeItem recipeItem= ', recipeItem);
            return recipeItem;
          }).catch(err => console.log(err));
      })
  }

  deleteAllRecipeItemsByRecipeId(id: number): Promise<boolean> {
    let sql = 'DELETE FROM ' + DatabaseModel.TABLE_RECIPE_ITEMS + ' WHERE ' + DatabaseModel.COLUMN_ID_RECIPE + ' = (?)';

    return this.database.executeSql(sql, [id])
      .then(() => {
        console.log('Executed: ', sql);
        return true;
      }).catch(err => console.log(err));
  }

  getAllRecipeItemsByRecipeId(id: number): Promise<RecipeItem[]> {
    let sql = 'SELECT * FROM ' + DatabaseModel.TABLE_RECIPE_ITEMS + ' WHERE ' + DatabaseModel.COLUMN_ID_RECIPE + ' = (?)';

    return this.database.executeSql(sql, [id])
      .then((data) => {
        console.log('Executed: ', sql);
        let recipeItems: RecipeItem[] = [];
        if (data.rows.length > 0) {
          for (let i = 0; i < data.rows.length; i++) {
            this.getFood(data.rows.item(i).id_food)
              .then((food) => {
                recipeItems.push(new RecipeItem(food, data.rows.item(i).count));
              });
          }
        }
        console.log('getAllRecipeItemsByRecipeId recipeItems= ', recipeItems);
        return recipeItems;
      }).catch(err => console.log(err));
  }

  getAllRecipeItems(): Promise<RecipeItem[]> {
    let sql = 'SELECT * FROM ' + DatabaseModel.TABLE_RECIPE_ITEMS;

    return this.database.executeSql(sql, [])
      .then((data) => {
        console.log('Executed: ', sql);
        let recipeItems: RecipeItem[] = [];
        if (data.rows.length > 0) {
          for (let i = 0; i < data.rows.length; i++) {
            this.getFood(data.rows.item(i).id_food)
              .then((food) => {
                recipeItems.push(new RecipeItem(food, data.rows.item(i).count));
              });
          }
        }
        console.log('getAllRecipeItems recipeItems= ', recipeItems);
        return recipeItems;
      }).catch(err => console.log(err));
  }

  addRecipeTag(id_recipe: number, name: string): Promise<string> {
    let sql = 'INSERT INTO ' + DatabaseModel.TABLE_RECIPE_TAGS
      + ' ('
      + DatabaseModel.COLUMN_ID_RECIPE + ', '
      + DatabaseModel.COLUMN_NAME
      + ') VALUES (?, ?)';

    return this.database.executeSql(sql, [id_recipe, name])
      .then(() => {
        console.log('Executed: ', sql);
        console.log('addRecipeTag name= ', name);
        return name;
      }).catch(err => console.log(err));
  }

  deleteAllRecipeTagsByRecipeId(id: number): Promise<boolean> {
    let sql = 'DELETE FROM ' + DatabaseModel.TABLE_RECIPE_TAGS + ' WHERE ' + DatabaseModel.COLUMN_ID_RECIPE + ' = (?)';

    return this.database.executeSql(sql, [id])
      .then(() => {
        console.log('Executed: ', sql);
        return true;
      }).catch(err => console.log(err));
  }

  getAllRecipeTagsByRecipeId(id: number): Promise<string[]> {
    let sql = 'SELECT * FROM ' + DatabaseModel.TABLE_RECIPE_TAGS + ' WHERE ' + DatabaseModel.COLUMN_ID_RECIPE + ' = (?)';

    return this.database.executeSql(sql, [id])
      .then((data) => {
        console.log('Executed: ', sql);
        let recipeTags: string[] = [];
        if (data.rows.length > 0) {
          for (let i = 0; i < data.rows.length; i++) {
            recipeTags.push(data.rows.item(i).name);
          }
        }
        console.log('getAllRecipeTagsByRecipeId recipeTags= ', recipeTags);
        return recipeTags;
      }).catch(err => console.log(err));
  }

  getAllRecipeTags(): Promise<string[]> {
    let sql = 'SELECT * FROM ' + DatabaseModel.TABLE_RECIPE_TAGS;

    return this.database.executeSql(sql, [])
      .then((data) => {
        console.log('Executed: ', sql);
        let recipeTags: string[] = [];
        if (data.rows.length > 0) {
          for (let i = 0; i < data.rows.length; i++) {
            recipeTags.push(data.rows.item(i).name);
          }
        }
        console.log('getAllRecipeTags recipeTags= ', recipeTags);
        return recipeTags;
      }).catch(err => console.log(err));
  }

  getDatabaseState(): Observable<boolean> {
    return DatabaseModel.getDatabaseState();
  }
}
