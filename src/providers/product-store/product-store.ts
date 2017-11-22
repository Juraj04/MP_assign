import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {BehaviorSubject, Observable} from "rxjs";
import {Recipe} from "../../models/recipe";
import {DummyDatabaseProvider} from "../dummy-database/dummy-database";
import {DatabaseProvider} from "../database/database";
import {SelectRightProviderProvider} from "../select-right-provider/select-right-provider";
import {Product} from "../../models/product";

/*
 Generated class for the ProductStoreProvider provider.

 See https://angular.io/guide/dependency-injection for more info on providers
 and Angular DI.
 */
@Injectable()
export class ProductStoreProvider {
    private _products: BehaviorSubject<Product[]> = new BehaviorSubject([]);
    public readonly products: Observable<Product[]> = this._products.asObservable();
    private db: DummyDatabaseProvider | DatabaseProvider;


    constructor(select: SelectRightProviderProvider) {
        this.db = select.GetDatabaseProvider();

        this.db.getDatabaseState().subscribe(rdy => {
            if (rdy) {
                this.db.getAllProducts().then(value => {
                    this._products.next(value);
                    console.log("product store :" + value);
                })
            }
        })
    }

    addProduct(product: Product) {
        this.db.addProduct(product);
        this._products.next(this._products.getValue());
    }

}
