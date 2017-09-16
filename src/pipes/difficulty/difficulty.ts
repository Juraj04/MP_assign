import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the DifficultyPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'difficulty',
})
export class DifficultyPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: any, ...args) {
    var a: string[] = ["EASY", "MEDIUM", "HARD"];
    return a[value - 1];
  }
}
