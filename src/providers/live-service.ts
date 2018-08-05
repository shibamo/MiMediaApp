import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/share';

import { Storage } from '@ionic/storage';

import { SettingService } from '../providers/setting-service';
import { SimpleStorageService } from './simple-storage-service';
import { Api } from './api';

@Injectable()
export class LiveService {
  channelData: any;
  data: any; //programe

  constructor(
    public api: Api, 
    public storage: Storage,
    public settingService :SettingService,
    public simpleStorage: SimpleStorageService,) 
  {
    // 为保证直播的时效性,不进行缓存
    this.data = null;
  }

  private load(forceUpdate: boolean = false): Observable<any> {
    if (this.data && !forceUpdate) { //直接从缓存数据读取
      return Observable.of(this.data);
    } else { //需要从后台读取并缓存下来
      let seq = this.api.get('live-programe/index')
      .timeout(this.settingService.networkTimeout)
      .map((_data: any) =>{
        return _data.json();
      }).share();

      seq.map((_data: any) => {
        this.data = _data;
        this.storage.set("live-programe", JSON.stringify(_data));
      });

      return seq; 
    }
  }

  getData(forceUpdate?: boolean){
    return this.load(forceUpdate).map((_data: any) => {
      return _data;
    });
  }
}