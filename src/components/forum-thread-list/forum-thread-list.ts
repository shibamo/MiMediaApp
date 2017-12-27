import { Component} from '@angular/core';
import { NavController,NavParams, ModalController,
  ToastController, Refresher, Events } from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';

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
  // @ViewChild(InfiniteScroll)
  // private _infiniteScroll:InfiniteScroll;

  board: any;
  items: Array<any> = [];
  currentPage: number = 1;

  constructor(public navCtrl: NavController,
    public toastCtrl: ToastController, 
    public modalCtrl: ModalController,
    public navParams: NavParams,
    public events: Events,
    public translateService: TranslateService,      
    public forumService:ForumService,
    public resourceService :ResourceService,    
    public userService :UserService       
  ) {
    // 导航到本页时需要传入论坛对象
    this.board = navParams.get('item');
    //this.updateList(null);
  }

  public ionViewDidEnter() {
    this.updateList(null);
  }

  updateList(refresher?: Refresher|any) {
    this.forumService.getThreadsData
    (this.board.id, 1, refresher ? true : false).
    subscribe(
      (data: Array<any>) => {
        this.items = data;
        refresher && refresher.complete && refresher.complete();
      },
      (_error: any) =>{
        refresher && refresher.complete && refresher.complete();
        refresher && refresher.complete && this.toastCtrl.create({
          message: this.translateService.instant("ACCESS_DATA_ERROR") + _error,
          position: 'middle',
          duration: 5000
        }).present();
      }      
    );
  }

  loadNextPageData(infiniteScroll){
    
    this.forumService.getThreadsData
    (this.board.id, this.currentPage + 1, true).
    subscribe(
      (data: Array<any>) => {

        if(data.length>0){
          //console.log(this.currentPage + 1, data);
          this.currentPage++;

          // Refresh already loaded items
          for(let i=0; i<this.items.length; i++){
            let idx = data.findIndex((item)=>item.id == this.items[i].id);
            if(idx!=-1){
              this.items[i] = data[idx];
              data.splice(idx, 1);
            }
          }

          // Append newly retrieved items
          if(data.length>0){
            this.items.push(...data);
          }
        } else{
          this.toastCtrl.create({
            message: this.translateService.instant("NO_MORE_DATA"),
            position: 'middle',
            duration: 2000
          }).present();
        }

        infiniteScroll.complete();
      },
      (_error: any) =>{
        this.toastCtrl.create({
          message: this.translateService.instant("ACCESS_DATA_ERROR") + _error,
          position: 'middle',
          duration: 5000
        }).present();
        infiniteScroll.complete();
      }
    );

  }

  gotoThread(item){
    this.events.subscribe('thread-changed-events', (needRefreshList : boolean) => {
      needRefreshList && this.updateList(needRefreshList);

      this.events.unsubscribe('thread-changed-events');
    });

    this.navCtrl.push(ForumThreadItemComponent, {
      item: item,
      board: this.board
    });
  }

  addThread(){
    // 发帖需要先登录
    if(!this.userService.isCurrentUserValid()){
      let loginModal = this.modalCtrl.create
        (LoginPage);

      const toast = this.toastCtrl.create({
        message: this.translateService.instant("NEED_LOGINED_USER"),
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
        this.updateList(true);
      }
    });
    addModal.present();
  }
}
