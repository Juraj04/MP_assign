import { NgModule } from '@angular/core';
import { AddFoodComponent } from './add-food/add-food';
import { RecipeDetailPopoverComponent } from './recipe-detail-popover/recipe-detail-popover';
import { AddProductToFridgeComponent } from './add-product-to-fridge/add-product-to-fridge';
@NgModule({
	declarations: [AddFoodComponent,
    RecipeDetailPopoverComponent,
    AddProductToFridgeComponent],
	imports: [],
	exports: [AddFoodComponent,
    RecipeDetailPopoverComponent,
    AddProductToFridgeComponent]
})
export class ComponentsModule {}
