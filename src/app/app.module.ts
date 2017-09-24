import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { Device } from '@ionic-native/device';
import { Network } from '@ionic-native/network';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { TabsPage } from '../pages/tabs/tabs';
import { AboutPage } from '../pages/about/about';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IonicStorageModule } from '@ionic/storage';

import { ResourceService } from '../providers/resource-service';
import { AdSettingService } from '../providers/ad-setting-service';
import { VideoService } from '../providers/video-service';
import { RadioService } from '../providers/radio-service';
import { ForumService } from '../providers/forum-service';
import { SettingService } from '../providers/setting-service';
import { Api } from '../providers/api';
import { UserData } from '../providers/user-data';
import { UserService } from '../providers/user-service';
import { SimpleStorageService } from '../providers/simple-storage-service';

//import { FakeRadioStationDataProvider } from '../providers/fake-radio-station-data';

import { TVStationListComponent } from '../components/tv-station-list/tv-station-list';
import { TVProgrameListComponent } from '../components/tv-programe-list/tv-programe-list';
import { TVItemComponent } from '../components/tv-item/tv-item';
import { RadioItemComponent } from '../components/radio-item/radio-item';
import { RadioProgrameListComponent } from '../components/radio-programe-list/radio-programe-list';
import { RadioStationListComponent } from '../components/radio-station-list/radio-station-list';
import { ForumThreadItemComponent } from '../components/forum-thread-item/forum-thread-item';
import { ForumThreadListComponent } from '../components/forum-thread-list/forum-thread-list';
import { ForumBoardListComponent } from '../components/forum-board-list/forum-board-list';
import { ForumThreadCreateComponent } from '../components/forum-thread-create/forum-thread-create';
import { ForumThreadReplyComponent } from '../components/forum-thread-reply/forum-thread-reply';
import { ProfilePageComponent } from '../components/profile-page/profile-page';
import { AdPositionPromotionComponent } from '../components/ad-position-promotion/ad-position-promotion';
import { SettingComponent } from '../components/setting/setting';
import { ChangePasswordComponent } from '../components/change-password/change-password';
import { ForumThreadSectionCreateComponent } from '../components/forum-thread-section-create/forum-thread-section-create';
import { TakePictureServiceProvider } from '../providers/take-picture-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    AboutPage,
    TabsPage,
    TVStationListComponent,
    TVProgrameListComponent,
    TVItemComponent,
    RadioItemComponent,
    RadioProgrameListComponent,
    RadioStationListComponent,
    ForumThreadItemComponent,
    ForumThreadListComponent,
    ForumBoardListComponent,
    ForumThreadCreateComponent,
    ForumThreadReplyComponent,
    ProfilePageComponent,
    AdPositionPromotionComponent,
    SettingComponent,
    ChangePasswordComponent,
    ForumThreadSectionCreateComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp,{
      backButtonText: '',
      backButtonIcon: 'ios-arrow-back',
      iconMode: 'md'
    }),
    IonicStorageModule.forRoot(),
    // FroalaEditorModule.forRoot(), 
    // FroalaViewModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,    
    AboutPage,
    TabsPage,
    TVStationListComponent,
    TVProgrameListComponent,
    TVItemComponent,
    RadioStationListComponent,
    RadioProgrameListComponent,
    RadioItemComponent,
    ForumThreadItemComponent,
    ForumThreadListComponent,
    ForumBoardListComponent,
    ForumThreadCreateComponent,
    ForumThreadReplyComponent,
    ForumThreadSectionCreateComponent,
    ProfilePageComponent,
    AdPositionPromotionComponent,
    SettingComponent,
    ChangePasswordComponent,
  ],
  providers: [
    Camera,
    File,
    FilePath,    
    StatusBar,
    SplashScreen,
    Device,
    Network,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SettingService,
    ResourceService,
    AdSettingService,
    Api,
    UserData,
    UserService,
    VideoService,
    RadioService,
    ForumService,
    SimpleStorageService,
    //FakeRadioStationDataProvider,
    TakePictureServiceProvider
  ]
})
export class AppModule {}
