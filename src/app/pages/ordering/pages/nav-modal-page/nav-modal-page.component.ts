import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NAV_ORDERS_PAGES } from './nav-modal.config';
import { NAVIGATE } from 'src/app/app.global';

@Component({
  selector: 'st-nav-modal-page',
  templateUrl: './nav-modal-page.component.html',
  styleUrls: ['./nav-modal-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavModalPage implements OnInit {
  title: string;

  constructor(private readonly activatedRoute: ActivatedRoute, private readonly router: Router) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(data => {
      console.log(NAV_ORDERS_PAGES[data.page]);
      this.title = NAV_ORDERS_PAGES[data.page].title;
    });
  }

  onModalClose() {
    this.router.navigate([`${NAVIGATE.ordering}`], { skipLocationChange: true });
  }
}
