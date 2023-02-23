import { Attachment, AttachmentsDetail } from './attachments.model';

export function generateWorkOrder(_, index: number) {
  return {
    id: index,
  };
}

export function generateAttachments(amount = 3): Attachment {
  // eslint-disable-next-line prefer-spread
  return Array.apply(null, Array(amount)).map(generateWorkOrder);
}

export function generateAttachmentsDetails(amount=3): AttachmentsDetail {
  // eslint-disable-next-line prefer-spread
  return Array.apply(null, Array(amount)).map(generateWorkOrder);
}
