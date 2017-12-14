import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { TranslateService } from '@ngx-translate/core';

import { ToastController } from 'ionic-angular';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { FilePath } from '@ionic-native/file-path';
import { Device } from '@ionic-native/device';

import { ImageCustomer } from '../models/image-customer';

@Injectable()
export class TakePictureServiceProvider {

  constructor(public toastCtrl: ToastController, 
    private camera: Camera,
    private filePath: FilePath,
    private device: Device,
    public translateService: TranslateService,
  )
  {
  }

  public setImageFromCamera(caller: ImageCustomer){
    //参考 https://golb.hplar.ch/p/Uploading-pictures-from-Ionic-2-to-Spring-Boot
    // https://github.com/ralscha/blog/blob/master/uploadsb/client/src/pages/home/home.ts
    const native_options: CameraOptions = {
      quality: 80,
      destinationType: this.camera.DestinationType.NATIVE_URI,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.JPEG,
      saveToPhotoAlbum: false,
      correctOrientation:false,
      targetWidth: 600,
      targetHeight: 600,
      allowEdit: true,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(native_options).then(
      (imageData) => { //获取到拍照图片
        caller.imageRetrieved = true;
        //以下替换操作是因为原格式的文件url无法被webview所解析,根据以下链接做的调整:
        //https://stackoverflow.com/questions/31548925/how-to-access-image-from-native-uri-assets-library-in-cordova-for-ios
        //返回的路径同时需要进行santinize,会在html template中调用,参考链接:
        //https://angular.io/guide/security#xss
        caller.imageFileData = imageData.replace("assets-library://", "cdvfile://localhost/assets-library/");
        //this.presentToast('获取到拍照图片:' + caller.imageFileData);
      }, 
      (err) => { //获取拍照图片出错, 排除用户自己取消了操作的情况
        if(!err.toString().includes('cancel')){
          this.presentToast(this.translateService.instant("ACCESS_PHOTO_FAIL") + err);
        }
      }
    );
  }

  public setImageFromLibrary(caller: ImageCustomer){
    const options: CameraOptions = {
      quality: 90,
      destinationType: this.camera.DestinationType.NATIVE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    }

    this.camera.getPicture(options).then(
      (imageData) => { //获取到图库图片
        //resolve the native filesystem path for Android content URIs 
        if(this.device.platform.toUpperCase().includes('ANDROID')){
          this.filePath.resolveNativePath(imageData)
          .then(filePath => {
            caller.imageRetrieved = true;
            caller.imageFileData = filePath;
          })
          .catch(err => { //获取拍照图片出错
            this.presentToast(this.translateService.instant("ACCESS_PHOTO_FAIL") + err);
          });
        } else{
          caller.imageRetrieved = true;
          caller.imageFileData = imageData.replace("assets-library://", "cdvfile://localhost/assets-library/");
        }
      }, 
      (err) => { //获取拍照图片出错, 排除用户自己取消了操作的情况
        if(!err.toString().includes('cancel')){
          this.presentToast(this.translateService.instant("ACCESS_PHOTO_FAIL") + err);
        }
      }
    );
  }

  private presentToast(msg, duration? : number) {
    this.toastCtrl.create({
      message: msg,
      duration: 30000,
      position: 'bottom'
    }).present();
  }
}
