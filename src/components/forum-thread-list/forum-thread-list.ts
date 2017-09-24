import { Component } from '@angular/core';
import { NavController,NavParams, ModalController,ToastController,Refresher } from 'ionic-angular';

import {ForumService} from '../../providers/forum-service';
import {ResourceService} from '../../providers/resource-service';
import {UserService} from '../../providers/user-service';

import {ForumThreadItemComponent} from '../forum-thread-item/forum-thread-item';
import {ForumThreadCreateComponent} from '../forum-thread-create/forum-thread-create';
import {LoginPage} from '../../pages/login/login';

@Component({
  selector: 'forum-thread-list',
  templateUrl: 'forum-thread-list.html'
})
export class ForumThreadListComponent {
  board: any;
  items: Array<any> = [];

  constructor(public navCtrl: NavController,
    public toastCtrl: ToastController, 
    public modalCtrl: ModalController,
    public navParams: NavParams,
    public forumService:ForumService,
    public resourceService :ResourceService,    
    public userService :UserService       
  ) {
    // 导航到本页时需要传入论坛对象
    this.board = navParams.get('item');
    this.updateList();
  }

  updateList(refresher?: Refresher) {
    this.forumService.getThreadsData(this.board.id, refresher ? true : false).
    subscribe((data: any) => {
      this.items = data;
      refresher && refresher.complete();
    });
  }

  gotoThread(item){
    this.navCtrl.push(ForumThreadItemComponent, {
      item: item
    });
  }

  addThread(){
    // 发帖需要先登录
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
      })
      loginModal.present();
      return;
    }

    let addModal = this.modalCtrl.create
      (ForumThreadCreateComponent,{board: this.board});
    addModal.onDidDismiss(item => {
      if (item) {
        this.updateList();
      }
    });
    addModal.present();
  }
}
