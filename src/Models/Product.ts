import { Food } from "../Models/Food";

export class Product {

    name: string;
    location: string;
    price: number;
    date: string;
    rating: number;
    quantity: number;
    count_fridge: number;
    //food: Food;

    constructor(name: string, location: string, price: number, date: string, rating: number, quantity: number) {
        this.name = name;
        this.location = location;
        this.price = price;
        this.date = date;
        this.rating = rating;
        this.quantity = quantity;
    }

    //constructor() {

    //}
}
