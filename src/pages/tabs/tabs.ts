import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';

import { TVStationListComponent } 
  from '../../components/tv-station-list/tv-station-list';
import { RadioStationListComponent } 
  from '../../components/radio-station-list/radio-station-list';
import { ForumBoardListComponent } 
  from '../../components/forum-board-list/forum-board-list';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // set the root pages for each tab
  tab1Root: any = TVStationListComponent;
  tab2Root: any = RadioStationListComponent;
  tab3Root: any = ForumBoardListComponent;
  mySelectedIndex: number;

  constructor(navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }

}
