import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import 'rxjs/add/operator/map';
import { ModalController,ToastController} from 'ionic-angular';
import {LoginPage} from '../pages/login/login';
import {UserService} from '../providers/user-service';

@Injectable()
export class UserLoginCheckServiceProvider {

  constructor(public userService :UserService,   
    public translateService: TranslateService, 
    public toastCtrl: ToastController, 
    public modalCtrl: ModalController,   ) 
  {
  }

  public makeSureUserLogined(
    promptForLogin = '', 
  funcToProtect = ()=>{} /*登录成功后执行的操作*/) : boolean
  {
    if(this.userService.isCurrentUserValid()){
      return true;
    }

    if(!promptForLogin){
      promptForLogin = this.translateService.instant("NEED_LOGINED_USER");
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
