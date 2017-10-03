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
    let prisma: Location = new Location("Prisma", 100.10, 100.20);
    let lidl: Location = new Location("Lidl", 200.10, 200.20);
    let kmarket: Location = new Location("K-Market", 300.10, 300.20);
    let smarket: Location = new Location("S-Market", 400.10, 400.20);

    let pastry: Food = new Food("Bread", Unit.kg);
    let egg: Food = new Food("Eggs", Unit.pcs);
    let milk: Food = new Food("Milk", Unit.l);
    let butter: Food = new Food('Butter', Unit.pcs);

    //let bread: Product = new Product('Bread', prisma, 2.99, '4.10.2017', 5, 1, 1, pastry, 'ProductPhoto', ['BreadTag1', 'BreadTag2', 'BreadTag3']);
    let eggs: Product = new Product('Eggs', lidl, 1.99, '7.10.2017', 5, 12, 10, egg, 'ProductPhoto', ['EggsTag1', 'EggsTag2', 'EggsTag3']);
    let milk2: Product = new Product('Milk', prisma, 0.68, '5.10.2017', 3, 1, 0, egg, 'ProductPhoto', ['MilkTag1', 'MilkTag2', 'MilkTag3']);
    let milk3: Product = new Product('Milk2', smarket, 0.99, '5.10.2017', 3, 1, 0, egg, 'ProductPhoto', ['MilkTag21', 'MilkTag22', 'MilkTag23']);

    this.addLocation(prisma)
      .then(() => {
        return this.getLocation(1);
      })
      .then(data => {
        let bread: Product = new Product('Bread', data, 2.99, '4.10.2017', 5, 1, 1, pastry, 'ProductPhoto', ['BreadTag1', 'BreadTag2', 'BreadTag3']);
        return this.addProduct(bread);
      })
      .then(() => {
        this.getAllLocations();
        this.getAllProducts();
      });
  }

  addLocation(location: Location): Promise<any> {
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
          console.log('addLocation data= ', data);
          return data;
        }).catch(err => console.log(err));
    } else return Promise.resolve(location);
  }

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
        console.log('getLocation location= ', location);
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
        console.log('getAllLocations locations= ', locations);
        return locations;
      }).catch(err => console.log(err));
  }

  addFood(food: Food): Promise<any> {
    if (food.id == null) {
      let sql = 'INSERT INTO ' + DatabaseModel.TABLE_FOODS
        + ' ('
        + DatabaseModel.COLUMN_NAME + ', '
        + DatabaseModel.COLUMN_UNIT
        + ') VALUES (?, ?)';

      return this.database.executeSql(sql, [food.name, food.unit])
        .then(data => {
          console.log('Executed: ', sql);
          console.log('addFood data= ', data);
          return data;
        }).catch(err => console.log(err));
    } else return Promise.resolve(location);
  }

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
        console.log('getFood food= ', food);
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

    return this.database.executeSql(sql, [id_product, name])
      .then(data => {
        console.log('Executed: ', sql);
        console.log('addProductTag data= ', data);
        return data;
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
        console.log('getAllProductTagsByProductId productTags= ', productTags);
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
        console.log('getAllProductTagsByProductId productTags= ', productTags);
        return productTags;
      }).catch(err => console.log(err));
  }

  addProduct(product: Product): Promise<any> {
    if (product.id == null) {
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
          [product.name, product.price, product.date, product.rating, product.quantity, product.count_fridge, product.photo, data[0].insertId, data[1].insertId])
          .then(data => {
            console.log('Executed: ', sql);
            console.log('addProduct data= ', data);
            for (let tag of product.tags) {
              this.addProductTag(data.insertId, tag);
            }
            return data;
          }).catch(err => console.log(err));
      });
    } else return Promise.resolve(product);
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
      console.log('getProduct product= ', product);
      return product;
    }).catch(err => console.log(err));

    /*return this.database.executeSql(sql, [id])
      .then(data => {
        console.log('Executed: ', sql);
        let product: Product = null;

        this.getAllProductTagsByProductId(id)
          .then(tags => {
            if (data.rows.length > 0) {
              let location: Location = new Location(data.rows.item(0).location_name, data.rows.item(0).location_x, data.rows.item(0).location_y)
              location.id = data.rows.item(0).location_id;
              let food: Food = new Food(data.rows.item(0).food_name, data.rows.item(0).food_unit);
              food.id = data.rows.item(0).food_id;

              product = new Product(
                data.rows.item(0).name,
                location,
                data.rows.item(0).price,
                data.rows.item(0).date,
                data.rows.item(0).rating,
                data.rows.item(0).quantity,
                data.rows.item(0).count_fridge,
                food,
                data.rows.item(0).photo,
                tags);
              product.id = data.rows.item(0).id;
            }
            console.log('getProduct product= ', product);
            return product;
          });
        return product;
      }).catch(err => console.log(err));*/
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
        console.log('getAllProducts products= ', products);
        return products;
      }).catch(err => console.log(err));
  }

  //TODO: Recipes
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
