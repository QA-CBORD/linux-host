import { TestBed } from '@angular/core/testing';
import { AttachmentStateService } from './attachments-state.service';

describe('AttachmentStateService', () => {
  let service: AttachmentStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttachmentStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('setAttachment', () => {
    it('should set attachment value', () => {
      const spy = jest.spyOn(service['attachment'], 'next');
      const attachment: any = { canSubmit: true };
      service.setAttachment(attachment);
      expect(spy).toHaveBeenCalledWith(attachment);
    });
  });

  describe('setAttachmentDetails', () => {
    it('should set attachment details', () => {
      const spy = jest.spyOn(service['attachmentDetails'], 'next');
      const attachment: any = { attachmentUrl: "test123" };
      service.setAttachmentDetails(attachment);
      expect(spy).toHaveBeenCalledWith(attachment);
    });
  });

  describe('setAttachmentTypes', () => {
    it('should set attachment types', () => {
      const spy = jest.spyOn(service['attachmentTypes'], 'next');
      const attachment: any = [{ name: "test" }];
      service.setAttachmentTypes(attachment);
      expect(spy).toHaveBeenCalledWith(attachment);
    });
  });

  describe('getSelectedAttachmentTypeName', () => {
    it('should set attachment value', () => {
      const attachment: any = { attachmentTypes: { value: [{ typeKey: 1, name: "test" }] } };
      service.attachmentTypes = attachment.attachmentTypes;
      const result = service.getSelectedAttachmentTypeName(1);
      expect(result).toBe("test");
    });
  });

  describe('setAttachmentImage', () => {
    it('should set attachment image', () => {
      const spy = jest.spyOn(service['attachmentImage'], 'next');
      const attachment: any = { attachmentTypeName: "test" };
      service.setAttachmentImage(attachment);
      expect(spy).toHaveBeenCalledWith(attachment);
    });
  });

  describe('destroyAttachmentImage', () => {
    it('should clear attachment image', () => {
      const spy = jest.spyOn(service['attachmentImage'], 'next');
      service.destroyAttachmentImage();
      expect(spy).toHaveBeenCalledWith(null);
    });
  });

  describe('getAttachmentImage', () => {
    it('should return attachmentFile', () => {
      service.attachmentImage = { value: { attachmentFile: "" } } as any;
      const result = service.getAttachmentImage();
      expect(result).toBe(service.attachmentImage.value.attachmentFile);
    });
  });

  describe('setAttachmentImageBase', () => {
    it('should return attachmentFileBase', () => {
      service.attachmentImage = { value: { attachmentFile: "" } } as any;
      const result = service.setAttachmentImageBase("test");
      expect(service.attachmentImage.value.attachmentFile).toBe("test");
    });
  });

  describe('setAttachmentList', () => {
    it('should set attachment list', () => {
      const spy = jest.spyOn(service['attachmentList'], 'next');
      const attachment: any = [{ attachmentTypeName: "test" }];
      service.setAttachmentList(attachment);
      expect(spy).toHaveBeenCalledWith(attachment);
    });
  });

  describe('getAttachmentList', () => {
    it('should return attachment list', () => {
      const result = service.getAttachmentList();
      expect(result).toBe(service.attachmentList);
    });
  });

  describe('findAttachment', () => {
    it('should return attachment', () => {
      const attachment: any = { attachmentList: { value: [{ attachmentKey: 1, name: "test" }] } };
      service.attachmentList = attachment.attachmentList;
      const result = service.findAttachment(1);
      expect(result).toStrictEqual({ attachmentKey: 1, name: "test" });
    });
  });
});
