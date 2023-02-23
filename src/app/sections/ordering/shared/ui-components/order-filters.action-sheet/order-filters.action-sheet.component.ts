import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ModalsService } from '@core/service/modals/modals.service';
import {
  ORDERS_PERIOD_LABEL,
  ORDERS_PERIOD,
  ORDERING_STATUS_BY_LABEL,
} from '@sections/ordering/shared/ui-components/recent-oders-list/recent-orders-list-item/recent-orders.config';

@Component({
  selector: 'st-order-filters.action-sheet',
  templateUrl: './order-filters.action-sheet.component.html',
  styleUrls: ['./order-filters.action-sheet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderFiltersActionSheetComponent {
  @Input() selectedPeriod: number;
  @Input() selectedStatus: string;

  timePeriod = ORDERS_PERIOD;
  timePeriodLabel = ORDERS_PERIOD_LABEL;
  statusLabel = ORDERING_STATUS_BY_LABEL;

  constructor(private readonly modalService: ModalsService) {}

  reset() {
    this.selectedPeriod = null;
    this.selectedStatus = null;
  }

  onSubmit() {
    this.modalService.dismiss({
      period: this.selectedPeriod,
      status: this.selectedStatus,
    });
  }

  close() {
    this.modalService.dismiss();
  }

  statusTypeOnChange({ target }) {
    this.selectedStatus = target.value;
  }

  periodTypeOnChange({ target }) {
    this.selectedPeriod = target.value;
  }
}
