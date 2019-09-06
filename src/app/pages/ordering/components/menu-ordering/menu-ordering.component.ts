import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { NAVIGATE } from 'src/app/app.global';
import { LOCAL_ROUTING } from '../../ordering.config';

@Component({
  selector: 'st-menu-ordering',
  templateUrl: './menu-ordering.component.html',
  styleUrls: ['./menu-ordering.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuOrderingComponent implements OnInit {
  constructor(private readonly router: Router) {}

  ngOnInit() {}

  async openModalPage(titlePage) {
    this.router.navigate([`${NAVIGATE.ordering}/${LOCAL_ROUTING.ordersInfo}/test`], {
      queryParams: { page: titlePage },
      skipLocationChange: true,
    });
  }
}
