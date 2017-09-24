import { Component} from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavController, ViewController, NavParams , ModalController,
  LoadingController, Loading,ToastController } from 'ionic-angular';

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

  //https://www.froala.com/wysiwyg-editor/docs/framework-plugins/angularjs-2-4
  //public froalaEditorOptions: Object;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,    
    public viewCtrl: ViewController, 
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public settingService :SettingService,
    public forumService:ForumService,
    public userService :UserService,        
    formBuilder: FormBuilder) 
  {
    /*经测试FroalaEditor达不到使用效果,废除
      this.froalaEditorOptions = {
      placeholderText: '请输入主贴内容',
      charCounterCount: false,
      language: 'zh_cn',
      height: 300,
      //需要为每种size指定显示的按钮,否则会显示缺省的格式按钮
      toolbarButtons: [ 'insertImage'], toolbarButtonsXS: [ 'insertImage'],
      toolbarButtonsSM: [ 'insertImage'], toolbarButtonsMD: [ 'insertImage'],
      // Set the image upload parameter.
      imageUploadParam: 'image',
      // Set the image upload URL.
      imageUploadURL: settingService.uploadForumThreadImageUrl,
      // Additional upload params.
      imageUploadParams: {
        uuid: UUID.UUID(), 
      },
      // Set request type.
      imageUploadMethod: 'POST',
      // Set max image size to 5MB.
      imageMaxSize: 5 * 1024 * 1024,
      // Allow to upload PNG and JPG.
      imageAllowedTypes: ['jpeg', 'jpg', 'png'],
      imageEditButtons: ['imageRemove'],
      imageInsertButtons: ['imageUpload',]
    };*/

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
          content: '正在上传图片文件...'
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
      message: '上传图片失败:' + err.json().data.message,
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
      content: '正在提交...'
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
        message: '发帖失败:' + err,
        duration: 30000,
        position: 'middle',
      }).present(); 
    });
  }
}
