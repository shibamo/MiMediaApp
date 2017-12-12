import { Injectable } from '@angular/core';

import { Api } from './api';
import { UserService } from './user-service';

@Injectable()
export class ContentVisitServiceProvider {

  public userId : number = null;
  public deviceUUID: string;
  public model: string;
  public platform: string;
  public version: string;
  public latitude: number;
  public longitude: number;
 
  constructor(public api: Api, public userService: UserService) {
  }

  public sendTvVisit(tvProgrameId: number){
    this.tryGetUserId();

    this.api.post('cv/a', {
      c: 1,
      t: tvProgrameId,
      userId: this.userId,
      deviceUUID: this.deviceUUID,
      model: this.model,
      platform: this.platform,
      version: this.version,
      latitude: this.latitude,
      longitude: this.longitude,
    }).subscribe();
  }

  public sendRadioVisit(radioProgrameId: number){
    this.tryGetUserId();

    this.api.post('cv/a', {
      c: 2,
      r: radioProgrameId,
      userId: this.userId,
      deviceUUID: this.deviceUUID,
      model: this.model,
      platform: this.platform,
      version: this.version,
      latitude: this.latitude,
      longitude: this.longitude,
    }).subscribe();    
  }

  public sendForumVisit(forumThreadId: number){
    this.tryGetUserId();

    this.api.post('cv/a', {
      c: 3,
      f: forumThreadId,
      userId: this.userId,
      deviceUUID: this.deviceUUID,
      model: this.model,
      platform: this.platform,
      version: this.version,
      latitude: this.latitude,
      longitude: this.longitude,
    }).subscribe();    
  }  

  public sendAdVisit(adId: number){
    this.tryGetUserId();
    
    this.api.post('cv/a', {
      c: 4,
      a: adId,
      userId: this.userId,
      deviceUUID: this.deviceUUID,
      model: this.model,
      platform: this.platform,
      version: this.version,
      latitude: this.latitude,
      longitude: this.longitude,
    }).subscribe();    
  }

  private tryGetUserId(){
    if(this.userId) return;

    if(!this.userService._user) return;

    this.userId = this.userService._user.id;
  }
}
