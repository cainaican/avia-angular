import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'durationFormat',
  pure: false
})
export class DurationFormatPipe implements PipeTransform {

  transform(value: any, arg1: any, arg2: any): any {
    
    let days: any;
    let seconds: any;
    let minutes: any;
    let hours:   any;
    
    if (arg1 === 'ms' && arg2 === 'hhmmss') {
        seconds = Math.floor((value / 1000) % 60);
        minutes = Math.floor(((value / (1000 * 60)) % 60));
        hours   = Math.floor((value / (1000 * 60 * 60)));
        return this.format(arg2, seconds, minutes, hours, days);

    } else if (arg1 === 's' && arg2 === 'hhmmss') {
        seconds = Math.floor((value % 60));
        minutes = Math.floor(((value / 60) % 60));
        hours   = Math.floor(((value / 60) / 60));
        return this.format(arg2, seconds, minutes, hours, days);

    } else if (arg1 === 'ms' && (arg2 === 'ddhhmmss' || arg2 === 'ddhhmmssLong') ) {
        seconds = Math.floor(((value / 1000) % 60));
        minutes = Math.floor((value / (1000 * 60) % 60));
        hours   = Math.floor((value / (1000 * 60 * 60) % 24));
        days    = Math.floor((value / (1000 * 60 * 60 * 24)));
        return this.format(arg2, seconds, minutes, hours, days);

    } else if (arg1 === 's' && (arg2 === 'ddhhmmss' || arg2 === 'ddhhmmssLong') ) {
        seconds = Math.floor(value % 60);
        minutes = Math.floor(((value / 60) % 60));
        hours   = Math.floor(((value / 60) / 60) % 24);
        days    = Math.floor((((value / 60) / 60) / 24));
        return this.format(arg2, seconds, minutes, hours, days);
        
    }
    else {
      return value;
    }
  }

  private format(arg2: string, seconds: number | string, minutes: number | string, hours: number | string, days: number | string) {
          (+days < 10) ? days = '0' + days : days;
          (+hours < 10) ? hours = '0' + hours : hours;
          (+minutes < 10) ? minutes = '0' + minutes : minutes;
          (+seconds < 10) ? seconds = '0' + seconds : seconds;

          switch(arg2) {
            case 'hhmmss':
              return `${hours}:${minutes}:${seconds}`;
              
            case 'ddhhmmss':
              return +days > 0 ?`${days}д ${hours}ч ${minutes}м` : `${hours}ч ${minutes}м`;

            case 'ddhhmmssLong':
              return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
              default: return null
              
          }
          
  }

}
