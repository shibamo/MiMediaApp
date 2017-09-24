import { DomSanitizer } from '@angular/platform-browser';

export interface ImageCustomer{
  imageRetrieved: boolean;
  imageFileData: any; //存放的其实是要上传的图片文件的路径(含文件)
  sanitizer: DomSanitizer;
}