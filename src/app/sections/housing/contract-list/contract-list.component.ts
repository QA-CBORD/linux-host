import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { ContractListStateService } from './contract-list-state.service';



@Component({
  selector: 'st-contract-list',
  templateUrl: './contract-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./contract-list.component.scss'],
})
export class ContractListComponent implements OnInit {

  constructor(
    public contractListStateService: ContractListStateService
  ) {}

  ngOnInit() {
  }
}