import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cyclades-classic',
  templateUrl: './cyclades-classic.component.html',
  styleUrls: ['./cyclades-classic.component.scss'],
})
export class CycladesClassicComponent implements OnInit {

  @Input() numberOfPlayers
  array: string[] = ["test", "two", "three"]
  constructor() { }

  ngOnInit() { }

}
