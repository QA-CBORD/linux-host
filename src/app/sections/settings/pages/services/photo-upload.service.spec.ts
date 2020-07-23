import { TestBed } from '@angular/core/testing';

import { PhotoUploadService } from './photo-upload.service';

describe('PhotoUploadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PhotoUploadService = TestBed.get(PhotoUploadService);
    expect(service).toBeTruthy();
  });
});
