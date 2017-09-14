import {Food} from "./food";

export class Product {
  id: number;

  constructor(public name: string,
              public location: string,
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
