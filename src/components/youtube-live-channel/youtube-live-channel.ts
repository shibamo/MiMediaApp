import { Component } from '@angular/core';
import { Refresher, ToastController, NavParams, NavController  } from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';

import {SettingService} from '../../providers/setting-service';
import {ResourceService} from 
'../../providers/resource-service';
import { LiveService } from '../../providers/live-service';
import {LiveItemComponent} from '../live-item/live-item';

@Component({
  selector: 'youtube-live-channel',
  templateUrl: 'youtube-live-channel.html'
})
export class YoutubeLiveChannelComponent {

  listInfo: any;
  items: Array<any> = [];

  constructor(
    public toastCtrl: ToastController, 
    public navParams: NavParams,
    public navCtrl: NavController,
    public translateService: TranslateService,    
    public liveService :LiveService,
    public settingService :SettingService,
    public resourceService :ResourceService,) 
  {
    this.updateList();
  }

  updateList(refresher?: Refresher) {
    this.liveService.getData(refresher? true : false)
    .subscribe(
      (data: any) => {
        if(data){
          this.items = data;
          refresher && refresher.complete();
          refresher && this.toastCtrl.create({
            message: this.translateService.instant("PROGRAM_LIST_REFRESHED"),
            position: 'middle',
            duration: 1000
          }).present();           
        }
      },
      (_error: any) =>{
        refresher && refresher.complete();
        refresher && this.toastCtrl.create({
          message: this.translateService.instant("ACCESS_DATA_ERROR") + _error,
          position: 'middle',
          duration: 10000
        }).present();
      }
    );
  }

  doRefresh(refresher?: Refresher) {
    this.updateList(refresher);
  }

  show(item){
    this.navCtrl.push(LiveItemComponent, {
      item: item
    });
  }
}
