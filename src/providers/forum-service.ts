import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/share';
import 'rxjs/add/observable/of';

import { File, FileEntry } from '@ionic-native/file';

import { Api } from './api';
import { UserService } from './user-service';

@Injectable()
export class ForumService {
  boardsData : any;
  threadsData = {}; 


  constructor(
    private file: File,    
    public api: Api, 
    public storage: Storage,
    private userService :UserService)  {
  }

  private load(forumBoardId :number, forceUpdate: boolean = false): any {
    return this.api.get('forum-thread/index/' + forumBoardId); 
  }

  getThreadsData(forumBoardId :number, forceUpdate?: boolean){
    if (this.threadsData[forumBoardId.toString()] && !forceUpdate) {
      //直接从会话级缓存数据读取 
      return Observable.of(this.threadsData[forumBoardId.toString()]);
    } else {
      return this.load(forumBoardId).map(data=>data.json()).map((data: any) => {
        this.threadsData[forumBoardId.toString()] = data;
        return data;
      });
    }
  }

  getBoardsData(){
    if(this.boardsData){
      //直接从会话级缓存数据读取 
      return Observable.of(this.boardsData);
    }
    else{
      return this.api.get('forum-thread/boards').map(data=>data.json()).map((data: any) => {
        this.boardsData = data;
        return data;
      });
    }
  }

  postNewThread(caller: any, thread: any, okHandler: any, failHandler: any){
    let seq = this.api.post('forum-thread/postNewThread', thread,
     this.userService.buildAuthenticationOptions()).share();

    seq.map(res => res.json())
      .subscribe(res => {
        if (res.status == 'success') {
        } else {
        }
      }, err => {
        console.error('ERROR', err);
      });

    return seq;
  }

  replyThread(reply: any){
    let seq = this.api.post('forum-thread/replyThread', reply,
      this.userService.buildAuthenticationOptions()).share();

    seq.map(res => res.json())
      .subscribe(res => {
        console.log(res);
        if (res.status == 'success') {
        } else {
        }
      }, err => {
        console.error('ERROR', err);
      });

    return seq;
  }

  uploadThreadImage(caller: any, imageFilePath: string, okHandler: any, failHandler: any, payload?: any){
    this.file.resolveLocalFilesystemUrl(imageFilePath) 
    .then(entry => (<FileEntry>entry).file(
      file => this.readImageFileAndUpload(
        caller, file, okHandler, failHandler, payload),
      err => failHandler(caller,err)
    ))
    .catch(err => failHandler(caller,err));
  }

  private readImageFileAndUpload(caller: any, file: any, okHandler?: any, failHandler?: any, payload?: any) {
    const reader = new FileReader();

    reader.onloadend = () => {
      const formData = new FormData();
      const imgBlob = new Blob([reader.result], {type: file.type});
      formData.append('image', imgBlob, 'image.jpg');

      this.api.post('forum-file/postNewImage', formData, 
        this.userService.buildAuthenticationOptions())
      .toPromise()
      .then(response => {
        okHandler && okHandler(caller, response.json(), payload);})
      .catch((e) => failHandler && failHandler(caller, e, payload));
    };

    reader.onerror = (ev) =>{
      failHandler(caller, ev.error);
    };

    reader.readAsArrayBuffer(file);
  }

}