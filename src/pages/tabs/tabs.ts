import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ProductsPage } from '../products/products'
import {RecipesPage} from "../recipes/recipes";
import {FridgePage} from "../fridge/fridge";

@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {

    tab1Root = ProductsPage;
    tab2Root = FridgePage;
    tab3Root = RecipesPage;

    constructor() {

    }
}
