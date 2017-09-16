import { Pipe, PipeTransform } from '@angular/core';
import {Unit} from "../../models/food";

/**
 * Generated class for the UnitPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'unit',
})
export class UnitPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: number, ...args) {
    return Unit[value];
  }
}
