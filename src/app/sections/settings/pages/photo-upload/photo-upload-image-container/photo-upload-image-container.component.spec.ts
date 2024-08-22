import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoUploadImageContainerComponent } from './photo-upload-image-container.component';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';

describe('PhotoUploadImageContainerComponent', () => {
  let component: PhotoUploadImageContainerComponent;
  let fixture: ComponentFixture<PhotoUploadImageContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoUploadImageContainerComponent],
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

    fixture = TestBed.createComponent(PhotoUploadImageContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
