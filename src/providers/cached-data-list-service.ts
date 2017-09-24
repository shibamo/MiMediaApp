import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
//import * as _ from 'lodash';

import { Storage } from '@ionic/storage';

import { SimpleStorageService } from './simple-storage-service';
import {Api} from './api';

@Injectable()
export class CachedDataListService {
  data: any;

  constructor(public api: Api, 
    public storage: Storage,
    public simpleStorage: SimpleStorageService, 
    public dataListName: string) 
  {
    this.simpleStorage.getStoredState(dataListName)
    .then((data) => {
      if(data) {
        try{
          this.data = JSON.parse(data);
        }
        catch(ex){
          this.data = null;
        }
      }
    }); 
  }

  private load(forceUpdate: boolean = false): any {
    if (this.data && !forceUpdate) { //直接从缓存数据读取
      return Observable.of(this.data);
    } else { //需要从后台读取并缓存下来
      let seq = this.api.get(this.dataListName + '/index').map((data: any) =>{
        return data.json();
      }).share();

      seq.map((data: any) => {
        this.data = data;
        this.storage.set(this.dataListName, JSON.stringify(data));
      }).subscribe();

      return seq; 
    }
  }

  getData(forceUpdate?: boolean){
    return this.load(forceUpdate).map((data: any) => {
      return data;
    });
  }
}