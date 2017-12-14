import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NavController, ViewController, NavParams , 
  ActionSheetController ,ToastController} from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';

import { ImageCustomer } from '../../models/image-customer';
import { TakePictureServiceProvider } from '../../providers/take-picture-service';

@Component({
  selector: 'forum-thread-section-create',
  templateUrl: 'forum-thread-section-create.html'
})
export class ForumThreadSectionCreateComponent implements ImageCustomer {
  // ImageCustomer的成员
  imageRetrieved = false;
  imageFileData :any = null; //存放的其实是要上传的图片文件的路径(含文件)

  //isReadyToSave = false;
  beforeContent: string = null;
  afterContent: string = null;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,    
    public viewCtrl: ViewController, 
    public toastCtrl: ToastController,    
    public actionSheetCtrl: ActionSheetController,
    public translateService: TranslateService,      
    private takePictureService: TakePictureServiceProvider,
    public sanitizer: DomSanitizer)
  {
  }

  setImage(){
    let actionSheet = this.actionSheetCtrl.create({
      title: this.translateService.instant("SET_IMAGE"),
      buttons: [
        {
          text: this.translateService.instant("FROM_CAMERA"),
          handler: () => {
            if(!!(window as any).cordova){
              this.takePictureService.setImageFromCamera(this);
            } else { //开发测试时使用静态图片
              this.imageRetrieved = true;

            }
          }
        },{
          text: this.translateService.instant("FROM_LIBRARY"),
          handler: () => {
            this.takePictureService.setImageFromLibrary(this);
          }
        },{
          text: this.translateService.instant("CANCEL"),
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });
    actionSheet.present();    
  }

  done(){
    this.viewCtrl.dismiss({
      imageFileData: this.imageFileData,
      beforeContent: this.beforeContent,
      afterContent: this.afterContent,
    });
  }

  cancel(){
    this.viewCtrl.dismiss();
  }

  isReadyToSave(){
    return this.imageRetrieved;
  }
}
