import {Component} from '@angular/core';
import {NavController, NavParams, ViewController} from "ionic-angular";
import {Recipe} from "../../models/recipe";
import {RecipeStoreProvider} from "../../providers/recipe-store/recipe-store";
import {ProductStoreProvider} from "../../providers/product-store/product-store";
import {Product} from "../../models/product";

/**
 * Generated class for the RecipeDetailPopoverComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    selector: 'recipe-detail-popover',
    templateUrl: 'recipe-detail-popover.html'
})
export class RecipeDetailPopoverComponent {
    recipe: Recipe;
    product: Product;

    constructor(private navCtrl: NavController,
                private params: NavParams,
                private viewCtrl: ViewController,
                private recipeStore: RecipeStoreProvider,
                private productStore: ProductStoreProvider) {
        console.log('Hello RecipeDetailPopoverComponent Component');
        this.recipe = this.params.get("recipe");
        this.product = this.params.get("product");
    }


    editRecipe() {
        this.viewCtrl.dismiss({edit: true});
    }

    removeRecipe() {
        this.recipeStore.deleteRecipe(this.recipe);
        this.viewCtrl.dismiss({edit: false});
    }

    editProduct() {
        this.viewCtrl.dismiss({edit: true});
    }

    removeProduct() {
        this.productStore.deleteProduct(this.product);
        this.viewCtrl.dismiss({edit: false});
    }
}
