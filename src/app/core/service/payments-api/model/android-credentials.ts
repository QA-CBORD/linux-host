import { ModalController } from '@ionic/angular';
import { MobileCredentialsComponent } from '@shared/ui-components/mobile-credentials/mobile-credentials.component';
import { CredentialStateInterface, MobileCredential } from './credential-utils';

export abstract class AndroidCredential implements MobileCredential {
  protected id: string;
  private state: CredentialStateInterface;

  constructor(state: CredentialStateInterface) {
    this.state = state;
  }


  statusMsg(): string {
    return this.state.statusMsg();
  }
  isProvisioned(): boolean {
    return this.state.canProvision();
  }
  isEnabled(): boolean {
    return this.state.isEnabled();
  }
  canProvision(): boolean {
    return this.state.canProvision();
  }

  issuer(): string {
    return this.state.issuer();
  }

  abstract getId(): string;

  async showModal(controller: ModalController) : Promise<any>{
    let componentProps = { data : this };
    const credentialModal = await controller.create({
      backdropDismiss: true,
      component: MobileCredentialsComponent,
       componentProps,
    });
    await credentialModal.present();
    return await credentialModal.onDidDismiss();
  }
  
}
