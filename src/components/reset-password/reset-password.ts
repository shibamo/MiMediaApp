import { Component } from '@angular/core';
import { ViewController,LoadingController, Loading,ToastController } from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';

import {UserService} from '../../providers/user-service';

@Component({
  selector: 'reset-password',
  templateUrl: 'reset-password.html'
})
export class ResetPasswordComponent {
  email: string
  question: string;
  answer: string;
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

    this.userService.resetPassword(this.email, this.answer, this.newPassword)
    .subscribe(res => {
      console.info(res);
      this.toastCtrl.create({
        message: this.translateService.instant("PASSWORD_RESETTED"),
        position: 'middle',
        duration: 2000
      }).present(); 
      this.loading.dismiss();
      this.viewCtrl.dismiss();
    }, err => {
      this.toastCtrl.create({
        message: this.translateService.instant("OPERATION_FAILED") + ':' + err.json().data.message,
        position: 'middle',
        duration: 50000
      }).present(); 
      this.loading.dismiss();
    });
  }

  getQuestionFromEmail(){
    this.loading = this.loadingCtrl.create({
      content: this.translateService.instant("PLEASE_WAIT")
    });

    this.loading.present();

    this.userService.getQuestionFromEmail(this.email)
    .subscribe(res => 
      {
        this.question = res.json().question + '?';
        this.loading.dismiss();
      }, err => {
        this.toastCtrl.create({
          message: this.translateService.instant("OPERATION_FAILED") + ':' + err.json().data.message,
          position: 'middle',
          duration: 50000
        }).present(); 
        this.loading.dismiss();
      }
    );
  }

  isReadyToGetQuestionFromEmail(){
    return this.userService.isEmailValid(this.email);
  }

  isReadyToChange(){
    return this.question && this.answer && this.newPassword && 
    (this.newPassword.length >= 6) && 
    (this.newPassword == this.newPasswordAgain);
  }

  cancel() {
    this.viewCtrl.dismiss();
  }
}
