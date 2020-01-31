import { Component, ChangeDetectionStrategy } from '@angular/core';

import { TogglerDirective } from '../toggler/toggler.directive';

@Component({
  selector: 'st-show-more',
  templateUrl: './show-more.component.html',
  styleUrls: ['./show-more.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowMoreComponent extends TogglerDirective {}
