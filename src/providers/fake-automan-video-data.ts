import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
//import * as _ from 'lodash';

@Injectable()
export class FakeAutomanVideoDataProvider {
  data: any;

  constructor(public http: Http) {
  }

  load(): any {
    if (this.data) {
      return Observable.of(this.data);
    } else {
      return this.http.get('assets/data/video-data.json');
    }
  }

  getData(){
    // return this.load().map((data: any) => {
    //   let jsonData = data.json();
    //   return jsonData.savedItems.map((id)=>{
    //     return _.find(jsonData.programItems, (item)=>{
    //       return item['id'] == id;
    //     })
    //   });
    // });
    return this.load().map((data: any) => {
      return data.json().automanItems;
    });    
  }
}
