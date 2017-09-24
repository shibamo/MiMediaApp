import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

import {SettingService} from '../../providers/setting-service';
import {ResourceService} from '../../providers/resource-service';

/**
 * Generated class for the TVItemComponent component.
 * 用于显示视频节目的信息并提供播放视频的功能
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'tv-item',
  templateUrl: 'tv-item.html'
})
export class TVItemComponent {
  item: any;

  constructor(public navParams: NavParams,
  public settingService :SettingService,
  public resourceService :ResourceService) 
  {
    // 导航到本页时需要传入视频节目信息项
    this.item = navParams.get('item');
  }
}
