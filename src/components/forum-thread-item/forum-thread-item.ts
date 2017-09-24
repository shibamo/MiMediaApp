import { Component } from '@angular/core';
import { NavController,NavParams, ModalController,ToastController } from 'ionic-angular';

import {ForumThreadReplyComponent} from '../forum-thread-reply/forum-thread-reply';
import {SettingService} from '../../providers/setting-service';
import {ResourceService} from '../../providers/resource-service';
import {UserService} from '../../providers/user-service';

import {LoginPage} from '../../pages/login/login';

@Component({
  selector: 'forum-thread-item',
  templateUrl: 'forum-thread-item.html'
})
export class ForumThreadItemComponent {
  item: any;

  constructor(public navCtrl: NavController,
    public toastCtrl: ToastController, 
    public modalCtrl: ModalController,    
    public navParams: NavParams,
    public settingService :SettingService,
    public resourceService :ResourceService,        
    public userService :UserService  
  ) {
    // 导航到本页时需要传入指定论坛的thread信息项
    this.item = navParams.get('item');
  }

  addReply(){
    if(!this.userService.isCurrentUserValid()){
      let loginModal = this.modalCtrl.create
        (LoginPage);

      const toast = this.toastCtrl.create({
        message: '请先登录再发帖',
        position: 'middle',
        duration: 1000
      });
      toast.present(); 

      loginModal.onDidDismiss(() => {
        //this.addThread();
      })
      loginModal.present();

      return; // 未登录用户不能回复
    }

    let replyModal = this.modalCtrl.create
      (ForumThreadReplyComponent,{thread: this.item});
    replyModal.onDidDismiss(item => {
      if (item) {
        const toast = this.toastCtrl.create({
          message: '回帖已发布,后台审核后将可见',
          position: 'middle',
          duration: 3000
        });
        toast.present(); 
      }
    })
    replyModal.present();

    // this.navCtrl.push(ForumThreadReplyComponent, {
    //   thread: this.item
    // });    
  }
}
