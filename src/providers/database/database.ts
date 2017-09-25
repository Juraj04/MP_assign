import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Platform} from "ionic-angular";
import {SQLite, SQLiteObject} from '@ionic-native/sqlite';
import {SQLitePorter} from '@ionic-native/sqlite-porter';
import {BehaviorSubject} from 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';

import {Product} from '../../models/product';
import {Recipe} from "../../models/recipe";


/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {
  database: SQLiteObject;
  private databaseReady: BehaviorSubject<boolean>;
  //Table names
  private readonly TABLE_LOCATION: string = 'locations';
  private readonly TABLE_FOODS: string = 'foods';
  private readonly TABLE_PRODUCTS: string = 'products';
  private readonly TABLE_PRODUCT_TAGS: string = 'product_tags'

  //Common column names
  private readonly KEY_ID: string = 'id';
  private readonly KEY_NAME: string = 'name';
  private readonly KEY_RATING: string = 'rating';
  private readonly KEY_PHOTO: string = 'photo';

  //TABLE_LOCATION column names
  private readonly KEY_X: string = 'x';
  private readonly KEY_Y: string = 'y';

  //TABLE_FOODS column names
  private readonly KEY_UNIT: string = 'unit';

  //TABLE_PRODUCT column names
  private readonly KEY_PRICE: string = 'price';
  private readonly KEY_DATE: string = 'date';
  private readonly KEY_QUANTITY: string = 'quantity';
  private readonly KEY_COUNT_FRIDGE: string = 'count_fridge';
  private readonly KEY_ID_LOCATION: string = 'id_location';
  private readonly KEY_ID_FOOD: string = 'id_food';

  //TABLE_PRODUCT_TAGS column names
  private readonly KEY_ID_PRODUCT: string = 'id_product';

  //SQLs
  private tables: string[] = [
    'CREATE TABLE IF NOT EXISTS ' + this.TABLE_LOCATION
    + ' ('
    + this.KEY_ID + ' INTEGER PRIMARY KEY AUTOINCREMENT, '
    + this.KEY_NAME + ' TEXT, '
    + this.KEY_X + ' REAL, '
    + this.KEY_Y + ' REAL'
    + ');',

    'CREATE TABLE IF NOT EXISTS ' + this.TABLE_FOODS + ' ('
    + this.KEY_ID + ' INTEGER PRIMARY KEY AUTOINCREMENT, '
    + this.KEY_NAME + ' TEXT, '
    + this.KEY_UNIT + ' TEXT'
    + ');',

    'CREATE TABLE IF NOT EXISTS ' + this.TABLE_PRODUCTS + ' ('
    + this.KEY_ID + ' INTEGER PRIMARY KEY AUTOINCREMENT, '
    + this.KEY_NAME + ' TEXT, '
    + this.KEY_PRICE + ' INTEGER, '
    + this.KEY_DATE + ' TEXT, '
    + this.KEY_RATING + ' INTEGER, '
    + this.KEY_QUANTITY + ' INTEGER, '
    + this.KEY_COUNT_FRIDGE + ' INTEGER, '
    + this.KEY_PHOTO + ' TEXT, '
    + this.KEY_ID_LOCATION + ' INTEGER, '
    + this.KEY_ID_FOOD + ' INTEGER, '
    + 'FOREIGN KEY(' + this.KEY_ID_LOCATION + ') REFERENCES ' + this.TABLE_LOCATION + '(' + this.KEY_ID + '), '
    + 'FOREIGN KEY(' + this.KEY_ID_FOOD + ') REFERENCES ' + this.TABLE_FOODS + '(' + this.KEY_ID + ')'
    + ');',

    'CREATE TABLE IF NOT EXISTS ' + this.TABLE_PRODUCT_TAGS + ' ('
    + this.KEY_ID_PRODUCT + ' INTEGER, '
    + this.KEY_NAME + ' TEXT, '
    + 'FOREIGN KEY(' + this.KEY_ID_PRODUCT + ') REFERENCES ' + this.TABLE_PRODUCTS + '(' + this.KEY_ID + '), '
    + 'PRIMARY KEY (' + this.KEY_ID_PRODUCT + ', ' + this.KEY_NAME + ')'
    + ');'
  ];

  constructor(private sqlite: SQLite, private sqlitePorter: SQLitePorter, private platform: Platform) {
    console.log('Hello DatabaseProvider Provider');

    this.databaseReady = new BehaviorSubject(false);
    this.platform.ready().then(() => {

      this.sqlite.create({
        name: 'data.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          this.database = db;
          //this.createTables();
          this.mehehe();
          //this.createTables2(this.database, this.tables, 0);
        });
    });
  }

  private mehehe() {
    for (let entry of this.tables) {
      console.log(entry);
    }
  }

  private createTables() {
    let sql = 'CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, location TEXT, price INTEGER, date NUMERIC, rating INTEGER, quantity INTEGER, count_fridge INTEGER)';

    this.sqlitePorter.importSqlToDb(this.database, sql)
      .then(() => {
        this.databaseReady.next(true);
      })
      .catch(e => console.error(e));
  }

  private createTables2(db: SQLiteObject, tables: string[], index: number) {
    if (index < tables.length) {
      this.sqlitePorter.importSqlToDb(this.database, tables[index])
        .then(() => {
          console.log('Executed: ', tables[index]);
          index++;
          this.createTables2(db, tables, index);
        })
        .catch(e => console.error(e));
      this.databaseReady.next(true);
    }
  }

  addProduct(product: Product): Promise<any> {
    let data = [product.name, product.location, product.price, product.date, product.rating, product.quantity, product.count_fridge];
    return this.database.executeSql("INSERT INTO products (name, location, price, date, rating, quantity, count_fridge) VALUES (?,?,?,?,?,?,?)", data).then(data => {
      return data;
    }, err => {
      console.log('Error: ', err);
      return err;
    });
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
    }, err => {
      console.log('Error: ', err);
      return [];
    });
  }


  addRecipe(recipe: Recipe) {
  }

  getAllRecipes(): Promise<Recipe[]> {
    return null; // TODO dorobit
  }


  getDatabaseState(): Observable<boolean> {
    return this.databaseReady.asObservable();
  }
}
