import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { LOCAL_ROUTING } from '../../ordering.config';
import { NAVIGATE } from '../../../../app.global';

@Component({
  selector: 'st-menu-ordering',
  templateUrl: './menu-ordering.component.html',
  styleUrls: ['./menu-ordering.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuOrderingComponent {

  localRouting = LOCAL_ROUTING;

  constructor(private readonly router: Router) { }

  goToPage(pageRoute: string) {
    this.router.navigate([NAVIGATE.ordering, pageRoute], { skipLocationChange: true });
  }
}
