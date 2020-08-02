import { Component, OnInit } from '@angular/core';
import { TitansService } from '../services/cyclades/titans.service';
import { AnimationController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { TurnService } from '../services/cyclades/turn.service';
import { Location } from '@angular/common';


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
    private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    this.numberOfPlayers = +this.route.snapshot.paramMap.get("numberOfPlayers")
    this.turn0()
  }

  /**
   * @method turn0:  
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

    this.animation = this.animationCtrl.create()
      .addElement(document.querySelectorAll('ion-img'))
      .duration(1500)
      .iterations(1)
      .fromTo('transform', 'translateX(-100px)', 'translateX(0px)')
      .fromTo('opacity', '0', '');

    this.animation.play();
  }

  /**
   * @method ionViewDidLeave when the user gets out of the component, the turns get back
   * to zero
   */
  ionViewDidLeave() {
    this.turns.reset()
  }

}
