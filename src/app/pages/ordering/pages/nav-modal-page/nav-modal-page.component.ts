import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NAV_ORDERS_PAGES, OrderPageNames } from './nav-modal.config';
import { NAVIGATE } from 'src/app/app.global';
import { take } from 'rxjs/operators';

@Component({
  selector: 'st-nav-modal-page',
  templateUrl: './nav-modal-page.component.html',
  styleUrls: ['./nav-modal-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavModalPage implements OnInit {
  orderPageNames = OrderPageNames; // so it can be accesed in the template
  title: OrderPageNames;
  pageName:OrderPageNames;

  constructor(private readonly activatedRoute: ActivatedRoute,
              private readonly router: Router) {}

  ngOnInit() {
    // console.log(this.activatedRoute.data);
    this.activatedRoute.params.pipe(take(1)).subscribe(data => {
      this.title = NAV_ORDERS_PAGES[data.destinationPage].title;
      this.pageName = data.destinationPage as OrderPageNames;
    });
  }

  onModalClose() {
    this.router.navigate([`${NAVIGATE.ordering}`], { skipLocationChange: true });
  }
}
