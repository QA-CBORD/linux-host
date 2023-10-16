import { Ionic$ } from 'tests/helpers';
import Page from '../page';

class UpdatePhotoPage extends Page {
  get Title() {
    return Ionic$.$('/html/body/app-root/ion-app/ion-router-outlet/st-sections/ion-router-outlet/st-photo-upload/st-header/ion-header/ion-toolbar/ion-title');
  }
}

export default new UpdatePhotoPage();
