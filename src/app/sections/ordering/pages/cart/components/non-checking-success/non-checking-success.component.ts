import { ChangeDetectionStrategy, Component, OnInit, AfterViewChecked, AfterViewInit, AfterContentChecked } from '@angular/core';
import { OrderingComponentContentStrings, OrderingService } from '@sections/ordering/services/ordering.service';
import { ORDERING_CONTENT_STRINGS } from '@sections/ordering/ordering.config';
import { NavigationService } from '@shared/services/navigation.service';
import { APP_ROUTES } from '@sections/section.config';
import { NonCheckingSummary } from '../../models/success-summary.model';
import { NonCheckingService } from '../../services/non-checking.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'st-non-checking-success',
  templateUrl: './non-checking-success.component.html',
  styleUrls: ['./non-checking-success.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NonCheckingSuccessComponent implements OnInit, AfterViewChecked, AfterViewInit, AfterContentChecked {
  summary$: Observable<NonCheckingSummary>;
  contentStrings: OrderingComponentContentStrings = <OrderingComponentContentStrings>{};

  constructor(
    private readonly routingService: NavigationService,
    private readonly orderingService: OrderingService,
    private readonly nonCheckingService: NonCheckingService
  ) {
    this.summary$ = this.nonCheckingService.summary$;
  }

  ngOnInit() {
    this.initContentStrings();
  }

  ngAfterContentChecked(): void {
    document.getElementById('modal-mainTitle')?.focus();
  }
  ngAfterViewChecked(): void {
    document.getElementById('modal-mainTitle')?.focus();
  }

  ngAfterViewInit(): void {
    document.getElementById('modal-mainTitle')?.focus();
  }

  onClosed() {
    this.routingService.navigate([APP_ROUTES.ordering]);
  }

  private initContentStrings() {
    this.contentStrings.buttonDone = this.orderingService.getContentStringByName(ORDERING_CONTENT_STRINGS.buttonDone);
    this.contentStrings.labelOrder = this.orderingService.getContentStringByName(ORDERING_CONTENT_STRINGS.labelOrder);
    this.contentStrings.labelOrderPlacedTitle = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.labelOrderPlacedTitle
    );
    this.contentStrings.labelOrderPlacedDescription = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.labelOrderPlacedDescription
    );
  }
}
