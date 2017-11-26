import { Component } from '@angular/core';
import { NavController,NavParams, ModalController,
  ToastController, ActionSheetController } from 'ionic-angular';

import {ForumThreadReplyComponent} from '../forum-thread-reply/forum-thread-reply';
import {ComplainThreadComponent} from '../complain-thread/complain-thread';
import {ComplainThreadReplyComponent} from '../complain-thread-reply/complain-thread-reply';
import {SettingService} from '../../providers/setting-service';
import {ResourceService} from '../../providers/resource-service';
import {UserLoginCheckServiceProvider} from '../../providers/user-login-check-service';
import {WechatShareServiceProvider, ShareSceneType} from '../../providers/wechat-share-service';

@Component({
  selector: 'forum-thread-item',
  templateUrl: 'forum-thread-item.html'
})
export class ForumThreadItemComponent {
  item: any;
  board: any;

  constructor(public navCtrl: NavController,
    public actionSheetService : ActionSheetController,     
    public toastCtrl: ToastController, 
    public modalCtrl: ModalController,    
    public navParams: NavParams,
    public settingService :SettingService,
    public resourceService :ResourceService,        
    public userLoginCheckService :UserLoginCheckServiceProvider,
    public wechatShareService: WechatShareServiceProvider,
  ) {
    // 导航到本页时需要传入指定论坛的thread信息项
    this.item = navParams.get('item');
    this.board = navParams.get('board');
  }

  // 回贴
  public addReply(){
    if(!this.userLoginCheckService.makeSureUserLogined("未登录用户不能回复", this.showReplyDialog.bind(this))) return;

    this.showReplyDialog();
  }

  private showReplyDialog(){
    let modalDialog = this.modalCtrl.create
      (ForumThreadReplyComponent,{thread: this.item});

    modalDialog.onDidDismiss(item => {
      if (item) {
        const toast = this.toastCtrl.create({
          message: '回帖已发布,后台审核后将可见',
          position: 'middle',
          duration: 3000
        });
        toast.present(); 
      }
    });

    modalDialog.present();
  }

  // 投诉主贴
  public complainMain(){
    if(!this.userLoginCheckService.makeSureUserLogined("投诉功能只对已登录用户开放", this.showComplainMainDialog.bind(this))) return;
    
    this.showComplainMainDialog();
  }

  private showComplainMainDialog(){
    let modalDialog = this.modalCtrl.create
    (ComplainThreadComponent,{item: this.item, board: this.board});

    modalDialog.onDidDismiss(item => {
      if (item) {
        const toast = this.toastCtrl.create({
          message: '投诉信息已发送,后台人员将核实处理',
          position: 'middle',
          duration: 3000
        });
        toast.present(); 
      }
    });

    modalDialog.present();
  }

  // 投诉回复贴
  public complainReply(reply){
    if(!this.userLoginCheckService.makeSureUserLogined("投诉功能只对已登录用户开放", this.showComplainReplyDialog.bind(this, reply))) return;
    
    this.showComplainReplyDialog(reply);
  }

  private showComplainReplyDialog(reply){
    let modalDialog = this.modalCtrl.create
    (ComplainThreadReplyComponent,{item: reply, board: this.board});

    modalDialog.onDidDismiss(item => {
      if (item) {
        const toast = this.toastCtrl.create({
          message: '投诉信息已发送,后台人员将核实处理',
          position: 'middle',
          duration: 3000
        });
        toast.present(); 
      }
    });

    modalDialog.present();
  }

  // 分享
  public share(item){
    let that = this;
    this.actionSheetService.create({
      title: '微信分享',
      buttons: [
        {
          text: '分享到朋友圈',
          handler: () => {
            that.wechatShareService.shareForumThread(ShareSceneType.FriendsCircle,
              item.name,
              "",
              "",
              this.resourceService.generalWebviewUrlPrefix + 
                this.settingService.forumThreadWebviewPath + item.id);
          }
        },{
          text: '分享给朋友',
          handler: () => {
            that.wechatShareService.shareForumThread(ShareSceneType.ToOneFriend,
              item.name,
              "",
              "",
              this.resourceService.generalWebviewUrlPrefix + 
                this.settingService.forumThreadWebviewPath + item.id);
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
