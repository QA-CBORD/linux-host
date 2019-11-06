import { Component, OnInit } from '@angular/core';

import { AccountsService } from '../../services/accounts.service';

@Component({
  selector: 'st-accounts-tile',
  templateUrl: './accounts-tile.component.html',
  styleUrls: ['./accounts-tile.component.scss'],
})
export class AccountsTileComponent implements OnInit {

  constructor(private readonly accountsService: AccountsService) { }

  /// use accounts service to retrieve all data

  ngOnInit() {}

}
