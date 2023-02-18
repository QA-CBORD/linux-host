import { PinAction } from '@core/service/identity/model.identity';

export interface PinLoginProps {
  navigateBackOnClose: boolean;
  showDismiss: boolean;
  pinAction: PinAction;
}
