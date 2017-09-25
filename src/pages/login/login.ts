import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavController, ToastController, ViewController } from 'ionic-angular';

import { UserData } from '../../providers/user-data';
import { UserService } from '../../providers/user-service';

import { SignupPage } from '../signup/signup';


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
    public userData: UserData,
    public userService: UserService) { }

  onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.userService.login(this.login).subscribe((resp) => {
        let toast = this.toastCtrl.create({
          message: "已成功登录, 欢迎参与论坛区发帖讨论",
          duration: 3000,
          position: 'middle'
        });  
        toast.present();
        this.viewCtrl.dismiss();
        //this.navCtrl.push(TabsPage);
      }, (err) => {
        // Unable to login
        let toast = this.toastCtrl.create({
          message: "登录失败,请重试: " + //原因描述
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

  cancel() {
    this.viewCtrl.dismiss();
  }  
}
