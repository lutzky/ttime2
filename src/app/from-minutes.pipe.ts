import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fromMinutes'
})
export class FromMinutesPipe implements PipeTransform {
  transform(minutes: number): string {
    var s:string = `${Math.floor(minutes / 60)}:${minutes % 60}`;
    if (minutes < 600) {
      s = '0' + s;
    }
    return s;
  }
}
