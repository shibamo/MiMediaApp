import { Injectable } from '@angular/core';
import { RequestOptions, Headers } from '@angular/http';

import { File, FileEntry } from '@ionic-native/file';

import { Api } from './api';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/share';
import 'rxjs/add/observable/of';
import { Storage } from '@ionic/storage';

import { SimpleStorageService } from './simple-storage-service';
import { SettingService } from './setting-service';

@Injectable()
export class UserService {
  public _user: any;
  public _authenticationToken: string; //JWT_Token

  constructor(
    // public http: Http,
    private file: File,
    public api: Api,
    public storage: Storage,
    public simpleStorage: SimpleStorageService,
    public settingService :SettingService
  ) 
  {
    this.getStoredState();
  }

  public getAuthenticationToken(){
    if(this.isCurrentUserValid()) { //仅返回有效的token
      return this._authenticationToken;
    } else {
      return null;
    }
  }

  public isCurrentUserValid() {
    return this._authenticationToken &&
      Date.now() < (this.parseJwt()['exp']) * 1000;
  }

  public register(accountInfo: { email?: string, name?: string, password?: string }) {
    let seq = this.api.post('user/register', accountInfo).share();

    seq.map(res => res.json())
      .subscribe(res => {
        // console.log(res);
        if (res.status == 'success') {
          this._setLoggedInData(res);
        } else {
        }
      }, err => {
        console.error('ERROR', err);
      });

    return seq;

  }

  public login(accountInfo: { email?: string, password?: string }) {
    let seq = this.api.post('user/login', accountInfo).share();

    seq.map(res => res.json())
      .subscribe(res => {
        // If the API returned a successful response, mark the user as logged in
        //console.debug(res);
        if (res.status == 'success') {
          this._setLoggedInData(res);
        } else {
        }
      }, err => {
        console.error('ERROR', err);
      });

    return seq;
  }

  public logout() {
    this._user = null;
    this._authenticationToken = null;
    this.storage.remove("authenticationToken");
    this.storage.remove("user");
  }
  
  public changePassword(oldPassword: string, newPassword: string) {
    let seq = this.api.post('user/changePassword',
      { oldPassword: oldPassword, newPassword: newPassword },
      this.buildAuthenticationOptions()
    ).share();

    seq.map(resp => resp.json())
      .subscribe(resp => {
        if (resp.status == 'success') {
          this._setLoggedInData(resp);
        } else {
          console.error('ERROR', resp);
        }
      }, err => {
        console.error('ERROR', err);
      });

    return seq;
  }

  public setAvatar(imageFileDataRaw: any){ // 因为此方式容易导致android客户端app闪退, 暂时放弃
    let seq = this.api.post('user/setAvatar',
      { image: imageFileDataRaw},
      this.buildAuthenticationOptions()
    ).share();

    seq.map(resp => resp.json())
      .subscribe(resp => {
        if (resp.status == 'success') {
          this._setLoggedInData(resp);
        } else {
          console.error('ERROR', resp);
        }
      }, err => {
        console.error('ERROR', err);
      });

    return seq;    
  }

  public setAvatarWithFilePath(caller: any, imageFilePath: string, okHandler: any, failHandler: any){
    this.file.resolveLocalFilesystemUrl(imageFilePath) 
    .then(entry => (<FileEntry>entry).file(
      file => this.readAvatarFileAndUpload(caller, file,okHandler,failHandler),
      err => failHandler(caller,err)
    ))
    .catch(err => failHandler(caller,err));
  }

  public buildAuthenticationOptions(): RequestOptions {
    let headers = new Headers({
      'Authorization': "Bearer " + this._authenticationToken
    });
    let options = new RequestOptions({ headers: headers });

    return options;
  }

  private readAvatarFileAndUpload(caller: any, file: any, okHandler: any, failHandler: any) {
    const reader = new FileReader();

    reader.onloadend = () => {
      const formData = new FormData();
      const imgBlob = new Blob([reader.result], {type: file.type});
      formData.append('file', imgBlob, 'avatar.jpg');

      this.api.post('user/setAvatar', formData, this.buildAuthenticationOptions())
      .toPromise()
      .then(response => {
        this._setLoggedInData(response.json());
        okHandler(caller, response);})
      .catch((e) => failHandler(caller, e));
    };

    reader.onerror = (ev) =>{
      failHandler(caller, ev.error);
    };

    reader.readAsArrayBuffer(file);
  }

  private getStoredState() {
    this.simpleStorage.getStoredState('authenticationToken').then((data) => {
      if (data) this._authenticationToken = data.toString();
    });
    this.simpleStorage.getStoredState('user').then((data) => {
      if (data) this._user = JSON.parse(data.toString());
    });
  }

  private _setLoggedInData(resp) {
    console.info(resp);
    this._user = resp.user;
    this._authenticationToken = this._user.JWT_Token;
    this.storage.set("authenticationToken", this._user.JWT_Token);
    this.storage.set("user", JSON.stringify(this._user));
  }

  private parseJwt() {
    var base64Url = this._authenticationToken.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  };
}
