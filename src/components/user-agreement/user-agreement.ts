import { Component } from '@angular/core';

import { ViewController } from 'ionic-angular';

@Component({
  selector: 'user-agreement',
  templateUrl: 'user-agreement.html'
})
export class UserAgreementComponent {
  constructor(public viewCtrl: ViewController,) {
  }

  cancel() {
    this.viewCtrl.dismiss();
  }  
}
