import { PopupTypes } from '@sections/rewards/rewards.config';
import { PopupButton } from '../button';

export interface PopoverConfig<T> {
  type: string | keyof PopupTypes;
  title: string;
  message: string | { [key: string]: T };
  buttons: PopupButton[];
  code?: string;
  validityTime?: number;
  closeBtn?: boolean;
}
