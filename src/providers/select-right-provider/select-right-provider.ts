import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Platform} from "ionic-angular";
import {DatabaseProvider} from "../database/database";
import {DummyDatabaseProvider} from "../dummy-database/dummy-database";
import {SQLitePorter} from "@ionic-native/sqlite-porter";
import {SQLite} from "@ionic-native/sqlite";

/*
  Generated class for the SelectRightProviderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SelectRightProviderProvider {

  dummy=new DummyDatabaseProvider();
  db;
  constructor(public platform: Platform) {
    console.log('Hello SelectRightProviderProvider Provider');
  }

  GetDatabaseProvider(){
    console.log(this.platform.platforms());
    if(this.platform.is('core') || this.platform.is('mobileweb')) return this.dummy;

    if(this.db == null) this.db =new DatabaseProvider(new SQLite, new SQLitePorter);
    return this.db;
  }

}
