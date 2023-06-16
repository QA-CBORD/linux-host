import { TestBed } from '@angular/core/testing';
import { Attachment } from './attachments.model';
import { AttachmentsDetail } from './attachments.model';
import { ImageData } from './attachments.model';
import { AttachmentStateService } from './attachments-state.service';
import { BehaviorSubject } from 'rxjs';

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
      const attachmentsDetailBehaviorStub = new BehaviorSubject<AttachmentsDetail>({} as AttachmentsDetail);
      spyOn(attachmentsDetailBehaviorStub, 'next').and.callThrough();
      service.setAttachmentDetails(attachmentsDetailStub);
      expect(attachmentsDetailBehaviorStub.next).toHaveBeenCalled();
    });
  });
});
