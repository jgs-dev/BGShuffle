import { Injectable } from '@angular/core';
import { God } from "./../../god"
import { GODSTITANS, TURNED } from "./../../gods"
import { ShuffleService } from './shuffle.service';
import { TurnService } from './turn.service';

@Injectable({
  providedIn: 'root'
})
export class TitansService {

  gods: God[] = GODSTITANS
  constructor(private shuffleService: ShuffleService, private turns: TurnService) { }

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

}
