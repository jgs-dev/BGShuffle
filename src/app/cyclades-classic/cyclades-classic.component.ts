import { Component, OnInit, Input } from '@angular/core';
import { AnimationController } from "@ionic/angular"
import { ClassicService } from '../services/cyclades/classic.service';
import { TurnService } from '../services/cyclades/turn.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

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
    private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    this.numberOfPlayers = +this.route.snapshot.paramMap.get("numberOfPlayers")
    this.turn0()
  }

  /**
   * @method turn0:  
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

    this.animation = this.animationCtrl.create()
      .addElement(document.querySelectorAll('ion-img'))
      .duration(1500)
      .iterations(1)
      .fromTo('transform', 'translateX(-100px)', 'translateX(0px)')
      .fromTo('opacity', '0', '');

    this.animation.play();
  }

  ionViewDidLeave() {
    this.turns.reset()
  }
}
