import { Injectable, OnInit } from '@angular/core';
import { Profile } from '../data-interfaces/profile';
import { Storage } from '@ionic/storage';
import { StorageService } from './storage.service';
import { CycladesClassicComponent } from '../cyclades-classic/cyclades-classic.component';
import { ClassicService } from './cyclades/classic.service';
import { TitansService } from './cyclades/titans.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  cycladesClassicalTurns: number
  cycladesTitansTurns: number
  
  constructor(private storageService: StorageService, private cycladesClassical: ClassicService, private cycladesTitans: TitansService) { }

  /**
   * @method loadCycladesClassicalData calls the method to return the turns played
   * in them mode classical from the classical service
   */
  loadCycladesClassicalData(): Promise<any> {
    return this.cycladesClassical.loadData().then(value => {
      this.cycladesClassicalTurns = value
    })

  }

  /**
   * @method loadCycladesTitansData calls the method to return the turns played
   * in the mode titans from the the titans service
   */
  loadCycladesTitansData(): Promise<any> {
    return this.cycladesTitans.loadData().then(value => {
      this.cycladesTitansTurns = value
    })
  }

  /**
   * @method loadAllData calls all methods that load data from games, and waits
   * for all of them to complete...
   * This method is incomplete.
   */
  loadAllData() {
    Promise.all([this.loadCycladesClassicalData(), this.loadCycladesTitansData()]).then((something) => {
      console.log("all promises are finished!", something)
    })
  }





}
