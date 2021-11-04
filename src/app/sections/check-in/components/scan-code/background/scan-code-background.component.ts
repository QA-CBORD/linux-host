import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GlobalNavService } from '@shared/ui-components/st-global-navigation/services/global-nav.service';

@Component({
  templateUrl: './scan-code-background.component.html',
  styleUrls: ['./scan-code-background.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ScanCodeBackground {
  constructor(private readonly globalNav: GlobalNavService) {}

  ionViewWillEnter() {
    this.globalNav.hideNavBar();
  }
}
