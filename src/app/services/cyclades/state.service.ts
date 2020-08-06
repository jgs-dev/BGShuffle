import { Injectable } from '@angular/core';
import { StorageService } from '../storage.service';
import { God } from 'src/app/god';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor(private storageService: StorageService) { }

  /**
   * @method saveState saves the state of the game currently playing,
   * its necessary to save shuffle and gods differently as shuffle contains
   * the TURNED source, so it doesn't know the source of the gods when there are 
   * less than the full ammount of players (5 for classical, 6 for titans).
   * @param mode cyclades classical or titans 
   * @param turn which turn was the state saved on
   * @param shuffle the source of the images currently in display
   * @param players ammount of players playing
   * @param gods array of God object that saves the positions of them
   */
  saveState(mode: string, turn: number, shuffle: string[], players: number, gods: God[]): Promise<any> {
    return this.storageService.updateData("savedCycladesGame", {
      mode: mode,
      turn: turn,
      shuffle: shuffle,
      players: players,
      gods: gods
    })
  }
  /**
   * @method loadState loads the state of the game (JSON) being:
   * 
   *  mode: cyclades classical or titans 
   *  turn: which turn was the state saved on
   *  shuffle: the source of the images currently in display
   *  players: ammount of players playing
   *  gods: array of God object that saves the positions of them 
   */
  loadState(): Promise<any> {
    return this.storageService.getData("savedCycladesGame")
  }

}
