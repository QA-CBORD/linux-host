import { TestBed } from '@angular/core/testing';

import { PhotoCropModalService } from './photo-crop.service';

describe('PhotoCropService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PhotoCropModalService = TestBed.get(PhotoCropModalService);
    expect(service).toBeTruthy();
  });
});
