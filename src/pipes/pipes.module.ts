import { NgModule } from '@angular/core';
import { DifficultyPipe } from './difficulty/difficulty';
import { UnitPipe } from './unit/unit';
import { LongTextPipe } from './long-text/long-text';
@NgModule({
	declarations: [DifficultyPipe,
    UnitPipe,
    LongTextPipe],
	imports: [],
	exports: [DifficultyPipe,
    UnitPipe,
    LongTextPipe]
})
export class PipesModule {}
