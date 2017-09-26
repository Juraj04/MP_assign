import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Platform} from "ionic-angular";
import {SQLite, SQLiteObject} from '@ionic-native/sqlite';
import {SQLitePorter} from '@ionic-native/sqlite-porter';
import {Observable} from 'rxjs/Observable';

import {Product} from '../../models/product';
import {Recipe} from "../../models/recipe";
import {DatabaseModel} from "../../models/database-model";

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
          DatabaseModel.createTables(sqlitePorter, this.database);
          //DatabaseModel.dropAllTables(sqlitePorter, this.database);
        });
    });
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
    return DatabaseModel.getDatabaseState();
  }
}
