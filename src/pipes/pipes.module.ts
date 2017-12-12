import {NgModule} from '@angular/core';
import {DifficultyPipe} from './difficulty/difficulty';
import {UnitPipe} from './unit/unit';

@NgModule({
  declarations: [DifficultyPipe,
    UnitPipe],
  imports: [],
  exports: [DifficultyPipe,
    UnitPipe]
})
export class PipesModule {
}
