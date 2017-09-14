import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { BehaviorSubject } from 'rxjs/Rx';
//import { Storage } from '@ionic/storage';

import { Product } from '../../data/product'

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {
    database: SQLiteObject;
    private databaseReady: BehaviorSubject<boolean>;

    constructor(private sqlite: SQLite, private sqlitePorter: SQLitePorter/*,private storage: Storage*/) {
        console.log('Hello DatabaseProvider Provider');

        this.databaseReady = new BehaviorSubject(false);
        //this.platform.ready().then(() => {
        this.sqlite.create({
            name: 'data.db',
            location: 'default'
        })
            .then((db: SQLiteObject) => {
                this.database = db;
                /*this.storage.get('database_filled').then(val => {
                    if (val) {
                        this.databaseReady.next(true);
                    } else {
                        this.fillDatabase();
                    }
                });*/
                this.createTables();
            });
        //});
    }

    //fillDatabase() {
    createTables() {
        /*this.http.get('assets/dummyDump.sql')
            .map(res => res.text())
            .subscribe(sql => {*/

        let sql = 'CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, location TEXT, price INTEGER, date NUMERIC, rating INTEGER, quantity INTEGER, count_fridge INTEGER)';

        this.sqlitePorter.importSqlToDb(this.database, sql)
            .then(()/*data*/ => {
                this.databaseReady.next(true);
                console.log('Tables created')
                //this.storage.set('database_filled', true);
            })
            .catch(e => console.error(e));
        //});
    }

    addProduct(product: Product) {
        let data = [product.name, product.location, product.price, product.date, product.rating, product.quantity, product.count_fridge];
        return this.database.executeSql("INSERT INTO products (name, location, price, date, rating, quantity, count_fridge) VALUES (?,?,?,?,?,?,?)", data).then(data => {
            console.log('--> database: addProduct');
            return data;
        }, err => {
            console.log('Error: ', err);
            return err;
        });
    }

    getAllProducts() {
        return this.database.executeSql("SELECT * FROM products", []).then((data) => {
            let products = [];
            if (data.rows.length > 0) {
                for (var i = 0; i < data.rows.length; i++) {
                    products.push({ id: data.rows.item(i).id, name: data.rows.item(i).name, location: data.rows.item(i).location, price: data.rows.item(i).price, date: data.rows.item(i).date, rating: data.rows.item(i).rating, quantity: data.rows.item(i).quantity, count_fridge: data.rows.item(i).count_fridge });
                }
            }
            console.log('--> database: getAllProducts');
            return products;
        }, err => {
            console.log('Error: ', err);
            return [];
        });
    }

    getDatabaseState() {
        console.log('--> database: getDatabaseState');
        return this.databaseReady.asObservable();
    }

    /*createDatabase() {
        return this.sqlite.create({
            name: 'mydb.db',
            location: 'default'
        }).then((db: SQLiteObject) => {
            return db.executeSql("CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, location TEXT, price INTEGER, date NUMERIC, rating INTEGER, quantity INTEGER, count_fridge INTEGER)", []).then(res => {
                return Promise.resolve(res);
            }).catch(e => {
                return Promise.resolve(e);

            });
        }).catch(e => {
            return Promise.resolve(e);
        });
    }*/


}
