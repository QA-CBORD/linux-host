import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoUploadStatusComponent } from './photo-upload-status.component';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { EventEmitter } from '@angular/core';
import { LocalPhotoStatus } from '../photo-upload.component';

describe('PhotoUploadStatusComponent', () => {
  let component: PhotoUploadStatusComponent;
  let fixture: ComponentFixture<PhotoUploadStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoUploadStatusComponent],
      providers: [
        {
          provide: TranslateService,
          useValue: {
            get: jest.fn().mockReturnValue(of('some message')),
            onLangChange: of(),
            onTranslationChange: of(),
            onDefaultLangChange: of(),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoUploadStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set photoStatus input', () => {
    component.photoStatus = LocalPhotoStatus.ACCEPTED;
    expect(component.photoStatus).toBe(LocalPhotoStatus.ACCEPTED);
  });

  it('should set statusReason and update statusReasonText', () => {
    component.statusReason = 'Rejected photo';
    expect(component.statusReasonText).toBe(' Rejected photo.');
  });
});
