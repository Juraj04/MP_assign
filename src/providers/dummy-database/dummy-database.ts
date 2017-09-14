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
    private databaseReady: BehaviorSubject<boolean>;

    constructor() {
        console.log('Hello DummyDatabaseProvider Provider');
        this.databaseReady.next(true);
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
}
