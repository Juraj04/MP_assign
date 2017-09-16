import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the LongTextPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'longText',
})
export class LongTextPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    return value.substr(0,args[0]) + "...";
  }
}
