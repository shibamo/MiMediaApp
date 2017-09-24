import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';

@Injectable()
export class SimpleStorageService {

  constructor(public storage: Storage) 
  {
  }
  
  getStoredState(key : string, 
    missingHandler?: (key?: string)=>void, 
    missingLogInConsole?: boolean) 
    : Promise<any>
  {
    return this.storage.keys().then(
      (_keys) => {
        if (_keys.indexOf(key) >= 0) {
          return this.storage.get(key);
        }
        else {
          if(missingLogInConsole) console.debug(key + " not in storage");
          if(missingHandler) missingHandler(key);
        }
      }
    );
  }
}
