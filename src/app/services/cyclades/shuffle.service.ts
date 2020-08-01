import { Injectable } from '@angular/core';
import { God } from "./../../god"


@Injectable({
  providedIn: 'root'
})
export class ShuffleService {

  constructor() { }

  /**
   * @method shuffle: receives an array, picking a random position
   * and then swaping it with the m element of the array.
   * @param array: array of God class
   */
  shuffle(array: God[]) {

    let m = array.length, t, i;

    // While there remain elements to shuffle…
    while (m) {

      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }

    return array;
  }

}
