import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import { Product } from '../../models/product';

/*
  Generated class for the DummyDatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DummyDatabaseProvider {
    private databaseReady: BehaviorSubject<boolean> = new BehaviorSubject(true);
    products: Product[];

    constructor() {
        console.log('Hello DummyDatabaseProvider Provider');
        this.products = [];
    }

    addProduct(product: Product): Promise<any> {
        return null;
    }

    getAllProducts(): Promise<Product[]> {
        return null;
    }

    getDatabaseState(): Observable<boolean> {
        return this.databaseReady.asObservable();
    }

    createDummyProducts(){
        let names = ["voda", "mnasko", "cipsik", "vlocky", "jogurt", "kondomy", "chlieb", "ryza"];
        let locations = ["prisma", "lidl", "kmarket", "tesco"];
        let dates = ["1.1.2017", "2.2.2017", "3.3.2017", "4.4.2017"];

    }
}
