import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe to transform minutes into hour format xx:xx:xx
 */

@Pipe({
  name: 'time',
})
export class TimePipe implements PipeTransform {
  transform(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const minutesLeft = minutes % 60;
    return `${hours < 10 ? '0' : ''}${hours}:${
      minutesLeft < 10 ? '0' : ''
    }${minutesLeft}:00`;
  }
}
