

export class Product {
    id: number;
    constructor(public name: string, public location: string, public price: number, public date: string, public rating: number, public quantity: number, public count_fridge: number) {
        console.log('--> product: constructor');
    }
}
