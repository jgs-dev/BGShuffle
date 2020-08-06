import { Component, OnInit } from '@angular/core';
import { TitansService } from '../services/cyclades/titans.service';
import { AnimationController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { TurnService } from '../services/cyclades/turn.service';
import { StateService } from '../services/cyclades/state.service';



@Component({
  selector: 'app-cyclades-titans',
  templateUrl: './cyclades-titans.component.html',
  styleUrls: ['./cyclades-titans.component.scss'],
})
export class CycladesTitansComponent implements OnInit {
  numberOfPlayers: number
  animation

  /**
   * @var sources: src of the images of the gods 
   */
  sources: string[]

  constructor(private titansService: TitansService, private animationCtrl: AnimationController, public turns: TurnService,
    private route: ActivatedRoute, private router: Router, private alertCtrl: AlertController, private stateService: StateService) { }

  ngOnInit() {
    this.numberOfPlayers = +this.route.snapshot.paramMap.get("numberOfPlayers")
    this.turn0()
  }

   /**
   * @method turn0 displays all of the gods as turned being that the game
   * hasn't started yet
   */
  turn0() {
    this.sources = this.titansService.turn0(this.numberOfPlayers).map(god => god.src)
  }

  /**
   * @method shuffle: calls titans service to shuffle the next round of gods, and then 
   * reduces the return of the call to obtain only the source of the images of the gods.
   */
  shuffle() {

    this.sources = this.titansService.shuffleController(this.numberOfPlayers).map(god => god.src)

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

  /**
   * @method ionViewDidLeave when the user gets out of the component, the turns get back
   * to zero
   */
  ionViewDidLeave() {
    this.titansService.saveTurns(this.turns.getTurn())
    this.turns.reset()
  }

  /**
   * 
   */
  // getBack() {

  //   this.router.navigate(["/cyclades"])
  // }


  /**
   * @method saveState saves the mode (titans), turns played, 
   * the images currently displayed of the gods, number of players
   * and the current position of the gods array
   */

  saveState(): Promise<any> {
    return this.stateService.saveState("titans", this.turns.getTurn(), this.sources, this.numberOfPlayers, this.titansService.gods)
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
      this.titansService.setGods(data.gods)
      console.log(data)
    })
  }


}
