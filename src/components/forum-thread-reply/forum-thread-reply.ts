import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavController, ViewController, NavParams, 
  LoadingController, Loading } from 'ionic-angular';

import {ForumService} from '../../providers/forum-service';

@Component({
  selector: 'forum-thread-reply',
  templateUrl: 'forum-thread-reply.html'
})
export class ForumThreadReplyComponent {

  isReadyToSave: boolean;
  mainThread: any;
  form: FormGroup;
  loading: Loading;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,    
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController, 
    public forumService:ForumService,    
    formBuilder: FormBuilder) 
  {
    this.mainThread = navParams.get('thread');
    // https://angular.io/guide/form-validation
    this.form = formBuilder.group({
      content: ['', Validators.required]
    });

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });
  }

  done() {
    if(!this.form.valid) { return; }

    this.loading = this.loadingCtrl.create({
      content: '正在提交...'
    });

    this.loading.present();

    this.forumService.replyThread(
      Object.assign({}, this.form.value, {forumThreadId: this.mainThread.id}))
    .subscribe(res => {
      this.loading.dismiss();
      this.viewCtrl.dismiss(this.form.value);
    }, err => {
      console.error('ERROR', err);
    });
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

}
