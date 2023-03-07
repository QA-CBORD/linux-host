import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ModalsService } from '@core/service/modals/modals.service';
import { DateUtilObject, getUniquePeriodName } from '@sections/accounts/shared/ui-components/filter/date-util';

@Component({
  selector: 'st-order-filters.action-sheet',
  templateUrl: './order-filters.action-sheet.component.html',
  styleUrls: ['./order-filters.action-sheet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderFiltersActionSheetComponent {
  @Input() statuses: string[];
  @Input() periods: DateUtilObject[];
  @Input() selectedPeriod: DateUtilObject;
  @Input() selectedStatus: string;

  constructor(private readonly modalService: ModalsService) {}

  onSubmit() {
    this.modalService.dismiss({
      period: this.selectedPeriod,
      status: this.selectedStatus,
    });
  }

  close() {
    this.modalService.dismiss();
  }

  statusTypeOnChange(status: string) {
    this.selectedStatus = status;
  }

  periodTypeOnChange(period: DateUtilObject) {
    this.selectedPeriod = period;
  }

  trackPeriod(i: number, period: DateUtilObject): string {
    return getUniquePeriodName(period);
  }
}
