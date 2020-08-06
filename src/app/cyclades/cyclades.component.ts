import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { StateService } from '../services/cyclades/state.service';

@Component({
  selector: 'app-cyclades',
  templateUrl: './cyclades.component.html',
  styleUrls: ['./cyclades.component.scss'],
})
export class CycladesComponent implements OnInit {

  numberOfPlayers: number
  gameSavedButtonRouter: string
  constructor(private stateService: StateService) { }

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
        this.gameSavedButtonRouter = "/cyclades-classic/-1"
      } else if (data.mode === "titans") {
        this.gameSavedButtonRouter = "/cyclades-titans/-1"
      }
    })
  }


}
