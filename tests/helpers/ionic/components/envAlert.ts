import { IonicComponent } from './component';

export class IonicEnvAlert extends IonicComponent {
  constructor(selector?: string | WebdriverIO.Element) {
    super(selector ?? 'ion-alert');
  }

   getOpt(buttonTitle:string) {
    return $(this.selector).$(`button=${buttonTitle}`);
  }

  button(buttonTitle:string) {
    return $(this.selector).$(`button=${buttonTitle}`);
  }
}
