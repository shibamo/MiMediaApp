import { Injectable } from '@angular/core';
@Injectable()
export class SettingService {
  //http://67ce02e7.ngrok.io/
  //http://homestead.app/
  //http://192.168.100.107:8000/
  //http://192.168.0.34:8000/
  defaultHost: string = 'https://test1.mtest.dchineseradio.com/';
  //defaultHost: string = 'http://homestead.app/';
  serverResourceBasePath: string = this.defaultHost; 
  apiUrlPath: string = this.defaultHost + 'api';
  apiSecretUrl: string = this.defaultHost + 'api'; //一般用于操作数据型

  uploadForumThreadImageUrl: string = this.defaultHost + 'api/forum-file/postNewImage'; 

  radioProgrameWebviewPath = 'RadioPrograme/webview/';
  tvProgrameWebviewPath = 'TvPrograme/webview/';
  forumThreadWebviewPath = 'Forum/webview/';

  networkTimeout = 5000; //网络访问的过期出错时间
  constructor() 
  {  
  }
}