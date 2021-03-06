import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ModalController, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Network } from '@ionic-native/network';
import { Geolocation } from '@ionic-native/geolocation';
import { Device} from '@ionic-native/device';
import { Globalization } from '@ionic-native/globalization';

import { TranslateService } from '@ngx-translate/core';

import { ResourceService } from '../providers/resource-service';
import { UserService } from '../providers/user-service';
import { VideoService } from '../providers/video-service';
import { ContentVisitServiceProvider } from '../providers/content-visit-service';

import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { TabsPage } from '../pages/tabs/tabs';
import { AboutPage } from '../pages/about/about';
import { ProfilePageComponent } from '../components/profile-page/profile-page';
import { ForumBoardListComponent } from '../components/forum-board-list/forum-board-list';
import { TVStationListComponent } from '../components/tv-station-list/tv-station-list';
import { RadioProgrameListComponent } from '../components/radio-programe-list/radio-programe-list';
import { YoutubeLiveChannelComponent} from '../components/youtube-live-channel/youtube-live-channel';
// import { SettingComponent } from '../components/setting/setting';

export interface PageInterface {
  title: string;
  name: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
  tabName?: string;
  tabComponent?: any;
  highlight?: boolean; 
  isPage?: boolean;
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav  
  @ViewChild(Nav) nav: Nav;

  appPages: PageInterface[] = [
    { title: "VIDEO", name: 'TabsPage', component: TabsPage, tabComponent: TVStationListComponent, index: 0, icon: 'videocam', highlight: true, isPage: true },
    { title: 'RADIO', name: 'TabsPage', component: TabsPage, tabComponent: RadioProgrameListComponent, index:1, icon: 'radio', highlight: true , isPage: true},    
    { title: 'FORUM', name: 'TabsPage', component: TabsPage, tabComponent: ForumBoardListComponent, 
    index: 2, icon: 'contacts', highlight: true , isPage: true},
    { title: 'LIVE', name: 'TabsPage', component: TabsPage, tabComponent: YoutubeLiveChannelComponent, index: 3, icon: 'logo-youtube', highlight: true , isPage: true},
  ];

  loggedOutPages: PageInterface[] = [
    //{ title: 'LIVE', name: 'YoutubeLiveChannel', component: YoutubeLiveChannelComponent, index: 4, icon: 'pulse', highlight: true  , isPage: false}, 
    { title: 'LOGIN', name: 'LoginPage', component: LoginPage, icon: 'log-in' , isPage: false},
    { title: 'REGISTER', name: 'SignupPage', component: SignupPage, icon: 'person-add' , isPage: false},
    { title: 'ABOUT', name: 'AboutPage', component: AboutPage, index: 3, icon: 'information-circle' , isPage: false},
    // { title: '设置', name: 'SettingPage', component: SettingComponent, icon: 'settings' , isPage: false},
  ];
  
  loggedInPages: PageInterface[] = [
    //{ title: 'LIVE', name: 'YoutubeLiveChannel', component: YoutubeLiveChannelComponent, index: 4, icon: 'pulse', highlight: true  , isPage: false},
    { title: 'PROFILE', name: 'ProfilePageComponent', component: ProfilePageComponent, icon: 'person' , isPage: true},
    { title: 'ABOUT', name: 'AboutPage', component: AboutPage, index: 3, icon: 'information-circle' , isPage: false},    
    // { title: '设置', name: 'SettingPage', component: SettingComponent, icon: 'settings' , isPage: false},
  ];

  translator: TranslateService;

  rootPage: any = TabsPage;

  constructor(
    public platform: Platform, 
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen, 
    public network: Network,
    public device: Device,
    public geolocation: Geolocation,
    public globalization: Globalization,

    public translate: TranslateService,

    public userService: UserService, 
    public resourceService: ResourceService,
    public videoService :VideoService,
    public visitService :ContentVisitServiceProvider,
  ) {
    this.initializeApp();

    this.translator = translate;

    this.resourceService.loadResourceUrlPrefixes();
  }

  initializeApp() {
    this.platform.ready().then(() => {

      this.statusBar.styleDefault();

      this.splashScreen.hide();
      
      this.visitService.deviceUUID = this.device.uuid;
      this.visitService.model = this.device.model;
      this.visitService.platform = this.device.platform;
      this.visitService.version = this.device.version;

      this.geolocation.getCurrentPosition().then((resp) => {
        this.visitService.latitude = resp.coords.latitude;
        this.visitService.longitude = resp.coords.longitude;
       }).catch((error) => {
       });
      
      this.translate.setDefaultLang('en');
      
      this.globalization.getLocaleName()  //en: English, zh: Chinese
      .then(locale => {
        if(locale.value.toUpperCase().startsWith('ZH')) {
          this.translator.setDefaultLang('cn');
        }
        this.setNetWorkStatusChangeNotification();
      })
      .catch(e => {
        console.log(e);
        this.setNetWorkStatusChangeNotification();
      })
      ;
      // 检验微信安装
      // Wechat.isInstalled(function (installed) {
      //   console.log("Wechat installed: " + (installed ? "Yes" : "No"));
      // }, function (reason) {
      //   console.log("Failed: " + reason);
      // });
    });
  }

  openPage(page: PageInterface) {
    // // Reset the content nav to have just this page
    // // we wouldn't want the back button to show in this scenario
    // this.nav.setRoot(page.component);

    let params = {};

    // the nav component was found using @ViewChild(Nav)
    // setRoot on the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    if (page.index) {
      params = { tabIndex: page.index };
    }

    // If we are already on tabs just change the selected tab
    // don't setRoot again, this maintains the history stack of the
    // tabs even if changing them from the menu
    if (this.nav.getActiveChildNav() && page.index != undefined) {
      this.nav.getActiveChildNav().select(page.index);
      // Set the root of the nav with params if it's a tab index
    } else {
      this.nav.setRoot(page.component).catch((err: any) => {
        console.log(`Didn't set nav root: ${err}`);
      });
    }
  }

  openDialog(page: PageInterface){
    let diaglogModal = this.modalCtrl.create
      (page.component);
    diaglogModal.onDidDismiss(() => {
      
    })
    diaglogModal.present();
    return;
  }

  setNetWorkStatusChangeNotification(){
    this.network.onDisconnect().subscribe(() => {
      this.toastCtrl.create({
        message:  this.translator.instant("NETWORK_DISCONNECTED"),
        duration: 2000,
        position: 'middle',
      }).present(); 
    });
    
    this.network.onConnect().subscribe(() => {
      this.toastCtrl.create({
        message: this.translator.instant("NETWORK_RECONNECTED"),
        position: 'middle',
        duration: 1000
      }).present();
    });  
  }

  isActive(page: PageInterface) {
    let childNav = this.nav.getActiveChildNav();

    // Tabs are a special case because they have their own navigation
    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return 'primary';
      }
      return;
    }

    if (this.nav.getActive() && this.nav.getActive().name === page.name) {
      return 'primary';
    }
    return;
  }
}
