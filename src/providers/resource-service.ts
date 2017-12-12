import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/share';
import { Storage } from '@ionic/storage';

import {Api} from './api';

@Injectable()
export class ResourceService {
  avatarImageUrlPrefix : string = '/';
  forumImageUrlPrefix : string = '/';
  tvVideoUrlPrefix : string = '/';
  tvImageUrlPrefix : string = '/';
  radioAudioUrlPrefix : string = '/';
  radioImageUrlPrefix : string = '/';
  boardImageUrlPrefix : string = '/';
  adImageUrlPrefix : string = '/';
  generalWebviewUrlPrefix: string = '/';

  constructor(public api: Api, 
    public storage: Storage) {
      this.getStoredState();
  }

  getStoredState() : Promise<void>{
    return this.storage.keys().then(
      (_keys) => {
        if (_keys.indexOf("resourceUrlPrefixes") >= 0) {
          this.storage.get("resourceUrlPrefixes").then((data) => {
            let resourceUrlPrefixes = JSON.parse(data);
            this.avatarImageUrlPrefix = resourceUrlPrefixes.avatarImageUrlPrefix;
            this.forumImageUrlPrefix = resourceUrlPrefixes.forumImageUrlPrefix;
            this.tvVideoUrlPrefix = resourceUrlPrefixes.tvVideoUrlPrefix;
            this.tvImageUrlPrefix = resourceUrlPrefixes.tvImageUrlPrefix;
            this.radioAudioUrlPrefix = resourceUrlPrefixes.radioAudioUrlPrefix;
            this.radioImageUrlPrefix = resourceUrlPrefixes.radioImageUrlPrefix;
            this.boardImageUrlPrefix = resourceUrlPrefixes.boardImageUrlPrefix;
            this.adImageUrlPrefix = resourceUrlPrefixes.adImageUrlPrefix;
          });
        }
        else {
          console.info("resourceUrlPrefixes not in storage");
        }
      }
    );
  }

  loadResourceUrlPrefixes(){
    this.api.get('resource-location-setting/index')
    .map(res => res.json())
    .subscribe(res => {
      this.avatarImageUrlPrefix = res.avatarImageUrlPrefix;
      this.forumImageUrlPrefix = res.forumImageUrlPrefix;
      this.tvVideoUrlPrefix = res.tvVideoUrlPrefix;
      this.tvImageUrlPrefix = res.tvImageUrlPrefix;
      this.radioAudioUrlPrefix = res.radioAudioUrlPrefix;
      this.radioImageUrlPrefix = res.radioImageUrlPrefix;
      this.boardImageUrlPrefix = res.boardImageUrlPrefix;
      this.adImageUrlPrefix = res.adImageUrlPrefix;
      this.generalWebviewUrlPrefix = res.generalWebviewUrlPrefix;

      this.storage.set("resourceUrlPrefixes", JSON.stringify(res));
    }, err => {
      console.error('ERROR', err);
    });
  }
}