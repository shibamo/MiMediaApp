import { Component,Input, OnInit,ViewChild } from '@angular/core';

import { Slides } from 'ionic-angular';

//import * as _ from 'lodash';

import {AdSettingService} from '../../providers/ad-setting-service';
import {ResourceService} from '../../providers/resource-service';

@Component({
  selector: 'ad-position-promotion',
  templateUrl: 'ad-position-promotion.html'
})
export class AdPositionPromotionComponent implements OnInit {
  @Input('adName') adName: string;

  @ViewChild(Slides) slides: Slides;

  adList = [];
  basePath: string;

  constructor(public resourceService :ResourceService,
    public adSettingService :AdSettingService) 
  {
  }

  ngOnInit(): void { // 输入属性adName在构造函数里并未被初始化, 而在指令的属性初始化完成之后、子指令的属性开始初始化之前，Angular会调用 OnInit 钩子。
    this.adSettingService.getData().subscribe((data: any) => {
      let _data : Array<any> = data;
      this.adList = _data.filter((item)=> { return item['name'] === this.adName;});
      this.basePath = this.resourceService.adImageUrlPrefix;
    });
  }

  updateSlides(){
    if(this.slides){
      this.slides.update(); 
      this.slides.stopAutoplay();
      this.slides.startAutoplay();
    }
  }
}
