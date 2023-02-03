


import {  Ionic$ } from '../helpers';
import Page from './page';

class HelpPage extends Page {

    get helpAboutGet(){
        return Ionic$.$('//body/app-root/ion-app/ion-modal/st-html-renderer/ion-content');
    }
    get helpCopyright(){
        return Ionic$.$('//*[@id="ion-overlay-11"]/st-html-renderer/ion-content/p/text()[7]');
    }

}

export default new HelpPage();

