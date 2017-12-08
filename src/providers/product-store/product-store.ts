import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {BehaviorSubject, Observable} from "rxjs";
import {Recipe} from "../../models/recipe";
import {DummyDatabaseProvider} from "../dummy-database/dummy-database";
import {DatabaseProvider} from "../database/database";
import {SelectRightProviderProvider} from "../select-right-provider/select-right-provider";
import {Product} from "../../models/product";
import {Food} from "../../models/food";

/*
 Generated class for the ProductStoreProvider provider.

 See https://angular.io/guide/dependency-injection for more info on providers
 and Angular DI.
 */
@Injectable()
export class ProductStoreProvider {
  private _products: BehaviorSubject<Product[]> = new BehaviorSubject([]);
  public readonly products: Observable<Product[]> = this._products.asObservable();


  constructor(public db: DatabaseProvider) {

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
    this.db.addProduct(product).then(value => {
      let n = this._products.getValue();
      n.push(value);
      this._products.next(n)
    });

  }

  deleteProduct(product: Product) {
    this.db.deleteProduct(product).then(value => {
      let n = this._products.getValue();
      let index = n.indexOf(product);
      n.splice(index, 1);
      this._products.next(n);
    })
  }

  updateProduct(original: Product, changed: Product) {
    this.db.updateProduct(changed).then(value => {
      let n = this._products.getValue();
      let index = n.indexOf(original);
      n[index] = value;
      this._products.next(n);
    })

  }

  getProductByFood(food: Food): Product[] {
    let products: Product[] = []

    for (let p of this._products.getValue()) {
      if (p.food.id == food.id) products.push(p)
    }
    return products;
  }


}
