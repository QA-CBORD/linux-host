import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { TileWrapperConfig } from '@sections/dashboard/models';
import { PATRON_BACK_TEXT } from 'src/app/app.global';
import { NavigationState } from '@sections/dashboard/models/navigation-state.model';

@Component({
  selector: 'st-tile-wrapper',
  templateUrl: './tile-wrapper.component.html',
  styleUrls: ['./tile-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TileWrapperComponent {
  @Input() wrapperConfig: TileWrapperConfig;

  constructor(private readonly router: Router) {}

  navigateTo(path) {
    const navState: NavigationState = { backButtonText: PATRON_BACK_TEXT[this.router.url] };
    this.router.navigate([path], { state:  navState });
  }
}
