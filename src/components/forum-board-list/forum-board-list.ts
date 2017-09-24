import { Component, ViewChild } from '@angular/core';

import { NavController } from 'ionic-angular';

import {ForumService} from '../../providers/forum-service';
import {ResourceService} from '../../providers/resource-service';

import {ForumThreadListComponent} from '../forum-thread-list/forum-thread-list';
import {AdPositionPromotionComponent} from '../ad-position-promotion/ad-position-promotion';

@Component({
  selector: 'forum-board-list',
  templateUrl: 'forum-board-list.html'
})
export class ForumBoardListComponent {
  @ViewChild(AdPositionPromotionComponent)
  private adComponent:AdPositionPromotionComponent;

  adName = 'forum-board-list';
  items: Array<{id:number, name: string, caption: string, image: string}> = [];

  constructor(public navCtrl: NavController,
    public resourceService :ResourceService,     
    public forumService:ForumService,    
  )
  {
    this.updateList();
  }

  public ionViewWillEnter() {
    this.adComponent.updateSlides();
  }

  updateList() {
    this.forumService.getBoardsData().subscribe((data: any) => {
      this.items = data;
    });
  }

  gotoBoard(item: any){
    this.navCtrl.push(ForumThreadListComponent, {
      item: item
    });
  }
}
