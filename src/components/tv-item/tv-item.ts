import { Component } from '@angular/core';
import { NavParams, ActionSheetController  } from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';

import {SettingService} from '../../providers/setting-service';
import {ResourceService} from '../../providers/resource-service';
import {WechatShareServiceProvider, ShareSceneType} from '../../providers/wechat-share-service';
import {ContentVisitServiceProvider} from '../../providers/content-visit-service';

/**
 * 用于显示视频节目的信息并提供播放视频的功能
 */
@Component({
  selector: 'tv-item',
  templateUrl: 'tv-item.html'
})
export class TVItemComponent {
  item: any;

  constructor(public navParams: NavParams,
    public actionSheetService : ActionSheetController,    
    public translateService: TranslateService, 
    public settingService :SettingService,
    public resourceService :ResourceService, 
    public wechatShareService: WechatShareServiceProvider,
    public contentVisitService: ContentVisitServiceProvider)
  {
    // 导航到本页时需要传入视频节目信息项
    this.item = navParams.get('item');
    contentVisitService.sendTvVisit(this.item.id);
  }

  public share(item){
    let that = this;
    this.actionSheetService.create({
      title: this.translateService.instant("WECHAT_SHARE"),
      buttons: [
        {
          text: this.translateService.instant("WECHAT_TO_CIRCLE"),
          handler: () => {
            that.wechatShareService.shareTVPrograme(ShareSceneType.FriendsCircle,
              item.name,
              item.shortContent,
              this.resourceService.tvVideoUrlPrefix + item.image,
              this.resourceService.generalWebviewUrlPrefix + 
                this.settingService.tvProgrameWebviewPath + item.id);
          }
        },{
          text: this.translateService.instant("WECHAT_TO_FRIEND"),
          handler: () => {
            that.wechatShareService.shareTVPrograme(ShareSceneType.ToOneFriend,
              item.name,
              item.shortContent,
              this.resourceService.tvVideoUrlPrefix + item.image,
              this.resourceService.generalWebviewUrlPrefix + 
                this.settingService.tvProgrameWebviewPath + item.id);
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
