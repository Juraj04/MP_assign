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
        this.createDummyProducts();
    }

    addProduct(product: Product): Promise<any> {
        this.products.push(product);
        return null;
    }

    getAllProducts(): Promise<Product[]> {
        return new Promise((resolve, reject) => {
            resolve(this.products)
        })
    }

    getDatabaseState(): Observable<boolean> {
        return this.databaseReady.asObservable();
    }

    createDummyProducts(){
        let names = ["voda", "mnasko", "cipsik", "vlocky", "jogurt", "kondomy", "chlieb", "ryza"];
        let locations = ["prisma", "lidl", "kmarket", "tesco"];
        let dates = ["1.1.2017", "2.2.2017", "3.3.2017", "4.4.2017", "5.5.2017", "6.6.2017"];


        for (let i=0; i<30; i++) {
            let price = Math.trunc((Math.random() * 100) % 100);
            let rating = Math.trunc((Math.random()*10)&5);
            let quantity = Math.trunc((Math.random() * 100) % 100);
            let count_fridge = Math.trunc((Math.random() * 100) % 10);

            this.products.push(new Product(names[Math.trunc((Math.random() * 10) % names.length)],
                                            locations[Math.trunc((Math.random() * 10) % locations.length)],
                                            price,
                                            dates[Math.trunc((Math.random() * 10) % dates.length)],
                                            rating,quantity,count_fridge));
        }

    }

}
