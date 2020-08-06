import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { Profile } from '../data-interfaces/profile';
import { ModalController } from '@ionic/angular';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  profile: Profile

  constructor(private profileService: ProfileService, private modalCtrl: ModalController) { }

  ngOnInit() { }

  /**
   * @method showModal opens the profile component as a modal
   */
  async showProfileModal() {
    const modal = await this.modalCtrl.create({
      component: ProfileComponent
    })

    await modal.present()
  }

}
