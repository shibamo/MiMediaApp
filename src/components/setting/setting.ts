import { Component } from '@angular/core';

import { NgForm } from '@angular/forms';

import { SocialSharing } from '@ionic-native/social-sharing';

import { NavController, ToastController, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { SettingService } from '../../providers/setting-service';

@Component({
  selector: 'setting',
  templateUrl: 'setting.html'
})
export class SettingComponent {

  httpServer: string = 'http://192.168.0.10:8000';

  constructor(public navCtrl: NavController, 
    public viewCtrl: ViewController,    
    public toastCtrl: ToastController,
    public storage: Storage,
    private socialSharing: SocialSharing,
    public settingService: SettingService,
  ) {
    
  }

  onCanShareWeChat(){
    let self = this;
    this.socialSharing.shareVia(
      'com.tencent.mm/com.tencent.mm.ui.tools.ShareImgUI', 
      'test content', 
      'test', 
      'http://img.bss.csdn.net/201709251546221793.png', 
      "http://www.baidu.com")
    .then(
      (value)=>{
        // console.log(value);
        self.toastCtrl.create({
          message: '分享到微信朋友圈:' + value,
          duration: 5000,
          position: 'middle',
        }).present(); 
      }, 
      (reason)=>{
        self.toastCtrl.create({
          message: '分享微信朋友圈失败:' + reason,
          duration: 500000,
          position: 'middle',
        }).present();
      }
    );
  }

  onOK(form: NgForm) {
  }

  cancel() {
    this.viewCtrl.dismiss();
  }
}

