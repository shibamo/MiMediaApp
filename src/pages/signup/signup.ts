import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { TranslateService } from '@ngx-translate/core';

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
    public translateService: TranslateService,
    public userData: UserData,
    public userService: UserService) {}

  onSignup(form: NgForm) {
    this.submitted = true;
    if (form.valid && this.isEmailValid()) {
      this.userService.register(this.signup).subscribe((resp) => {
        let toast = this.toastCtrl.create({
          message: this.translateService.instant("REGISTER_SUCCESS"),
          duration: 3000,
          position: 'middle'
        });  
        toast.present();
        this.viewCtrl.dismiss();              
     }, (err) => {
        // Unable to register
        let toast = this.toastCtrl.create({
          message: this.translateService.instant("REGISTER_FAIL") + //原因描述
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
    return this.userService.isEmailValid(this.signup.email);
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
