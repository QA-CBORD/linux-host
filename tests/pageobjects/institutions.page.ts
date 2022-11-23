import {  Ionic$, IonicButton } from '../helpers';

import Page from './page';

class Institutions extends Page {
  get institutionPageTitle() {
    return Ionic$.$('.institutions-header__title');
  }
}

export default new Institutions();
