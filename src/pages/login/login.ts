import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { TranslateService } from '@ngx-translate/core';

import { NavController, ToastController, ViewController } from 'ionic-angular';

import { UserData } from '../../providers/user-data';
import { UserService } from '../../providers/user-service';

import { SignupPage } from '../signup/signup';
import { ResetPasswordComponent } from '../../components/reset-password/reset-password';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  login: {email?: string, password?: string} = {};
  submitted = false;

  constructor(public navCtrl: NavController, 
    public viewCtrl: ViewController,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public userData: UserData,
    public userService: UserService) { }

  onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.userService.login(this.login).subscribe((resp) => {
        let toast = this.toastCtrl.create({
          message: this.translateService.instant("LOGIN_SUCCESS"),
          duration: 3000,
          position: 'middle'
        });  
        toast.present();
        this.viewCtrl.dismiss(true);
        //this.navCtrl.push(TabsPage);
      }, (err) => {
        // Unable to login
        let toast = this.toastCtrl.create({
          message: this.translateService.instant("LOGIN_FAIL") + //原因描述
            (err.json && err.json().data.message || err.toString()),
          duration: 5000,
          position: 'middle'
        });
        toast.present();
      });
    }
  }

  onSignup() {
    this.navCtrl.push(SignupPage);
  }

  onResetPassword(){
    this.navCtrl.push(ResetPasswordComponent);
  }

  cancel() {
    this.viewCtrl.dismiss(false);
  }

  //如果是从注册用户或重置密码退回,需要判断是否已经是已成功登陆的用户
  ionViewDidEnter(){ 
    if(this.userService.isCurrentUserValid()){
      this.viewCtrl.dismiss(true);
    }
  }
}
