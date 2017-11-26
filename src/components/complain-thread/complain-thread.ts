import { Component } from '@angular/core';
import { NavController,NavParams, ModalController,Loading,
  ToastController,LoadingController,ViewController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import {ForumService} from '../../providers/forum-service';

@Component({
  selector: 'complain-thread',
  templateUrl: 'complain-thread.html'
})
export class ComplainThreadComponent {
  isReadyToSave: boolean;
  threadItem: any;
  board: any;
  form: FormGroup;
  loading: Loading;

  constructor(public navCtrl: NavController,
    public toastCtrl: ToastController, 
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public viewCtrl: ViewController,    
    public navParams: NavParams,
    public forumService:ForumService,
    formBuilder: FormBuilder)
  {
    // 导航到本页时需要传入主贴对象
    this.threadItem = navParams.get('item');
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
      content: '正在提交...'
    });

    this.loading.present();

    this.forumService.complainMain(
      Object.assign({}, this.form.value, 
        {forumBoardId: this.board.id, forumThreadId: this.threadItem.id}))
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
