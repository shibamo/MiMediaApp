import { Component } from '@angular/core';
import { Refresher, ToastController, NavParams, NavController  } from 'ionic-angular';

import {SettingService} from '../../providers/setting-service';
import {ResourceService} from '../../providers/resource-service';
import { VideoService } from '../../providers/video-service';
import {TVItemComponent} from '../tv-item/tv-item';

@Component({
  selector: 'tv-programe-list',
  templateUrl: 'tv-programe-list.html'
})
export class TVProgrameListComponent {

  listInfo: any;
  items: Array<any> = [];

  constructor(public toastCtrl: ToastController, 
    public navParams: NavParams,
    public navCtrl: NavController,
    public videoService :VideoService,
    public settingService :SettingService,
    public resourceService :ResourceService,) 
  {
    // 导航到本页时需要传入音频节目列表分类
    this.listInfo = navParams.get('item');

    //因为本组件是默认被展现的首页组件,因此需要一定的等待启动时间加载缓存里的数据再拉数据
    setTimeout(() => {
      this.updateList();
    }, 500);
  }

  updateList(refresher?: Refresher) {
    this.videoService.getData(refresher? true : false)
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

  doRefresh(refresher?: Refresher) {
    this.updateList(refresher);
  }

  show(item){
    this.navCtrl.push(TVItemComponent, {
      item: item
    });
  }
}
