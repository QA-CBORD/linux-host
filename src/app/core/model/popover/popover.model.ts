import { PopupTypes } from '../../../pages/rewards/rewards.config';
import { PopupButton } from '../button';

export interface popoverConfig {
  type: string | keyof PopupTypes;
  title: string;
  message: string | Message;
  buttons: PopupButton[];
  code?: string;
  validityTime?: number;
  closeBtn?: boolean;
}
export interface Message {
  title: string;
  description: string;
}
