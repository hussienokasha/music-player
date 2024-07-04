import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'musicTime',
})
export class MusicTimePipe implements PipeTransform {
  transform(time: number) {
    if(!isNaN(time))
    {

      return `${
        Math.floor(time / 60) < 10
          ? `0${Math.floor(time / 60)}`
          : `${Math.floor(time / 60)}`
      }:${
        Math.floor(time % 60) < 10
          ? `0${Math.floor(time % 60)}`
          : `${Math.floor(time % 60)}`
      }`;
    }
    else
    {
      return `00:00`
    }
  }
}
