import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { TileWrapperConfig } from '@sections/dashboard/models';
import { PATRON_BACK_TEXT } from 'src/app/app.global';
import { NavigationState } from '@sections/dashboard/models/navigation-state.model';
import { ToastService } from '@core/service/toast/toast.service';

@Component({
  selector: 'st-tile-wrapper',
  templateUrl: './tile-wrapper.component.html',
  styleUrls: ['./tile-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TileWrapperComponent {
  @Input() wrapperConfig: TileWrapperConfig;

  constructor(private readonly router: Router, private readonly toastService: ToastService) {}

  async navigateTo(path) {
    if (this.wrapperConfig.stopNavigation) {
      await this.toastService.showError(this.wrapperConfig.stopNavigationMessage);
      return;
    }

    const navState: NavigationState = { backButtonText: PATRON_BACK_TEXT[this.router.url] };
    this.router.navigate([path], { state: navState });
  }
}
