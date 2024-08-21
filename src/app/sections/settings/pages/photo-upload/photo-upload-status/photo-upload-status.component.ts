import { Component, Input } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { StAlertBannerComponent } from '@shared/ui-components';
import { LocalPhotoStatus } from '../photo-upload.component';

@Component({
  selector: 'st-photo-upload-status',
  standalone: true,
  imports: [IonIcon, TranslateModule, StAlertBannerComponent],
  templateUrl: './photo-upload-status.component.html',
  styleUrl: './photo-upload-status.component.scss',
})
export class PhotoUploadStatusComponent {
  @Input() photoStatus: LocalPhotoStatus;
  @Input() set statusReason(statusReason: string) {
    this.statusReasonText = ` ${statusReason}.`;
  }

  statusReasonText = '';

  get photoStatusValues() {
    return LocalPhotoStatus;
  }
}
