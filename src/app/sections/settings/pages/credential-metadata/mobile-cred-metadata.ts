import { Component, OnInit } from '@angular/core';
import { EnvironmentFacadeService, EnvironmentType } from '@core/facades/environment/environment.facade.service';
import { ModalController } from '@ionic/angular';
import { DeviceState } from '@shared/ui-components/mobile-credentials/model/shared/mobile-credential-manager';
import { MobileCredentialFacade } from '@shared/ui-components/mobile-credentials/service/mobile-credential-facade.service';


@Component({
  selector: 'st-mobile-credential',
  templateUrl: './mobile-credential.component.html',
  styleUrls: ['./mobile-credential.component.scss'],
})
export class MobileCredentialMetadata implements OnInit {
  deviceState: any = {};
  
  constructor(
    public readonly mobileCredentialFacade: MobileCredentialFacade,
    private readonly modalController: ModalController,
  ) {}

  ngOnInit(): void {
    (async ()=>{
      this.deviceState = await this.mobileCredentialFacade.deviceState$;
    })();
  }

  close() {
    this.modalController.dismiss();
  }
}

