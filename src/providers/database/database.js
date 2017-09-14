var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { SQLite } from '@ionic-native/sqlite';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { BehaviorSubject } from 'rxjs/Rx';
//import { Storage } from '@ionic/storage';
/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var DatabaseProvider = (function () {
    function DatabaseProvider(sqlite, sqlitePorter /*,private storage: Storage*/) {
        var _this = this;
        this.sqlite = sqlite;
        this.sqlitePorter = sqlitePorter; /*,private storage: Storage*/
        console.log('Hello DatabaseProvider Provider');
        this.databaseReady = new BehaviorSubject(false);
        //this.platform.ready().then(() => {
        this.sqlite.create({
            name: 'data.db',
            location: 'default'
        })
            .then(function (db) {
            _this.database = db;
            /*this.storage.get('database_filled').then(val => {
                if (val) {
                    this.databaseReady.next(true);
                } else {
                    this.fillDatabase();
                }
            });*/
            _this.createTables();
        });
        //});
    }
    //fillDatabase() {
    DatabaseProvider.prototype.createTables = function () {
        /*this.http.get('assets/dummyDump.sql')
            .map(res => res.text())
            .subscribe(sql => {*/
        var _this = this;
        var sql = 'CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, location TEXT, price INTEGER, date NUMERIC, rating INTEGER, quantity INTEGER, count_fridge INTEGER)';
        this.sqlitePorter.importSqlToDb(this.database, sql)
            .then(function () {
            _this.databaseReady.next(true);
            console.log('Tables created');
            //this.storage.set('database_filled', true);
        })
            .catch(function (e) { return console.error(e); });
        //});
    };
    DatabaseProvider.prototype.getDatabaseState = function () {
        return this.databaseReady.asObservable();
    };
    return DatabaseProvider;
}());
DatabaseProvider = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [SQLite, SQLitePorter /*,private storage: Storage*/])
], DatabaseProvider);
export { DatabaseProvider };
//# sourceMappingURL=database.js.map