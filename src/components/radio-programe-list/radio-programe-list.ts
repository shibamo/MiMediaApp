import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, Refresher } from 'ionic-angular';

import { SettingService } from '../../providers/setting-service';
import { ResourceService } from '../../providers/resource-service';
import { RadioService } from '../../providers/radio-service';

import { RadioItemComponent } from '../radio-item/radio-item';

@Component({
  selector: 'radio-programe-list',
  templateUrl: 'radio-programe-list.html'
})
export class RadioProgrameListComponent {
  listInfo: any;
  items: Array<any> = [];

  constructor(
    public toastCtrl: ToastController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public radioService :RadioService,
    public resourceService :ResourceService,      
    public settingService :SettingService) 
  {
    // 导航到本页时需要传入音频节目列表分类
    this.listInfo = navParams.get('item');
    this.updateList();
  }

  updateList(refresher?: Refresher) {
    this.radioService.getData(refresher ? true : false)
    .subscribe(
      (data: any) => {
        if(data){
          this.items = data[this.listInfo.name];
          refresher && refresher.complete();
          refresher && this.toastCtrl.create({
            message: '已获取最新节目单...',
            position: 'middle',
            duration: 1000
          }).present();
        }
      },
      (_error: any) =>{
        refresher && refresher.complete();
        refresher && this.toastCtrl.create({
          message: '获取数据出错,请检查您的网络连接情况.' + _error,
          position: 'middle',
          duration: 10000
        }).present();
      }
    );
  }

  show(item){
    this.navCtrl.push(RadioItemComponent, {
      item: item
    });
  }
}
