import { Component, inject } from '@angular/core';
import { ModalsService } from '@core/service/modals/modals.service';
import { IonicModule } from '@ionic/angular';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MobileCredentialsUnlinkService } from '@shared/ui-components/mobile-credentials/service/mobile-credentials-unlink.service';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';
import { StPopoverLayoutModule } from '@shared/ui-components/st-popover-layout/st-popover-layout.module';
import { ToastService } from '@core/service/toast/toast.service';

@Component({
  standalone: true,
  imports: [IonicModule, StHeaderModule, StPopoverLayoutModule, TranslateModule],
  templateUrl: './unlink-credentials.component.html',
  styleUrls: ['./unlink-credentials.component.scss'],
})
export class UnlinkCredentialsComponent {
  mobileCredentialsUnlinkService = inject(MobileCredentialsUnlinkService);
  modalsService = inject(ModalsService);
  private readonly translateService = inject(TranslateService);
  private readonly toastService = inject(ToastService);

  unlink = async () => {
    const unlinked = await this.mobileCredentialsUnlinkService.unlinkCredentials();
    if (unlinked) {
      this.toastService.showSuccessToast({
        message: this.translateService.instant('patron-ui.mobile-credential.unlinked_credentials_text'),
        position: 'bottom',
      });
      this.modalsService.dismiss();
      return;
    }

    this.toastService.showError(
      this.translateService.instant('patron-ui.mobile-credential.unlink_credentials_error'),
      4000,
      'bottom'
    );
  };
}
