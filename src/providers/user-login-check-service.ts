import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { ModalController,ToastController} from 'ionic-angular';
import {LoginPage} from '../pages/login/login';
import {UserService} from '../providers/user-service';

@Injectable()
export class UserLoginCheckServiceProvider {

  constructor(public userService :UserService,    
    public toastCtrl: ToastController, 
    public modalCtrl: ModalController,   ) 
  {
  }

  public makeSureUserLogined(promptForLogin = '该操作需要先登录', 
  funcToProtect = ()=>{} /*登录成功后执行的操作*/) : boolean
  {
    if(this.userService.isCurrentUserValid()){
      return true;
    }

    if(!this.userService.isCurrentUserValid()){
      let loginModal = this.modalCtrl.create
        (LoginPage);

      const toast = this.toastCtrl.create({
        message: promptForLogin,
        position: 'middle',
        duration: 2000
      });
      toast.present(); 

      loginModal.onDidDismiss((bSuccess) => {
        bSuccess &&　funcToProtect();
      })
      loginModal.present();

      return false; 
    }
  }

}
