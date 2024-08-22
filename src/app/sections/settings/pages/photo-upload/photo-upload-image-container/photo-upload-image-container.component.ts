import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IonButton } from '@ionic/angular/standalone';
import { Observable } from 'rxjs';
import { LocalPhotoStatus } from '../photo-upload.component';
import { AsyncPipe, NgClass, NgStyle } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { PhotoType } from '../models/photo-upload.enums';
import { PHOTO_UPLOAD_CONFIG, PhotoUploadConfig } from '../models/photo-upload.config';

@Component({
  selector: 'st-photo-upload-image-container',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonButton, NgClass, NgStyle, AsyncPipe, TranslateModule],
  templateUrl: './photo-upload-image-container.component.html',
  styleUrl: './photo-upload-image-container.component.scss',
})
export class PhotoUploadImageContainerComponent {
  @Input() set photoType(photoType: PhotoType) {
    this.photoTypeText = PhotoType[photoType];
    this.photoTypeConfig = PHOTO_UPLOAD_CONFIG[photoType];
    this.photoDimensions = this.photoTypeConfig?.photoDimensions;
  }

  @Input() set photoStatus(localPhotoStatus: LocalPhotoStatus) {
    this.displayReuploadButton = [LocalPhotoStatus.REJECTED, LocalPhotoStatus.PENDING, LocalPhotoStatus.NEW].includes(
      localPhotoStatus
    );
    this.displayDeleteButton = localPhotoStatus === LocalPhotoStatus.PENDING;
    this.photoStatusText = LocalPhotoStatus[localPhotoStatus];
    this.isRejected = localPhotoStatus === LocalPhotoStatus.REJECTED;
  }
  @Input() photoUrl$: Observable<string>;
  @Input() photoDimensions: { width: number; height: number };
  @Input() fitCover: boolean = true;

  @Output() photoTypeSelected = new EventEmitter<void>();
  @Output() photoDeleted = new EventEmitter<void>();

  photoStatusText = '';
  photoTypeText = '';

  isRejected = false;
  displayReuploadButton = false;
  displayDeleteButton = false;
  photoTypeConfig: PhotoUploadConfig = PHOTO_UPLOAD_CONFIG[PhotoType.PROFILE];

  get photoLabelDisplay() {
    return this.isRejected ? 'Rejected Photo' : this.photoTypeConfig?.label;
  }
  get displayUploadButton() {
    return this.photoTypeSelected.observed;
  }

  presentPhotoTypeSelection() {
    this.photoTypeSelected.emit();
  }

  deletePhoto() {
    this.photoDeleted.emit();
  }
}
