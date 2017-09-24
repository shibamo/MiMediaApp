import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import {Api} from './api';

@Injectable()
export class AdSettingService {
  data: any;

  constructor(public api: Api) {
  }

  private load(): any {
    if (this.data) {
      return Observable.of(this.data);
    } else {
      return this.api.get('ad-setting/index'); 
    }
  }

  getData(){
    return this.load().map((data: any) => {
      this.data= data; //仅在会话期缓存该数据
      return data.json();
    });
  }
}