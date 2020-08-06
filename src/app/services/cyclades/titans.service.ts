import { Injectable } from '@angular/core';
import { God } from "./../../god"
import { GODSTITANS, TURNED } from "./../../gods"
import { ShuffleService } from './shuffle.service';
import { TurnService } from './turn.service';
import { StorageService } from '../storage.service';

/**
 * @constant KEY key to save/load the turns played in titans mode
 */
const KEY = "cycladesTitansTurns"
@Injectable({
  providedIn: 'root'
})
export class TitansService {

  gods: God[] = GODSTITANS
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
   * @method loadData loads the ammount of turns played in titans mode
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
    for (let i = 0; i < 5; i++) {
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

    // 6 Players:
    // Shuffle the 5 large God tiles and place them randomly on the 5 empty spaces above Apollo.

    // 5 Players:
    // The last of the 5 Gods will be placed face-down. It will not be available for this cycle. During the following cycle, place this God in the first space, face-up, and shuffle the other 4. Once again, the God placed in 5th place will be face-down and will become the first God during the following cycle.

    // 4 Players:
    // The last 2 Gods will be placed face-down and will become the first two Gods during the next cycle.
    // 3 Players:
    // The last 3 Gods are placed face-down. Two of them will be randomly placed in the first two spaces during the next cycle.


    switch (players) {
      case 6:
        this.gods = this.shuffleService.shuffle(this.gods);
        this.turns.addTurn();
        return this.gods;
      case 5:
        {
          let auxGods = this.gods.slice(0, 4);
          auxGods = this.shuffleService.shuffle(auxGods);
          this.gods[0] = this.gods[4];
          this.gods[1] = auxGods[0];
          this.gods[2] = auxGods[1];
          this.gods[3] = auxGods[2];
          this.gods[4] = auxGods[3];
          this.turns.addTurn();
          auxGods = [...this.gods];
          auxGods[4] = TURNED
          return auxGods;
        }
      case 4:
        {
          let auxGods = this.gods.slice(0, 3);
          auxGods = this.shuffleService.shuffle(auxGods);
          this.gods[0] = this.gods[4];
          this.gods[1] = this.gods[3];
          this.gods[2] = auxGods[0];
          this.gods[3] = auxGods[1];
          this.gods[4] = auxGods[2];

          this.turns.addTurn();
          auxGods = [...this.gods];
          auxGods[3] = TURNED
          auxGods[4] = TURNED
          return auxGods;
        }
      case 3:
        // 3 Players:
        // The last 3 Gods are placed face-down. Two of them will be randomly placed in the first two spaces during the next cycle.

        let auxGodsFirstHalf = this.gods.slice(0, 2);
        let auxGodsSecondHalf = this.gods.slice(2);

        auxGodsSecondHalf = this.shuffleService.shuffle(auxGodsSecondHalf);

        this.gods[0] = auxGodsSecondHalf[0];
        this.gods[1] = auxGodsSecondHalf[1];

        auxGodsFirstHalf.push(auxGodsSecondHalf[2]);

        this.gods[2] = auxGodsFirstHalf[0];
        this.gods[3] = auxGodsFirstHalf[1];
        this.gods[4] = auxGodsFirstHalf[2];

        let auxGods = [...this.gods];
        auxGods[2] = TURNED
        auxGods[3] = TURNED
        auxGods[4] = TURNED
        this.turns.addTurn();

        return auxGods;
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
