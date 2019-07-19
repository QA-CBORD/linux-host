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

  constructor(private readonly accountsService: AccountsService) {}

  ngOnInit() {}

  setTimeRange() {
    const now = new Date();
  }
}
