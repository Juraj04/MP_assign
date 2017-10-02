import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Platform} from "ionic-angular";
import {SQLite, SQLiteObject} from '@ionic-native/sqlite';
import {SQLitePorter} from '@ionic-native/sqlite-porter';
import {Observable} from 'rxjs/Observable';

import {Product} from '../../models/product';
import {Recipe} from "../../models/recipe";
import {DatabaseModel} from "../../models/database-model";
import {Food, Unit} from "../../models/food";
import {Location} from '../../models/location';

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
          DatabaseModel.dropAllTables(sqlitePorter, this.database).then(() => {
            DatabaseModel.createTables(sqlitePorter, this.database);
          });
        });
    });

    this.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.test();
      }
    })
  }

  test() {
    let food1: Food = new Food("FoodName", Unit.kg);
    let location1: Location = new Location("LocationName", 100.10, 100.20);
    let product: Product = new Product('ProductName', location1, 123, 'ProductDate', 1, 100, 50, food1, 'ProductPhoto', ['ProductTag1', 'ProductTag2', 'ProductTag3']);

    this.addLocation(location1);
    this.addProduct(product)
      .then(() => {
        /*this.getAllLocations();
        this.getLocation(2);
        this.getAllFoods();
        this.getFood(1);
        this.getAllProductTags();
        this.getAllProductTagsByProductId(1);*/

        this.getProduct(1);
      });
  }

  addLocation(location: Location): Promise<any> {
    let sql = 'INSERT INTO ' + DatabaseModel.TABLE_LOCATIONS
      + ' ('
      + DatabaseModel.COLUMN_NAME + ', '
      + DatabaseModel.COLUMN_X + ', '
      + DatabaseModel.COLUMN_Y
      + ') VALUES (?, ?, ?)';
    let values = [location.name, location.x, location.y];

    return this.database.executeSql(sql, values)
      .then(data => {
        console.log('Executed: ', sql);
        console.log('addLocation data= ', data);
        return data;
      }).catch(err => console.log(err));
  }

  getLocation(id: number): Promise<Location> {
    let sql = 'SELECT * FROM ' + DatabaseModel.TABLE_LOCATIONS + ' WHERE ' + DatabaseModel.COLUMN_ID + ' = (?)';
    let values = [id];

    return this.database.executeSql(sql, values)
      .then(data => {
        console.log('Executed: ', sql);
        let location = null;
        if (data.rows.length > 0) {
          location = new Location(data.rows.item(0).name, data.rows.item(0).x, data.rows.item(0).y);
          location.id = data.rows.item(0).id;
        }
        console.log('getLocation location= ', location);
        return location;
      }).catch(err => console.log(err));
  }

  getAllLocations(): Promise<Location[]> {
    let sql = 'SELECT * FROM ' + DatabaseModel.TABLE_LOCATIONS;

    return this.database.executeSql(sql, [])
      .then((data) => {
        console.log('Executed: ', sql);
        let locations = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            let location = new Location(data.rows.item(i).name, data.rows.item(i).x, data.rows.item(i).y);
            location.id = data.rows.item(i).id;
            locations.push(location);
          }
        }
        console.log('getAllLocations locations= ', locations);
        return locations;
      }).catch(err => console.log(err));
  }

  addFood(food: Food): Promise<any> {
    let sql = 'INSERT INTO ' + DatabaseModel.TABLE_FOODS
      + ' ('
      + DatabaseModel.COLUMN_NAME + ', '
      + DatabaseModel.COLUMN_UNIT
      + ') VALUES (?, ?)';
    let values = [food.name, food.unit]

    return this.database.executeSql(sql, values)
      .then(data => {
        console.log('Executed: ', sql);
        console.log('addFood data= ', data);
        return data;
      }).catch(err => console.log(err));
  }

  getFood(id: number): Promise<Food> {
    let sql = 'SELECT * FROM ' + DatabaseModel.TABLE_FOODS + ' WHERE ' + DatabaseModel.COLUMN_ID + ' = (?)';
    let values = [id];

    return this.database.executeSql(sql, values)
      .then(data => {
        console.log('Executed: ', sql);
        let food = null;
        if (data.rows.length > 0) {
          food = new Food(data.rows.item(0).name, data.rows.item(0).unit);
          food.id = data.rows.item(0).id;
        }
        console.log('getFood food= ', food);
        return food;
      }).catch(err => console.log(err));
  }

  getAllFoods(): Promise<Food[]> {
    let sql = 'SELECT * FROM ' + DatabaseModel.TABLE_FOODS;

    return this.database.executeSql(sql, [])
      .then((data) => {
        console.log('Executed: ', sql);
        let foods = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            let food = new Food(data.rows.item(i).name, data.rows.item(i).unit);
            food.id = data.rows.item(i).id;
            foods.push(food);
          }
        }
        console.log('getAllFoods foods= ', foods);
        return foods;
      }).catch(err => console.log(err));
  }

  addProductTag(id_product: number, name: string): Promise<any> {
    let sql = 'INSERT INTO ' + DatabaseModel.TABLE_PRODUCT_TAGS
      + ' ('
      + DatabaseModel.COLUMN_ID_PRODUCT + ', '
      + DatabaseModel.COLUMN_NAME
      + ') VALUES (?, ?)';
    let values = [id_product, name];

    return this.database.executeSql(sql, values)
      .then(data => {
        console.log('Executed: ', sql);
        console.log('addProductTag data= ', data);
        return data;
      }).catch(err => console.log(err));
  }

  getAllProductTagsByProductId(id: number): Promise<string[]> {
    let sql = 'SELECT * FROM ' + DatabaseModel.TABLE_PRODUCT_TAGS + ' WHERE ' + DatabaseModel.COLUMN_ID_PRODUCT + ' = (?)';
    let values = [id];

    return this.database.executeSql(sql, values)
      .then((data) => {
        console.log('Executed: ', sql);
        let productTags = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            productTags.push(data.rows.item(i).name);
          }
        }
        console.log('getAllProductTagsByProductId productTags= ', productTags);
        return productTags;
      }).catch(err => console.log(err));
  }

  getAllProductTags(): Promise<string[]> {
    let sql = 'SELECT * FROM ' + DatabaseModel.TABLE_PRODUCT_TAGS;

    return this.database.executeSql(sql, [])
      .then((data) => {
        console.log('Executed: ', sql);
        let productTags = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            productTags.push(data.rows.item(i).name);
          }
        }
        console.log('getAllProductTagsByProductId productTags= ', productTags);
        return productTags;
      }).catch(err => console.log(err));
  }

  addProduct(product: Product): Promise<any> {
    return Promise.all([this.addLocation(product.location), this.addFood(product.food)]).then(data => {
      let lastLocationID = data[0].insertId;
      let lastFoodID = data[1].insertId;

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
      let values = [product.name, product.price, product.date, product.rating, product.quantity, product.count_fridge, product.photo, lastLocationID, lastFoodID];

      return this.database.executeSql(sql, values)
        .then(data => {
          console.log('Executed: ', sql);
          console.log('addProduct data= ', data);

          for (let tag of product.tags) {
            this.addProductTag(data.insertId, tag);
          }

          return data;
        }).catch(err => console.log(err));
    });
  }

  getProduct(id: number): Promise<Product> {
    let sql = 'SELECT '
      + DatabaseModel.TABLE_PRODUCTS + '.' + DatabaseModel.COLUMN_ID + ' AS test, '
      + DatabaseModel.TABLE_PRODUCTS + '.' + DatabaseModel.COLUMN_NAME + ', '
      + DatabaseModel.TABLE_PRODUCTS + '.' + DatabaseModel.COLUMN_PRICE + ', '
      + DatabaseModel.TABLE_PRODUCTS + '.' + DatabaseModel.COLUMN_DATE + ', '
      + DatabaseModel.TABLE_PRODUCTS + '.' + DatabaseModel.COLUMN_RATING + ', '
      + DatabaseModel.TABLE_PRODUCTS + '.' + DatabaseModel.COLUMN_QUANTITY + ', '
      + DatabaseModel.TABLE_PRODUCTS + '.' + DatabaseModel.COLUMN_COUNT_FRIDGE + ', '
      + DatabaseModel.TABLE_PRODUCTS + '.' + DatabaseModel.COLUMN_PHOTO + ', '
      + DatabaseModel.TABLE_LOCATIONS + '.' + DatabaseModel.COLUMN_ID + ', '
      + DatabaseModel.TABLE_LOCATIONS + '.' + DatabaseModel.COLUMN_NAME + ', '
      + DatabaseModel.TABLE_LOCATIONS + '.' + DatabaseModel.COLUMN_X + ', '
      + DatabaseModel.TABLE_LOCATIONS + '.' + DatabaseModel.COLUMN_Y + ', '
      + DatabaseModel.TABLE_FOODS + '.' + DatabaseModel.COLUMN_ID + ', '
      + DatabaseModel.TABLE_FOODS + '.' + DatabaseModel.COLUMN_NAME + ', '
      + DatabaseModel.TABLE_FOODS + '.' + DatabaseModel.COLUMN_UNIT
      + ' FROM ' + DatabaseModel.TABLE_PRODUCTS
      + ' JOIN ' + DatabaseModel.TABLE_LOCATIONS + ' ON '
      + DatabaseModel.TABLE_PRODUCTS + '.' + DatabaseModel.COLUMN_ID_LOCATION + ' = ' + DatabaseModel.TABLE_LOCATIONS + '.' + DatabaseModel.COLUMN_ID
      + ' JOIN ' + DatabaseModel.TABLE_FOODS + ' ON '
      + DatabaseModel.TABLE_PRODUCTS + '.' + DatabaseModel.COLUMN_ID_FOOD + ' = ' + DatabaseModel.TABLE_FOODS + '.' + DatabaseModel.COLUMN_ID
      + ' WHERE ' + DatabaseModel.TABLE_PRODUCTS + '.' + DatabaseModel.COLUMN_ID + ' = (?)';
    let values = [id];

    return this.database.executeSql(sql, values)
      .then(data => {
        console.log('Executed: ', sql);
        console.log('DATA: ', data);

        console.log('TEST: ', data.rows.item(0).test);
        return null;
      }).catch(err => console.log(err));
  }


  getAllProducts(): Promise<Product[]> {
    return this.database.executeSql("SELECT * FROM products", []).then((data) => {
      let products = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          //products.push(new Product(data.rows.item(i).name, data.rows.item(i).location, data.rows.item(i).price, data.rows.item(i).date, data.rows.item(i).rating, data.rows.item(i).quantity, data.rows.item(i).count_fridge));
          //products.push({ id: data.rows.item(i).id, name: data.rows.item(i).name, location: data.rows.item(i).location, price: data.rows.item(i).price, date: data.rows.item(i).date, rating: data.rows.item(i).rating, quantity: data.rows.item(i).quantity, count_fridge: data.rows.item(i).count_fridge });
        }
      }
      return products;
    }).catch(err => console.log(err));
  }


  addRecipe(recipe: Recipe) {
    let sql: string = '';
    this.sqlitePorter.importSqlToDb(this.database, sql)
      .then(data => {
        console.log('Executed: ', sql);
        return data;
      }).catch(err => console.log(err));
  }

  getAllRecipes(): Promise<Recipe[]> {
    return null; // TODO dorobit
  }

  getDatabaseState(): Observable<boolean> {
    return DatabaseModel.getDatabaseState();
  }
}
