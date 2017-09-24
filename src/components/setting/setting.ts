import { Component } from '@angular/core';

import { NgForm } from '@angular/forms';

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
    public settingService: SettingService,
  ) {
    
  }

  onOK(form: NgForm) {
  }

  cancel() {
    this.viewCtrl.dismiss();
  }
}

