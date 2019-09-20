import { Component } from '@angular/core';

import { ContractlistService } from '../../services/contractlist.service';

@Component({
  selector: 'st-housing-dashboard',
  templateUrl: './housing-dashboard.page.html',
  styleUrls: ['./housing-dashboard.page.scss'],
})
export class HousingDashboardPage {
  // contractsList: Contracts[] = []
  constructor(private contractServ: ContractlistService) {}

  ngOnInit() {
    // this.contractsList = this.contractServ.GetContractsFromRescenter(1);
  }




}
