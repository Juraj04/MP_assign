import { NgModule } from '@angular/core';
import { AddFoodComponent } from './add-food/add-food';
import { RecipeDetailPopoverComponent } from './recipe-detail-popover/recipe-detail-popover';
@NgModule({
	declarations: [AddFoodComponent,
    RecipeDetailPopoverComponent],
	imports: [],
	exports: [AddFoodComponent,
    RecipeDetailPopoverComponent]
})
export class ComponentsModule {}
