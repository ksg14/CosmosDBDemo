import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customerPipe'
})
export class CustomerPipePipe implements PipeTransform {

  transform(obj, args:string[]) : any {
    let keys = new Set ();

    for (let item of obj) {
      for (let key in item) {
        if (key [0] == '.')
          continue;
        keys.add (key);
      }
    }
    return keys;
  }

}
