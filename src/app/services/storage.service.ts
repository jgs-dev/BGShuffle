import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage, private alertCtrl: AlertController) { }

  /**
   * @method addData saves for the first time some value in the database
   * @param key key were the value is going to be save
   * @param value value to be saved
   */
  addData(key: string, value): Promise<any> {
    return this.storage.get(key).then(savedValue => {
      if (savedValue) {
        this.addNotNullAlert(key, value, savedValue)
      } else {
        this.storage.set(key, value)
      }
    })
  }


  /**
   * @method getData retrieves the value in the key position
   * @param key key were the value is saved
   */
  getData(key: string): Promise<any> {
    return this.storage.get(key)
  }

  /**
   * @method updateData update the value in the key position
   * @param key key were the value is going to be updated
   * @param value new value to save
   */
  updateData(key: string, value): Promise<any> {
    return this.storage.set(key, value)
  }

  /**
   * @method deleteData deletes the value saved in the key position
   * @param key key were to detele the value
   */

  deleteData(key: string): Promise<any> {
    return this.storage.remove(key).then(info => {
      console.log("removed ", info)
    })
  }

  /**
   * @method addNotNullAlert alert trigger that warns the user that the value
   * that is going to save has another value saved already, confirm to replace 
   * the value or cancel the operation
   * @param key key position were is going to be saved the value
   * @param value new value to save
   * @param savedValue saved value in the database
   */
  async addNotNullAlert(key: string, value, savedValue) {

    const alert = await this.alertCtrl.create({
      header: 'There is already information saved!',
      message: `<strong>Overwrite "${savedValue}"?</strong>`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            return false
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.storage.set(key, value)
          }
        }
      ]
    });

    await alert.present();
  }

}



