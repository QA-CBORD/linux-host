import { Component } from '@angular/core';

import { ContractsService } from '../../contracts/contracts.service';

@Component({
  selector: 'st-housing-dashboard',
  templateUrl: './housing-dashboard.page.html',
  styleUrls: ['./housing-dashboard.page.scss'],
})
export class HousingDashboardPage {
  // contractsList: Contracts[] = []
  constructor(private contractServ: ContractsService) {}

  ngOnInit() {
    // this.contractsList = this.contractServ.GetContractsFromRescenter(1);
  }
}
