import { Component,Input, OnInit,ViewChild } from '@angular/core';

import { SafariViewController } from '@ionic-native/safari-view-controller';
import { InAppBrowser, InAppBrowserObject } from '@ionic-native/in-app-browser';

import { Slides } from 'ionic-angular';

//import * as _ from 'lodash';

import {AdSettingService} from '../../providers/ad-setting-service';
import {ResourceService} from '../../providers/resource-service';
import {ContentVisitServiceProvider} from '../../providers/content-visit-service';

@Component({
  selector: 'ad-position-promotion',
  templateUrl: 'ad-position-promotion.html'
})
export class AdPositionPromotionComponent implements OnInit {
  @Input('adName') adName: string;

  @ViewChild(Slides) slides: Slides;

  adList = [];
  basePath: string;

  browser : InAppBrowserObject = null;

  constructor(
    public safariViewController: SafariViewController,
    public inAppBrowser: InAppBrowser,
    public resourceService :ResourceService,
    public adSettingService :AdSettingService,
    public contentVisitService: ContentVisitServiceProvider,) 
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

  adImageClicked(item){
    this.contentVisitService.sendAdVisit(item.id);

    if(item && item.contentUrl){

      this.safariViewController.isAvailable()
      .then((available: boolean) => {
          if (available) {
    
            this.safariViewController.show({
              url: item.contentUrl,
              hidden: false,
              animated: false,
              transition: 'curl',
              enterReaderModeIfAvailable: true,
              tintColor: '#ff0000'
            })
            .subscribe((result: any) => {
                if(result.event === 'opened') console.log('Opened');
                else if(result.event === 'loaded') console.log('Loaded');
                else if(result.event === 'closed') console.log('Closed');
              },
              (error: any) => console.error(error)
            );
    
          } else { //SafariViewController not supported, use fallback browser InAppBrowser
            // const options: InAppBrowserOptions= {
            //   zoom: 'no',
            //   closebuttoncaption: '关闭',
            // };
      
            if(this.browser) this.browser.close();
      
            this.browser = this.inAppBrowser.create(item.contentUrl, '_system');
            this.browser.show();
          }
        }
      );
    }
  }
}
