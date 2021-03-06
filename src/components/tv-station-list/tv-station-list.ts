import { Component, ViewChild } from '@angular/core';
import { Refresher, ToastController,NavController } from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';

import { VideoService } from '../../providers/video-service';
import {ResourceService} from '../../providers/resource-service';

import {TVProgrameListComponent} from '../tv-programe-list/tv-programe-list';
import {AdPositionPromotionComponent} from '../ad-position-promotion/ad-position-promotion';

@Component({
  selector: 'tv-station-list',
  templateUrl: 'tv-station-list.html'
})
export class TVStationListComponent {
  @ViewChild(AdPositionPromotionComponent)
  private adComponent:AdPositionPromotionComponent;

  adName = 'tv-programe-list';
  items: Array<{id:number, name: string, caption: string, lastPrograme: any}> = [];

  constructor(public navCtrl: NavController,
    public toastCtrl: ToastController,
    public translateService: TranslateService,     
    public videoService: VideoService, //此处调用服务的构造函数来激发从storage中获取缓存的节目列表
    public resourceService :ResourceService,) 
  {
    this.updateList();
  }

  public ionViewWillEnter() {
    this.adComponent.updateSlides();
  }
  
  gotoStation(item: any){
    this.navCtrl.push(TVProgrameListComponent, {
      item: item
    });
  }

  updateList(refresher?: Refresher) {
    this.videoService.getchannelData(refresher? true : false)
    .subscribe(
      (_data: any) => {
        if(_data){
          this.items = _data;
          refresher && refresher.complete();
          refresher && this.toastCtrl.create({
            message: this.translateService.instant("REFRESHED"),
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
}
