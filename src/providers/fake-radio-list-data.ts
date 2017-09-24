import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
//import * as _ from 'lodash';


@Injectable()
export class FakeRadioListDataProvider {
  data: any;

  constructor(public http: Http) {
  }

  load(): any {
    if (this.data) {
      return Observable.of(this.data);
    } else {
      return this.http.get('assets/data/audio-data.json'); 
    }
  }

  getData(dataName:string){
    return this.load().map((data: any) => {
      return data.json()[dataName];
    });
  }
}
