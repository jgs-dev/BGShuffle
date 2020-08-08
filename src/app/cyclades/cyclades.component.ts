import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { StateService } from '../services/cyclades/state.service';
import { Router } from '@angular/router';
import { TurnService } from '../services/cyclades/turn.service';
import { ClassicService } from '../services/cyclades/classic.service';
import { TitansService } from '../services/cyclades/titans.service';

@Component({
  selector: 'app-cyclades',
  templateUrl: './cyclades.component.html',
  styleUrls: ['./cyclades.component.scss'],
})
export class CycladesComponent implements OnInit {

  /**
   * @var numberOfPlayers variable that contains the player input 
   */
  numberOfPlayers: number
  /**
   * @var gameSavedButtonRouter if theres a saved game, this variable will contain
   * the path of the component that will be asigned the the "continue game" button
   */
  gameSavedButtonRouter: string

  modeSaved: string

  turnsSaved: number

  constructor(private stateService: StateService, private router: Router, private classicService: ClassicService, private titansService: TitansService) { }

  ngOnInit() { }


  /**
   * @method ionViewDidEnter calling savedGame method every time the user enter
   */
  ionViewDidEnter() {
    /* not using ngOnInit to call this method because this needs to be called 
    every time the user enter this component */
    this.savedGame()
  }

  /**
   * @method savedGame verifies if there's a game state saved, this method
   * enables the button to continue the game and sends the numberOfPlayers as -1
   * to signal that it must be loaded the game
   */
  savedGame() {
    this.stateService.loadState().then(data => {
      if (data.mode === "classic") {
        this.setModeSaved("classic")
        this.setTurnsSaved(data.turn)
        this.gameSavedButtonRouter = "/cyclades-classic/-1"
      } else if (data.mode === "titans") {
        this.setModeSaved("titans")
        this.setTurnsSaved(data.turn)
        this.gameSavedButtonRouter = "/cyclades-titans/-1"
      }
    })
  }

  newGameClassic() {
    this.classicService.saveTurns(this.turnsSaved)
    this.router.navigate([`/cyclades-classic/${this.numberOfPlayers}`])
  }

  newGameTitans() {
    this.titansService.saveTurns(this.turnsSaved)
    this.router.navigate([`/cyclades-titans/${this.numberOfPlayers}`])
  }
  /**
   * @method setModeSaved sets the variable modeSaved so if the player
   * creates a new game, the mode played will be known to save the turns played
   * @param modeSaved sets the mode of game saved (classic or titans), 
   */

  setModeSaved(modeSaved: string) {
    this.modeSaved = modeSaved
  }

  /**
   * @method setTurnsSaved sets the variable turnsSaved so if the player
   * creates a new game, the turns will be saved and not lost
   * @param turnsSaved ammount of turns played in the saved game
   */

  setTurnsSaved(turnsSaved: number) {
    this.turnsSaved = turnsSaved
  }


}
