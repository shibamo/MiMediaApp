import { Component, ViewChild } from '@angular/core';
import { Refresher, ToastController, NavController } 
  from 'ionic-angular';

import { RadioService } from '../../providers/radio-service';
import {ResourceService} from '../../providers/resource-service';

import {RadioProgrameListComponent} from 
  '../radio-programe-list/radio-programe-list';
import {AdPositionPromotionComponent} from 
  '../ad-position-promotion/ad-position-promotion';

@Component({
  selector: 'radio-station-list',
  templateUrl: 'radio-station-list.html'
})
export class RadioStationListComponent {
  @ViewChild(AdPositionPromotionComponent)
  private adComponent:AdPositionPromotionComponent;

  adName = 'radio-station-list';
  items: Array<{
    id:number, name: string, shortContent: string, lastPrograme: any
  }> = [];

  constructor(public navCtrl: NavController,
    public toastCtrl: ToastController,
    public resourceService :ResourceService,
    public radioService: RadioService, //此处调用服务的构造函数来激发从storage中获取缓存的节目列表
    ) 
  {
    this.updateList();
  }

  public ionViewWillEnter() {
    this.adComponent.updateSlides();
  }

  updateList(refresher?: Refresher) {
    this.radioService.getchannelData(refresher? true : false)
    .subscribe(
      (_data: any) => {
        if(_data){
          this.items = _data;
          refresher && refresher.complete();
          refresher && this.toastCtrl.create({
            message: '已刷新...',
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

  gotoStation(item: any){
    this.navCtrl.push(RadioProgrameListComponent, {
      item: item
    });
  }

}
