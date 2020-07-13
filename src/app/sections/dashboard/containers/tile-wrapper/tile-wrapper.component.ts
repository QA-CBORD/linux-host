import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { TileWrapperConfig } from '@sections/dashboard/models';

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
    this.router.navigate([path]);
  }
}
