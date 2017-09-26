import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http, RequestOptions, URLSearchParams, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

import {SettingService} from './setting-service';

@Injectable()
export class Api {
  private url: string;
  private secretUrl: string; 

  constructor(
    public http: Http, 
    public storage: Storage,
    public settingService :SettingService) 
  {
    this.url = settingService.apiUrlPath;
    this.secretUrl = settingService.apiSecretUrl;
  }

  public setUrl(url: string){
    this.url = url;
  }

  public setSecretUrl(secretUrl: string){
    this.secretUrl = secretUrl;
  }  

  get(endpoint: string, params?: any, options?: RequestOptions) {
    if (!options) {
      options = new RequestOptions();
    }

    // Support easy query params for GET requests
    if (params) {
      let p = new URLSearchParams();
      for(let k in params) {
        p.set(k, params[k]);
      }
      // Set the search field if we have params and don't already have
      // a search field set in options.
      options.search = !options.search && p || options.search;
    }

    return this.http.get(this.url + '/' + endpoint, options).catch(err => {
      return Observable.throw(err);
    });
  }

  post(endpoint: string, body: any, options?: RequestOptions) :Observable<Response> {
    return this.http.post(this.secretUrl + '/' + endpoint, body, options).catch(err => {
      return Observable.throw(err);
    });
  }

  postWithoutJwtToken(endpoint: string, body: any, options?: RequestOptions) {
    return this.http.post(this.secretUrl + '/' + endpoint, body, options).catch(err => {
      return Observable.throw(err);
    });
  }

  put(endpoint: string, body: any, options?: RequestOptions) {
    return this.http.put(this.secretUrl + '/' + endpoint, body, options).catch(err => {
      return Observable.throw(err);
    });
  }

  delete(endpoint: string, body: any, options?: RequestOptions) {
    return this.http.post(this.secretUrl + '/' + endpoint, body, options).catch(err => {
      return Observable.throw(err);
    });
  }

  patch(endpoint: string, body: any, options?: RequestOptions) {
    return this.http.put(this.secretUrl + '/' + endpoint, body, options).catch(err => {
      return Observable.throw(err);
    });
  }
}
