import { Component } from '@angular/core';
import { NavParams, ActionSheetController } from 'ionic-angular';

import {SettingService} from '../../providers/setting-service';
import {ResourceService} from '../../providers/resource-service';
import {WechatShareServiceProvider, ShareSceneType} from '../../providers/wechat-share-service';
import {ContentVisitServiceProvider} from '../../providers/content-visit-service';

/**
 * 用于显示音频节目的信息并提供播放音频的功能
 */
@Component({
  selector: 'radio-item',
  templateUrl: 'radio-item.html'
})
export class RadioItemComponent {
  item: any;

  constructor(public navParams: NavParams,
    public actionSheetService : ActionSheetController,
    public settingService :SettingService,
    public resourceService :ResourceService, 
    public wechatShareService: WechatShareServiceProvider,
    public contentVisitService: ContentVisitServiceProvider) {
    // 导航到本页时需要传入音频节目信息项
    this.item = navParams.get('item');
    contentVisitService.sendRadioVisit(this.item.id);
  }

  public share(item){
    let that = this;
    this.actionSheetService.create({
      title: '微信分享',
      buttons: [
        {
          text: '分享到朋友圈',
          handler: () => {
            that.wechatShareService.shareRadioPrograme(ShareSceneType.FriendsCircle,
              item.name,
              item.shortContent,
              this.resourceService.radioImageUrlPrefix + item.image,
              this.resourceService.generalWebviewUrlPrefix + 
                this.settingService.radioProgrameWebviewPath + item.id,
              '','','',this.resourceService.radioAudioUrlPrefix + item.url);
          }
        },{
          text: '分享给朋友',
          handler: () => {
            that.wechatShareService.shareRadioPrograme(ShareSceneType.ToOneFriend,
              item.name,
              item.shortContent,
              this.resourceService.radioImageUrlPrefix + item.image,
              this.resourceService.generalWebviewUrlPrefix + 
                this.settingService.radioProgrameWebviewPath + item.id,
              '','','',this.resourceService.radioAudioUrlPrefix + item.url);
          }
        },{
          text: '取消',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    }).present();
  }
}
