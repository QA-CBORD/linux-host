import { Component, Input, OnInit } from '@angular/core';
import { AbstractAndroidCredentialManager } from './model/android/abstract-android-credential.management';
import { GlobalNavService } from '../st-global-navigation/services/global-nav.service';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'st-mobile-credentials',
  templateUrl: './mobile-credentials.component.html',
  styleUrls: ['./mobile-credentials.component.scss'],
})
export class MobileCredentialsComponent implements OnInit {
  @Input() credentialManager: AbstractAndroidCredentialManager;
  @Input() title: string = 'Terms and Conditions';
  @Input() termsAndConditions$: Promise<string>;
  @Input() hidSdkStatus: Promise<any>;
  @Input() credentialUsageContentString$: Promise<string>;
  @Input() btnText: string;
  
  constructor(private globalNav: GlobalNavService, private popoverCtrl: PopoverController) {}

  ngOnInit() {
   if(this.hidSdkStatus){
      this.hidSdkStatus.then((result =>{
        console.log('hidSdkStatus : ', result);
      }))
    }
    setTimeout(() => {
      if(this.termsAndConditions$){
        this.globalNav.hideNavBar()
      }
    })
  }

  onAccept(): void {
    this.credentialManager.onTermsAndConditionsAccepted();
  }

  onDecline(): void {
    if(this.termsAndConditions$){
      this.credentialManager.onTermsAndConditionsDeclined();
    } else{
      this.popoverCtrl.dismiss();
    }
  }

  ngOnDestroy(): void {
    this.globalNav.showNavBar();
  }

  onButtonClicked():void{
    this.credentialManager.onDeleteCredential(this.btnText);
  }

}
