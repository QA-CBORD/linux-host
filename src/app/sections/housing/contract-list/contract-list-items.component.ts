import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ContractSummary } from '@sections/housing/contract-list/contractSummary.model';
import { ContractListStateService } from '@sections/housing/contract-list/contract-list-state.service';
import { monthDayYear, hourMinTime } from '@shared/constants/dateFormats.constant'

@Component({
  selector: 'st-contract-list-items',
  templateUrl: './contract-list-items.component.html',
  styleUrls: ['./contract-list-items.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContractListItemsComponent implements AfterViewInit {
  status = {
    COMPLETED: "COMPLETED"
  }
  @ViewChild('container') divContainer: ElementRef;
  @Input() contractSummaries: ContractSummary[];
  dateFormat = monthDayYear;
  timeFormat = hourMinTime;

  ngAfterViewInit() {
    if (this.contractSummaries.length > 0) this.divContainer.nativeElement.click();
  }

  constructor(public roomsStateService: ContractListStateService) {}
}
