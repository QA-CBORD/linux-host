import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';

import { TileWrapperConfig } from '@sections/dashboard/models';
import { Router } from '@angular/router';

@Component({
  selector: 'st-tile-wrapper',
  templateUrl: './tile-wrapper.component.html',
  styleUrls: ['./tile-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TileWrapperComponent {
  @Input() wrapperConfig: TileWrapperConfig;

  constructor(private readonly router: Router) {}

  navigateTo(path) {
    this.router.navigate([path]);
  }
}
