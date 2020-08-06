import { Component, OnInit, Input } from '@angular/core';
import { AnimationController } from "@ionic/angular"
import { ClassicService } from '../services/cyclades/classic.service';
import { TurnService } from '../services/cyclades/turn.service';
import { ActivatedRoute } from '@angular/router';
import { StateService } from '../services/cyclades/state.service';


@Component({
  selector: 'app-cyclades-classic',
  templateUrl: './cyclades-classic.component.html',
  styleUrls: ['./cyclades-classic.component.scss'],
})
export class CycladesClassicComponent implements OnInit {


  numberOfPlayers: number
  animation

  /**
   * @var sources: src of the images of the gods 
   */
  sources: string[]

  constructor(private classicService: ClassicService, private animationCtrl: AnimationController, public turns: TurnService,
    private route: ActivatedRoute, private stateService: StateService) { }

  ngOnInit() { }

  ionViewDidEnter() {
    this.numberOfPlayers = +this.route.snapshot.paramMap.get("numberOfPlayers")
    if (this.numberOfPlayers == -1) {
      this.loadState()
    } else {
      this.turn0()
    }
  }

  /**
   * @method turn0 displays all of the gods as turned being that the game
   * hasn't started yet
   */
  turn0() {
    this.sources = this.classicService.turn0(this.numberOfPlayers).map(god => god.src)
  }

  /**
   * @method shuffle: calls classic service to shuffle the next round of gods, and then 
   * reduces the return of the call to obtain only the source of the images of the gods.
   */
  shuffle() {

    this.sources = this.classicService.shuffleController(this.numberOfPlayers).map(god => god.src)

    this.saveState().then(() => {
      this.animation = this.animationCtrl.create()
        .addElement(document.querySelectorAll('ion-img'))
        .duration(1500)
        .iterations(1)
        .fromTo('transform', 'translateX(-100px)', 'translateX(0px)')
        .fromTo('opacity', '0', '');

      this.animation.play();
    })
  }

  ionViewDidLeave() {
    this.classicService.saveTurns(this.turns.getTurn())
    this.turns.reset()
  }

  /**
   * @method saveState saves the mode (classic), turns played, 
   * the images currently displayed of the gods, number of players
   * and the current position of the gods array
   */

  saveState(): Promise<any> {
    return this.stateService.saveState("classic", this.turns.getTurn(), this.sources, this.numberOfPlayers, this.classicService.gods)
  }

  /**
   * @method loadState loads turn, sources of gods currently in display,
   * number of players and gods object
   */
  loadState(): Promise<any> {
    return this.stateService.loadState().then(data => {
      this.turns.setTurn(+data.turn)
      this.sources = data.shuffle
      this.numberOfPlayers = +data.players
      this.classicService.setGods(data.gods)
      console.log(data)
    })
  }
}
