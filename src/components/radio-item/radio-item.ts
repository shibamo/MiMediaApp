import { Component } from '@angular/core';
import { NavParams, ActionSheetController } from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';

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
    public translateService: TranslateService,      
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
      title: this.translateService.instant("WECHAT_SHARE"),
      buttons: [
        {
          text: this.translateService.instant("WECHAT_TO_CIRCLE"),
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
          text: this.translateService.instant("WECHAT_TO_FRIEND"),
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
          text: this.translateService.instant("CANCEL"),
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    }).present();
  }
}
