import { Component} from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavController, ViewController, NavParams , ModalController,
  LoadingController, Loading,ToastController } from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';

import {SettingService} from '../../providers/setting-service';
import {ForumService} from '../../providers/forum-service';
import {UserService} from '../../providers/user-service';

import {ForumThreadSectionCreateComponent} from '../forum-thread-section-create/forum-thread-section-create';

@Component({
  selector: 'forum-thread-create',
  templateUrl: 'forum-thread-create.html'
})
export class ForumThreadCreateComponent {
  isReadyToSave: boolean;
  forumBoarditem: any;
  form: FormGroup;
  public content: string = "";  
  loading: Loading;

  sections: Array<{imageFileLink: any, beforeContent: string, afterContent: string}> = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,    
    public viewCtrl: ViewController, 
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public translateService: TranslateService,     
    public settingService :SettingService,
    public forumService:ForumService,
    public userService :UserService,        
    formBuilder: FormBuilder) 
  {
    this.forumBoarditem = navParams.get('board');    
    // https://angular.io/guide/form-validation
    this.form = formBuilder.group({
      name: ['', Validators.required],
      content: ['', Validators.required],
    });

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });
  }

  addSection() { //增加图文段
    let addModal = this.modalCtrl.create(ForumThreadSectionCreateComponent,{});
    addModal.onDidDismiss(item => {
      if (item && item.imageFileData) {
        this.loading = this.loadingCtrl.create({
          content: this.translateService.instant("UPLOADING_IMAGE")
        });
        this.loading.present();

        this.forumService.uploadThreadImage(
          this, item.imageFileData, this.imageUploadedOK, this.imageUploadedFail, item);
      }
    });
    addModal.present();
  }

  deleteSection(index){
    this.sections.splice(index,1);
  }

  private imageUploadedOK(self, res, item){
    self.sections.push({imageFileLink: res.link, 
      beforeContent: item.beforeContent, afterContent: item.afterContent});
      
    self.loading.dismiss();
  }

  private imageUploadedFail(self, err, item){
    self.toastCtrl.create({
      message: this.translateService.instant("UPLOAD_IMAGE_FAIL") + err.json().data.message,
      duration: 10000,
      position: 'middle',
    }).present(); 
    self.loading.dismiss();
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  done() {
    if(!this.form.valid) { return; }

    this.loading = this.loadingCtrl.create({
      content: this.translateService.instant("PLEASE_WAIT")
    });
    this.loading.present();

    this.forumService.postNewThread(this, Object.assign({}, this.form.value, {
      forumBoardId: this.forumBoarditem.id, 
      //content: this.content, 
      sections: !!(window as any).cordova ? this.sections : [{imageFileLink: 'https://s3.us-east-2.amazonaws.com/mimedia-dev-001/forum_images/f7722380-92a8-11e7-972b-df4f9fab525a.jpeg', beforeContent: 'BEFORECONTENT', afterContent: 'AFTERCONTENT'}]
    }), null, null)
    .subscribe(res => {
      this.loading.dismiss();
      this.viewCtrl.dismiss(Object.assign({}, this.form.value,{content: this.content}));
    }, err => {
      this.loading.dismiss();
      this.toastCtrl.create({
        message: this.translateService.instant("OPERATION_FAILED") + ': ' + err,
        duration: 30000,
        position: 'middle',
      }).present(); 
    });
  }
}
