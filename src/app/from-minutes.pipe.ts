import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fromMinutes'
})
export class FromMinutesPipe implements PipeTransform {
  transform(minutes: number): string {
    return `${Math.floor(minutes / 60)}:${minutes % 60}`;
  }
}
