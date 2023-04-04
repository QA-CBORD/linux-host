import { IonicEnvAlert } from 'tests/helpers/ionic/components/envAlert';
import {  Ionic$, IonicButton } from '../helpers';

import Page from './page';

class Entry extends Page {
  get searchInstitutionsButton() {
    return new IonicButton('.entry__buttons');
  }
  get changeEnvButton() {
    return Ionic$.$('/html/body/app-root/ion-app/ion-router-outlet/st-entry/ion-content/ion-button');
  }
  get changeEnvAlert() {
    return new IonicEnvAlert();
  }
}

export default new Entry();

