import { PopupTypes } from '../../../pages/rewards/rewards.config';

export interface popoverConfig {
  type: string | keyof PopupTypes;
  title: string;
  message: string | Message;
  buttons: any[];
  code?: string;
  validityTime?: number;
  closeBtn?: boolean;
}
export interface Message {
  title: string;
  description: string;
}
