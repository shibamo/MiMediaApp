import { Injectable } from '@angular/core';
@Injectable()
export class SettingService {
  // defaultHost: string = 'https://test1.mtest.dchineseradio.com/';
  defaultHost: string = 'https://prod1.mapp.dchineseradio.com/';
  // defaultHost: string = 'http://homestead.appl/';

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