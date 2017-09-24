import { Component } from '@angular/core';
import { ViewController,LoadingController, Loading,ToastController } from 'ionic-angular';

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
    public userService :UserService,  ) {
  }

  done() {
    this.loading = this.loadingCtrl.create({
      content: '正在处理...'
    });

    this.loading.present();

    this.userService.changePassword(this.oldPassword, this.newPassword)
    .subscribe(res => {
      console.info(res);
      this.toastCtrl.create({
        message: '密码已成功修改',
        position: 'middle',
        duration: 5000
      }).present(); 
      this.loading.dismiss();
      this.viewCtrl.dismiss();
    }, err => {
      this.toastCtrl.create({
        message: '密码修改失败:' + err.json().data.message,
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
