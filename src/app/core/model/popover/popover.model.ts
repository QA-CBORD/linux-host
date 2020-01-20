import { PopupTypes } from '@sections/rewards/rewards.config';
import { PopupButton } from '../button';

export interface PopoverConfig {
  type: string | keyof PopupTypes;
  title: string;
  message: string | { [key: string]: string };
  buttons: PopupButton[];
  code?: string;
  validityTime?: number;
  closeBtn?: boolean;
}
