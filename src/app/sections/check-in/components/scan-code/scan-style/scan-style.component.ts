import { Component } from '@angular/core';
import { GlobalNavService } from '@shared/ui-components/st-global-navigation/services/global-nav.service';

@Component({
  templateUrl: './scan-style.component.html',
  styleUrls: ['./scan-style.component.scss'],
})
export class ScanStyleComponent {
  constructor(private readonly globalNav: GlobalNavService) {}

  ionViewWillEnter() {
    this.globalNav.hideNavBar();
  }
}
