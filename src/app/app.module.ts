import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, Http } from '@angular/http';
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

// cordova plugins
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { Device } from '@ionic-native/device';
import { Network } from '@ionic-native/network';
import { SocialSharing } from '@ionic-native/social-sharing';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SafariViewController } from '@ionic-native/safari-view-controller';
import { Globalization } from '@ionic-native/globalization';

// 多语言支持
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// services
import { ResourceService } from '../providers/resource-service';
import { AdSettingService } from '../providers/ad-setting-service';
import { VideoService } from '../providers/video-service';
import { LiveService } from '../providers/live-service';
import { RadioService } from '../providers/radio-service';
import { ForumService } from '../providers/forum-service';
import { SettingService } from '../providers/setting-service';
import { Api } from '../providers/api';
import { UserData } from '../providers/user-data';
import { UserService } from '../providers/user-service';
import { UserLoginCheckServiceProvider } from '../providers/user-login-check-service';
import { SimpleStorageService } from '../providers/simple-storage-service';
import { TakePictureServiceProvider } from '../providers/take-picture-service';
import { WechatShareServiceProvider } from '../providers/wechat-share-service';
import { ContentVisitServiceProvider } from '../providers/content-visit-service';

// pages 
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { TabsPage } from '../pages/tabs/tabs';
import { AboutPage } from '../pages/about/about';
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
import { UserAgreementComponent } from '../components/user-agreement/user-agreement';
import { ComplainThreadComponent } from '../components/complain-thread/complain-thread';
import { ComplainThreadReplyComponent } from '../components/complain-thread-reply/complain-thread-reply';
import { ResetPasswordComponent } from '../components/reset-password/reset-password';
import { YoutubeLiveChannelComponent } from '../components/youtube-live-channel/youtube-live-channel';
import { LiveItemComponent } from '../components/live-item/live-item';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

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
    UserAgreementComponent,
    ComplainThreadComponent,
    ComplainThreadReplyComponent,
    ResetPasswordComponent,
    YoutubeLiveChannelComponent,
    LiveItemComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp,{
      backButtonText: '',
      backButtonIcon: 'ios-arrow-back',
      iconMode: 'md'
    }),
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient,Http]
      }
    }),
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
    UserAgreementComponent,
    ComplainThreadComponent,
    ComplainThreadReplyComponent,
    ResetPasswordComponent,
    YoutubeLiveChannelComponent,
    LiveItemComponent,
  ],
  providers: [
    Camera,
    File,
    FilePath,    
    StatusBar,
    SplashScreen,
    Device,
    Network,
    Geolocation,
    InAppBrowser,
    SafariViewController,
    Globalization,
    SocialSharing,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SettingService,
    ResourceService,
    AdSettingService,
    Api,
    UserData, 
    UserService,
    VideoService,
    LiveService,
    RadioService,
    ForumService,
    SimpleStorageService,
    TakePictureServiceProvider,
    WechatShareServiceProvider,
    UserLoginCheckServiceProvider,
    ContentVisitServiceProvider
  ]
})
export class AppModule {}
