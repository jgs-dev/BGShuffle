import { Injectable } from '@angular/core';
import { ShuffleService } from './shuffle.service';
import { GODSCLASSIC, TURNED } from "./../../gods"
import { God } from "./../../god"
import { TurnService } from './turn.service';
import { ProfileService } from '../profile.service';
import { StorageService } from '../storage.service';

/**
 * @constant DATA key to save/get the total turns played in classical
 */
const KEY = "cycladesClassicalTurns"

@Injectable({
  providedIn: 'root'
})
export class ClassicService {

  gods: God[] = GODSCLASSIC
  constructor(private shuffleService: ShuffleService, private turns: TurnService, private storageService: StorageService) { }

  /**
   * @method saveTurns add the turns played into the database, if it never has been
   * defined, defines it 
   * @param turns turns recently played by the player
   */
  saveTurns(turns: number) {
    return this.storageService.getData(KEY).then(value => {
      if (value) {
        this.storageService.updateData(KEY, turns + value)
      } else {
        this.storageService.addData(KEY, turns)
      }
    })
  }

  /**
   * @method loadData loads the ammount of turns played in classical mode
   */
  loadData(): Promise<number> {
    return this.storageService.getData(KEY).then((value) => {

      if (value) {
        return +value
      } else {
        return 0
      }

    })
  }

  /**
   * @method turn0 returns an array of turned god to have a display for the player before
   * the first shuffle
   * @param players number of players
   */
  turn0(players: number) {
    let auxGods: God[] = []
    for (let i = 0; i < 4; i++) {
      auxGods.push(TURNED)
    }
    return auxGods
  }
  /**
   * @method shuffleController following the rules of the game, depending on how many players are,
   * will call the shuffle service and randomize the gods acordingly, the rules are commented inside
   * the method
   * @param players number of players
   */

  shuffleController(players: number): God[] {

    /**
     *When playing with 4 players, the last of the 4 Gods will be placed face-down. 
     It will not be available for this cycle. During the following cycle, you will place 
     this God in the first space, face-up, and shuffle the other 3.
     Once again, the God placed in 4th place will be face-down and will become first God 
     during the following cycle.

      When playing with 3 players, the first two Gods will be placed face-up and the last 
      two face-down. During the next cycle, the two Gods which were face-down will be used. 
      On the cycle following that, the 4 Gods will be shuffled again to make two new random pairs. 
     */


    switch (players) {
      case 5:
        this.gods = this.shuffleService.shuffle(this.gods);
        this.turns.addTurn();
        return this.gods;
      case 4:
        let auxGods = this.gods.slice(0, 3);
        auxGods = this.shuffleService.shuffle(auxGods);
        this.gods[0] = this.gods[3];
        this.gods[1] = auxGods[0];
        this.gods[2] = auxGods[1];
        this.gods[3] = auxGods[2];
        this.turns.addTurn();
        auxGods = [...this.gods];
        auxGods[3] = TURNED
        return auxGods;
      case 3:
        if (this.turns.getTurn() % 2) {
          let auxGods = [...this.gods];
          this.gods[0] = auxGods[3];
          this.gods[1] = auxGods[2];
          this.gods[2] = auxGods[1];
          this.gods[3] = auxGods[0];
          this.turns.addTurn();
          auxGods = [...this.gods];
          auxGods[2] = TURNED
          auxGods[3] = TURNED
          return auxGods;

        } else {
          this.gods = this.shuffleService.shuffle(this.gods);
          let auxGods = [...this.gods];
          auxGods[2] = TURNED
          auxGods[3] = TURNED
          this.turns.addTurn();
          return auxGods;
        }

    }
  }

  /**
   * @method setGods called to load the positions of a state of game
   * @param gods the new set of gods 
   */
  setGods(gods: God[]) {
    this.gods = gods
  }

}
