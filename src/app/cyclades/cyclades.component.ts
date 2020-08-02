import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cyclades',
  templateUrl: './cyclades.component.html',
  styleUrls: ['./cyclades.component.scss'],
})
export class CycladesComponent implements OnInit {

  numberOfPlayers: number

  constructor(private location: Location) { }

  ngOnInit() { }

  /**
   * @method getBack: return to the "page" where the user was before
   */
  getBack(): void {
    this.location.back()
  }

}
