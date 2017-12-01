import { NgModule } from '@angular/core';
import { AddFoodComponent } from './add-food/add-food';
import { AddProductToFridgeComponent } from './add-product-to-fridge/add-product-to-fridge';
@NgModule({
	declarations: [AddFoodComponent,
    AddProductToFridgeComponent],
	imports: [],
	exports: [AddFoodComponent,
    AddProductToFridgeComponent]
})
export class ComponentsModule {}
