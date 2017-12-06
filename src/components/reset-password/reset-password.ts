import { Component } from '@angular/core';
import { ViewController,LoadingController, Loading,ToastController } from 'ionic-angular';

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
    public userService :UserService,  ) {
  }

  done() {
    this.loading = this.loadingCtrl.create({
      content: '正在处理...'
    });

    this.loading.present();

    this.userService.resetPassword(this.email, this.answer, this.newPassword)
    .subscribe(res => {
      console.info(res);
      this.toastCtrl.create({
        message: '密码已成功重置',
        position: 'middle',
        duration: 2000
      }).present(); 
      this.loading.dismiss();
      this.viewCtrl.dismiss();
    }, err => {
      this.toastCtrl.create({
        message: '密码修改重置:' + err.json().data.message,
        position: 'middle',
        duration: 50000
      }).present(); 
      this.loading.dismiss();
    });
  }

  getQuestionFromEmail(){
    this.loading = this.loadingCtrl.create({
      content: '正在获取...'
    });

    this.loading.present();

    this.userService.getQuestionFromEmail(this.email)
    .subscribe(res => 
      {
        this.question = res.json().question + '?';
        this.loading.dismiss();
      }, err => {
        this.toastCtrl.create({
          message: '获取重置密码的问题失败:' + err.json().data.message,
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
