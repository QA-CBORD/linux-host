import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit
} from '@angular/core';
import { ORDERING_CONTENT_STRINGS } from '@sections/ordering/ordering.config';
import { OrderingComponentContentStrings, OrderingService } from '@sections/ordering/services/ordering.service';
import { APP_ROUTES } from '@sections/section.config';
import { AccessibilityService } from '@shared/accessibility/services/accessibility.service';
import { NavigationService } from '@shared/services/navigation.service';
import { Observable } from 'rxjs';
import { NonCheckingSummary } from '../../models/success-summary.model';
import { NonCheckingService } from '../../services/non-checking.service';

@Component({
  selector: 'st-non-checking-success',
  templateUrl: './non-checking-success.component.html',
  styleUrls: ['./non-checking-success.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NonCheckingSuccessComponent implements OnInit, AfterViewInit {
  summary$: Observable<NonCheckingSummary>;
  contentStrings: OrderingComponentContentStrings = <OrderingComponentContentStrings>{};

  constructor(
    private readonly routingService: NavigationService,
    private readonly orderingService: OrderingService,
    private readonly nonCheckingService: NonCheckingService,
    private readonly accessibilityService: AccessibilityService
  ) {
    this.summary$ = this.nonCheckingService.summary$;
  }

  ngOnInit() {
    this.initContentStrings();
  }

  focusTitle() {
    this.accessibilityService.focusElementById('modal-mainTitle');
  }

  ngAfterViewInit(): void {
    this.focusTitle();
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
