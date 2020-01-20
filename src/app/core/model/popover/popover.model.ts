import { PopupTypes } from '@sections/rewards/rewards.config';
import { PopupButton } from '../button';

export interface PopoverConfig {
  type: string | keyof PopupTypes;
  title: string;
  message: string | Message | DonationInfo;
  buttons: PopupButton[];
  code?: string;
  validityTime?: number;
  closeBtn?: boolean;
}
export interface Message {
  title: string;
  description: string;
}
export interface DonationInfo {
  account: Account;
  amount: number;
}
