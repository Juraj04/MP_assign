import {Food} from "./food";
import {Location} from "./location"

export class Product {
  id: number;

  constructor(public name: string,
              public location: Location,
              public price: number,
              public date: string,
              public rating: number,
              public quantity: number,
              public count_fridge: number,
              public food: Food,
              public photo: string,
              public tags: string[]) {
  }
}
