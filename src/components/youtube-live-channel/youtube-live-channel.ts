import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'youtube-live-channel',
  templateUrl: 'youtube-live-channel.html'
})
export class YoutubeLiveChannelComponent {
  youtubeLiveUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer,
    private viewCtrl: ViewController) {
    this.youtubeLiveUrl = this.sanitizer.
      bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/KW4knP-oheo?rel=0&amp;autoplay=1");
  }

  cancel() {
    this.viewCtrl.dismiss();
  }
}
