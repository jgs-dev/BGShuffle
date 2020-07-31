import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-cyclades',
  templateUrl: './cyclades.component.html',
  styleUrls: ['./cyclades.component.scss'],
})
export class CycladesComponent implements OnInit {

  numberOfPlayers: number

  constructor() { }

  ngOnInit() {

    console.log(Boolean(this.numberOfPlayers))
  }

}
