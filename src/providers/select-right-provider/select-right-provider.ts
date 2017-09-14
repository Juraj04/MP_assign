import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Platform} from "ionic-angular";
import {DatabaseProvider} from "../database/database";
import {DummyDatabaseProvider} from "../dummy-database/dummy-database";

/*
  Generated class for the SelectRightProviderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SelectRightProviderProvider {

  constructor(public platform: Platform,public db: DatabaseProvider, public dummy:DummyDatabaseProvider) {
    console.log('Hello SelectRightProviderProvider Provider');
  }

  GetDatabaseProvider(){
    if(this.platform.is("core")) return this.db;
    return this.dummy;
  }

}
