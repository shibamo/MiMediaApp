import { Component } from '@angular/core';
import { ViewController,LoadingController, Loading,ToastController } from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';

import {UserService} from '../../providers/user-service';

@Component({
  selector: 'change-password',
  templateUrl: 'change-password.html'
})
export class ChangePasswordComponent {
  oldPassword: string;
  newPassword: string;
  newPasswordAgain: string;

  private loading: Loading; 

  constructor(public viewCtrl: ViewController, 
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public translateService: TranslateService,    
    public userService :UserService,  ) {
  }

  done() {
    this.loading = this.loadingCtrl.create({
      content: this.translateService.instant("PLEASE_WAIT")
    });

    this.loading.present();

    this.userService.changePassword(this.oldPassword, this.newPassword)
    .subscribe(res => {
      console.info(res);
      this.toastCtrl.create({
        message: this.translateService.instant("PASSWORD_CHANGED"),
        position: 'middle',
        duration: 5000
      }).present(); 
      this.loading.dismiss();
      this.viewCtrl.dismiss();
    }, err => {
      this.toastCtrl.create({
        message: this.translateService.instant("PASSWORD_CHANGE_FAIL") + err.json().data.message,
        position: 'middle',
        duration: 10000
      }).present(); 
      this.loading.dismiss();
    });
  }

  isReadyToChange(){
    return this.oldPassword && this.newPassword && 
    (this.newPassword == this.newPasswordAgain);
  }

  cancel() {
    this.viewCtrl.dismiss();
  }
}
