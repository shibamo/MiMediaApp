import { Component } from '@angular/core';
import { NavController,NavParams, ModalController,Loading,
  ToastController,LoadingController,ViewController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { TranslateService } from '@ngx-translate/core';

import {ForumService} from '../../providers/forum-service';

@Component({
  selector: 'complain-thread-reply',
  templateUrl: 'complain-thread-reply.html'
})
export class ComplainThreadReplyComponent {
  isReadyToSave: boolean;
  threadReplyItem: any;
  board: any;
  form: FormGroup;
  loading: Loading;

  constructor(public navCtrl: NavController,
    public toastCtrl: ToastController, 
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public viewCtrl: ViewController,    
    public navParams: NavParams,
    public translateService: TranslateService,
    public forumService:ForumService,
    formBuilder: FormBuilder)
  {
    // 导航到本页时需要传入回贴对象
    this.threadReplyItem = navParams.get('item');
    this.board = navParams.get('board');

    // https://angular.io/guide/form-validation
    this.form = formBuilder.group({
      complainContent: ['', Validators.required],
    });

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    }); 
  }

  done() {
    if(!this.form.valid) { return; }

    this.loading = this.loadingCtrl.create({
      content: this.translateService.instant("PLEASE_WAIT")
    });

    this.loading.present();

    this.forumService.complainReply(
      Object.assign({}, this.form.value, 
        {forumBoardId: this.board.id, forumThreadReplyId: this.threadReplyItem.id}))
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
