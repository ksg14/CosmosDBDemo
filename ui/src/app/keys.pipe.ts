import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keys'
})
export class KeysPipe implements PipeTransform {

  // transform(value, args:string[]) : any {
  //   let keys = [];
  //   for (let key in value) {
  //     keys.push({key: key, value: value[key]['_']});
  //   }
  //   return keys;
  // }

  // transform(obj, args:string[]) : any {
  //   let keys = [], max_keys = 0, key_c, max_item;
  //   for (let item of obj) {
  //     key_c = 0;
  //     for (let key in item) {
  //       key_c += 1;
  //     }
  //     if (key_c > max_keys){
  //       max_keys = key_c;
  //       max_item = item;
  //     }
  //   }
  //   for (let key in max_item) {
  //     if (key [0] == '.')
  //       continue;
  //     keys.push(key);
  //   }
  //   return keys;
  // }

  //test
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