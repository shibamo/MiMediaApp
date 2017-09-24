import { Injectable } from '@angular/core';
@Injectable()
export class SettingService {
  //http://67ce02e7.ngrok.io
  //http://homestead.app/
  //http://192.168.100.107:8000/
  //http://192.168.0.34:8000/
  //http://dasianmediatest.us-east-2.elasticbeanstalk.com
  serverResourceBasePath: string = 'http://dasianmediatest.us-east-2.elasticbeanstalk.com/'; 
  apiUrlPath: string = 'http://dasianmediatest.us-east-2.elasticbeanstalk.com/api';
  apiSecretUrl: string = 'http://dasianmediatest.us-east-2.elasticbeanstalk.com/api'; //一般用于操作数据型

  uploadForumThreadImageUrl: string = 
    'http://dasianmediatest.us-east-2.elasticbeanstalk.com/api/forum-file/postNewImage'; 

  constructor() 
  {  
  }
}