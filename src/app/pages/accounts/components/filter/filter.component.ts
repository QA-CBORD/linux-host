import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AccountsService } from '../../services/accounts.service';

@Component({
  selector: 'st-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent implements OnInit {
  accountName: string = 'All accounts';
  timeRange: string = 'Past 6 month';
  availibleMonth: string[];

  constructor(private readonly accountsService: AccountsService) {}

  ngOnInit() {}

  setTimeRange(date?: { month: string; year: string }) {
    const date1 = date
      ? date
      : {
          year: new Date().getFullYear(),
          month: new Date().getMonth(),
        };
  }
}
