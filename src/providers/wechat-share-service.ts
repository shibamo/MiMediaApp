import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { TranslateService } from '@ngx-translate/core';

import { ToastController } from 'ionic-angular';

declare var Wechat:any;

export const enum ShareSceneType {
  ToOneFriend,
  FriendsCircle,
}

@Injectable()
export class WechatShareServiceProvider {
  isWechatAddinInstalled : boolean = true;
  isWechatInstalled : boolean = true;
  dictSceneType : Object = {}; // 将在构造函数中初始化

  constructor(
    public toastCtrl: ToastController,
    public translateService: TranslateService,
  ) {
    if (typeof Wechat === "undefined") {
      this.toastCtrl.create({
        message: this.translateService.instant("WECHAT_START_FAILURE"),
        duration: 5,
        position: 'middle',
      }).present(); 
      this.isWechatAddinInstalled =  false;
    } else {
      Wechat.isInstalled(function (installed) {
        if(!installed){
          this.toastCtrl.create({
            message: this.translateService.instant("WECHAT_INSTALL_FAILURE"),
            duration: 5,
            position: 'middle',
          }).present(); 
          this.isWechatInstalled = false;
        } else {
          this.dictSceneType[ShareSceneType.FriendsCircle] = Wechat.Scene.TIMELINE;
          this.dictSceneType[ShareSceneType.ToOneFriend] = Wechat.Scene.SESSION;
        }
      }, function (reason) {
        this.toastCtrl.create({
          message: this.translateService.instant("WECHAT_DETECT_FAILURE") + reason,
          duration: 5,
          position: 'middle',
        }).present(); 
        this.isWechatInstalled = false;
      });
    }
  }

  // 独立出来, 未来有可能独立更改 
  public shareForumThread(shareSceneType: ShareSceneType, 
    title : string, description: string, thumb : string,
    mediaWebpageUrl: string, mediaTagName?: string,
    messageExt?: string, messageAction?: string, 
  ){
    let params = {
      scene: this.dictSceneType[shareSceneType],
      message: {
        title: "D亚洲资讯论坛话题:" + title,
        thumb: thumb,
        description: description,
        media: {
          type: Wechat.Type.LINK,
          webpageUrl: mediaWebpageUrl
        }
      }
    };

    this.share(params);
  }

  // 独立出来, 未来有可能独立更改 
  public shareRadioPrograme(shareSceneType: ShareSceneType, 
    title : string, description: string, thumb : string,
    mediaWebpageUrl: string, mediaTagName?: string,
    messageExt?: string, messageAction?: string, mediaDataUrl?: string){
      let params = {
        scene: this.dictSceneType[shareSceneType],
        message: {
          title: "D亚洲资讯电台节目:" + title,
          thumb: thumb,
          description: description,
          media: {
            type: Wechat.Type.MUSIC,
            musicUrl: mediaWebpageUrl,
            musicDataUrl: mediaDataUrl,
          }
        }
      };
  
      this.share(params);      
  }

  // 独立出来, 未来有可能独立更改 
  public shareTVPrograme(shareSceneType: ShareSceneType, 
    title : string, description: string, thumb : string,
    mediaWebpageUrl: string, mediaTagName?: string,
    messageExt?: string, messageAction?: string,){
    let params = {
      scene: this.dictSceneType[shareSceneType],
      message: {
        title: "D亚洲资讯电视节目:" + title,
        thumb: thumb,
        description: description,
        media: {
          type: Wechat.Type.LINK,
          webpageUrl: mediaWebpageUrl
        }
      }
    };

    this.share(params);    
  }

  // 调用微信分享服务,处理出错信息
  private share(params: Object){
    Wechat.share(params, function () {
    }, function (reason) {
      this.toastCtrl.create({
        message: this.translateService.instant("WECHAT_WORK_FAILURE") + reason,
        duration: 5,
        position: 'middle',
      }).present(); 
    });
  }
  
}
