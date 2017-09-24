import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NavController, ViewController, NavParams , 
  ActionSheetController ,ToastController} from 'ionic-angular';

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
    private takePictureService: TakePictureServiceProvider,
    public sanitizer: DomSanitizer)
  {
  }

  setImage(){
    let actionSheet = this.actionSheetCtrl.create({
      title: '设置图片',
      buttons: [
        {
          text: '从相机(推荐)',
          handler: () => {
            if(!!(window as any).cordova){
              this.takePictureService.setImageFromCamera(this);
            } else { //开发测试时使用静态图片
              this.imageRetrieved = true;

            }
          }
        },{
          text: '从图库',
          handler: () => {
            this.takePictureService.setImageFromLibrary(this);
          }
        },{
          text: '取消',
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
