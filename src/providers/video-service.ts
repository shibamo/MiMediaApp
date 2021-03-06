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
export class VideoService {
  channelData: any;
  data: any; //programe

  constructor(
    public api: Api, 
    public storage: Storage,
    public settingService :SettingService,
    public simpleStorage: SimpleStorageService,) 
  {
    this.simpleStorage.getStoredState('tv-channel').then((_data) => {
      if(_data) {
        try{
          this.channelData = JSON.parse(_data);
        }
        catch(ex){
          this.channelData = null;
        }
      }
    }); 

    this.simpleStorage.getStoredState('tv-programe').then((_data) => {
      if(_data) {
        try{
          this.data = JSON.parse(_data);
        }
        catch(ex){
          this.data = null;
        }
      }
    }); 
  }

  private loadChannelData(forceUpdate: boolean = false): Observable<any> {
    if (this.channelData && !forceUpdate) { 
      //如果已有数据并且未指定强制更新, 则直接从已有数据读取
      return Observable.of(this.channelData);
    } else { //需要从后台读取并缓存下来
      let seq = this.api.get('tv-programe/channels')
      .timeout(this.settingService.networkTimeout)
      .map((_data: any) =>{
        return _data.json();
      }).share();

      seq.map((_data: any) => {
        this.channelData = _data;
        this.storage.set("tv-channel", JSON.stringify(_data));
      });

      return seq;
    }
  }

  getchannelData(forceUpdate?: boolean){
    return this.loadChannelData(forceUpdate).map((_data: any) => {
      return _data;
    });
  }

  private load(forceUpdate: boolean = false): Observable<any> {
    if (this.data && !forceUpdate) { //直接从缓存数据读取
      return Observable.of(this.data);
    } else { //需要从后台读取并缓存下来
      let seq = this.api.get('tv-programe/index')
      .timeout(this.settingService.networkTimeout)
      .map((_data: any) =>{
        return _data.json();
      }).share();

      seq.map((_data: any) => {
        this.data = _data;
        this.storage.set("tv-programe", JSON.stringify(_data));
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