import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonButton } from '@ionic/angular/standalone';
import { Observable } from 'rxjs';
import { PhotoType } from '../../services/photo-upload.service';
import { LocalPhotoStatus } from '../photo-upload.component';
import { AsyncPipe, NgClass, NgStyle } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'st-photo-upload-image-container',
  standalone: true,
  imports: [IonButton, NgClass, NgStyle, AsyncPipe, TranslateModule],
  templateUrl: './photo-upload-image-container.component.html',
  styleUrl: './photo-upload-image-container.component.scss',
})
export class PhotoUploadImageContainerComponent {
  @Input() set photoStatus(localPhotoStatus: LocalPhotoStatus) {
    this.displayReuploadButton = [LocalPhotoStatus.REJECTED, LocalPhotoStatus.PENDING, LocalPhotoStatus.NEW].includes(
      localPhotoStatus
    );
    this.displayDeleteButton = localPhotoStatus === LocalPhotoStatus.PENDING;
    this.photoPendingReview = [LocalPhotoStatus.NEW, LocalPhotoStatus.PENDING].includes(localPhotoStatus);
    this.photoStatusText = LocalPhotoStatus[localPhotoStatus];
  }
  @Input() photoUrl$: Observable<string>;
  @Input() photoLabel: string;
  @Input() photoAlt: string;
  @Input() photoDimensions: { width: number; height: number };
  @Input() fitCover: boolean;
  @Input() photoType: PhotoType;
  @Input() defaultPhotoSrc: string;
  @Input() defaultPhotoAlt: string;

  @Output() photoTypeSelected = new EventEmitter<PhotoType>();
  @Output() photoDeleted = new EventEmitter<void>();

  photoStatusText = '';
  photoPendingReview = false;
  displayReuploadButton = false;
  displayDeleteButton = false;
  presentPhotoTypeSelection(type: PhotoType) {
    this.photoTypeSelected.emit(type);
  }

  deletePhoto() {
    this.photoDeleted.emit();
  }
}
