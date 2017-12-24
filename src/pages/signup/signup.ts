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

  quesitons = [];

  static allQuestions : Object = {
    cn: [
      {
        val: "您最喜欢的电视剧?",
        text: "您最喜欢的电视剧?"
      },
      {
        val: "您最喜欢的电影?",
        text: "您最喜欢的电影?"
      },
      {
        val: "您最喜欢的影视明星?",
        text: "您最喜欢的影视明星?"
      },
      {
        val: "您最喜欢的饭店名?",
        text: "您最喜欢的饭店名?"
      },
      {
        val: "您最喜欢的食物名?",
        text: "您最喜欢的食物名?"
      },
      {
        val: "您最喜欢的旅游地点?",
        text: "您最喜欢的旅游地点?"
      },
      {
        val: "您母亲的出生城市?",
        text: "您母亲的出生城市?"
      },
      {
        val: "您父亲的出生城市?",
        text: "您父亲的出生城市?"
      },                                     
    ],
    en: [
      {
        val: "Your favorite Tv series?",
        text: "Your favorite Tv series?"
      },
      {
        val: "Your favorite movie?",
        text: "Your favorite movie?"
      },
      {
        val: "Your favorite movie star?",
        text: "Your favorite movie star?"
      },
      {
        val: "Your favorite restaurant?",
        text: "Your favorite restaurant?"
      },
      {
        val: "Your favorite food?",
        text: "Your favorite food?"
      },
      {
        val: "Your favorite tourism area?",
        text: "Your favorite tourism area?"
      },
      {
        val: "Birth place of your mother?",
        text: "Birth place of your mother?"
      },
      {
        val: "Birth place of your father?",
        text: "Birth place of your father?"
      },                                     
    ],
  };
  
  constructor(public navCtrl: NavController,
    public viewCtrl: ViewController,
    public toastCtrl: ToastController,
    public modalController: ModalController,
    public translateService: TranslateService,
    public userData: UserData,
    public userService: UserService) {
      // 根据当前语言选择不同语言的重置密码问题数组
      this.quesitons =  SignupPage.allQuestions[
        translateService.currentLang ? 
        translateService.currentLang :
        translateService.defaultLang
      ];
    }

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
