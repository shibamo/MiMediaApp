import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavController, ToastController, 
  ViewController, ModalController } from 'ionic-angular';

import { UserData } from '../../providers/user-data';
import { UserService } from '../../providers/user-service';

import { UserAgreementComponent } from '../../components/user-agreement/user-agreement';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  signup: {
    email?: string, 
    name?: string, 
    password?: string, 
    question?: string, 
    answer?: string, 
    agreeUserAgreement?: boolean
  } = {};
  submitted = false;

  constructor(public navCtrl: NavController,
    public viewCtrl: ViewController,
    public toastCtrl: ToastController,
    public modalController: ModalController,
    public userData: UserData,
    public userService: UserService) {}

  onSignup(form: NgForm) {
    this.submitted = true;
    if (form.valid && this.isEmailValid()) {
      this.userService.register(this.signup).subscribe((resp) => {
        let toast = this.toastCtrl.create({
          message: "已成功创建账户, 欢迎参与论坛区发帖讨论",
          duration: 3000,
          position: 'middle'
        });  
        toast.present();
        this.viewCtrl.dismiss();              
     }, (err) => {
        // Unable to register
        let toast = this.toastCtrl.create({
          message: "创建账户失败, 请重试: " + //原因描述
            (err.json && err.json().data.message || err.toString()),
          duration: 3000,
          position: 'middle'
        });
        toast.present();
      });
    }
  }

  cancel() {
    this.viewCtrl.dismiss();
  }
  
  presentUserAgreement(myEvent) {
    this.modalController.create(UserAgreementComponent).present();
  }

  isEmailValid(){
    
    return this.signup.email && 
      (!!this.signup.email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/));
  }

  isPasswordValid(){
    return this.signup.password && this.signup.password.length>=6;
  }

  isUserNameValid(){
    return this.signup.name && this.signup.name.length>=1;
  }

  isQuestionNAnswerValid(){
    return this.signup.question && this.signup.answer && this.signup.answer.length>=1;
  }

  isValid() : boolean
  {
    // this.signup.agreeUserAgreement || !isEmailValid() || !password.valid || !name.valid || !name
    return this.signup.agreeUserAgreement && 
      this.isEmailValid() && 
      this.isPasswordValid() &&
      this.isUserNameValid() && 
      this.isQuestionNAnswerValid();
  }
}
