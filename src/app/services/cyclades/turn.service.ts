import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TurnService {

  counter: number = 0

  constructor() { }

  /**
   * @method addTurn: adds 1 turn to the counter
   */
  addTurn(): void {
    this.counter++
  }

  /**
   * @method reset: initilize the counter to zero
   */
  reset(): void {
    this.counter = 0
  }

  /**
   * @method setTurn called when a game state is loaded
   * @param turn the new counter of the turns
   */
  setTurn(turn: number) {
    this.counter = turn
  }

  /**
   * @method getTurn: return the counter
   */
  getTurn(): number {
    return this.counter
  }
}
