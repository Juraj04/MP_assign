import { NgModule } from '@angular/core';
import { AddFoodComponent } from './add-food/add-food';
import { RecipeDetailPopoverComponent } from './recipe-detail-popover/recipe-detail-popover';
import { AddProductToFridgeComponent } from './add-product-to-fridge/add-product-to-fridge';
import { CreateNewFoodComponent } from './create-new-food/create-new-food';
@NgModule({
	declarations: [AddFoodComponent,
    RecipeDetailPopoverComponent,
    AddProductToFridgeComponent,
    CreateNewFoodComponent],
	imports: [],
	exports: [AddFoodComponent,
    RecipeDetailPopoverComponent,
    AddProductToFridgeComponent,
    CreateNewFoodComponent]
})
export class ComponentsModule {}
