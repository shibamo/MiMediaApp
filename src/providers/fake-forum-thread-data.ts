import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
//import * as _ from 'lodash';


@Injectable()
export class FakeForumThreadDataProvider {
  data: any;

  constructor(public http: Http) {
  }

  load(): any {
    if (this.data) {
      return Observable.of(this.data);
    } else {
      return this.http.get('assets/data/forum-thread-data.json'); 
    }
  }

  getData(dataName:string){
    if(this.data){
      return Observable.of(this.data[dataName]);
    }
    else{
      return this.load().map((data: any) => {
        this.data = data.json();
        return this.data[dataName];
      });
    }
  }

  addThread(threadInfo: any){
    this.data[threadInfo.dataName].push({
      id: 999,
      guid: '999',
      name: threadInfo.name,
      content: threadInfo.content,
      date: new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate(),
      authorId: 1,
      authorName: "无名氏", 
      avatar: "assets/img/avatar3.jpg",
      replies: [],
    });
  }
  
  addThreadReply(threadInfo: any, replyInfo: any){

  }
}