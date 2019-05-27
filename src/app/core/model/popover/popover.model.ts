import { PopupTypes } from '../../../pages/rewards/rewards.config';

export interface popoverConfig {
  type: string | keyof PopupTypes;
  title: string;
  message: string | {};
  buttons: any[];
  code?: string;
  validityTime?: number;
  closeBtn?: boolean;
}
