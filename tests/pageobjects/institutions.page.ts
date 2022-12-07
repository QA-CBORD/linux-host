import {  Ionic$ } from '../helpers';

import Page from './page';

class Institutions extends Page {
  get institutionPageTitle() {
    return Ionic$.$('.institutions-header__title');
  }
  get searchInstitutionSearchInput() {
    return Ionic$.$('//body/app-root/ion-app/ion-router-outlet/st-institutions/ion-header/ion-toolbar[2]/ion-searchbar/div/input');
  }
  get institutionItem() {
    return Ionic$.$('//body/app-root/ion-app/ion-router-outlet/st-institutions/ion-content/ion-list/div/ion-item');
  }
}

export default new Institutions();
