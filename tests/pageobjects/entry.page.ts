import { IonicEnvAlert } from 'tests/helpers/ionic/components/envAlert';
import {  IonicButton } from '../helpers';

import Page from './page';

class Entry extends Page {
  get searchInstitutionsButton() {
    return new IonicButton('.entry__buttons');
  }
  get changeEnvButton() {
    return new IonicButton('#changeEnv');
  }
  get changeEnvAlert() {
    return new IonicEnvAlert();
  }
}

export default new Entry();
