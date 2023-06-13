import { TestBed } from '@angular/core/testing';
import { Attachment } from './attachments.model';
import { AttachmentsDetail } from './attachments.model';
import { ImageData } from './attachments.model';
import { AttachmentStateService } from './attachments-state.service';

describe('AttachmentStateService', () => {
  let service: AttachmentStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [AttachmentStateService] });
    service = TestBed.inject(AttachmentStateService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('setAttachmentDetails', () => {
    it('makes expected calls', () => {
      const attachmentsDetailStub: AttachmentsDetail = <any>{};
      spyOn(attachmentsDetailStub, 'next').and.callThrough();
      service.setAttachmentDetails(attachmentsDetailStub);
      expect(attachmentsDetailStub.next).toHaveBeenCalled();
    });
  });
});
