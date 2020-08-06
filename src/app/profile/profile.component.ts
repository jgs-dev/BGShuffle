import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  constructor(private modalCtrl: ModalController, private profileService: ProfileService) { }

  /**
   * @method ngOnInit calls all data saved, ready to be displayed
   */
  ngOnInit() {
    this.profileService.loadAllData()
  }

  /**
   * @method close closes the modal and returns were it was called,
   * this method is called with a button in the header
   */
  async close() {
    await this.modalCtrl.dismiss()
  }

}
