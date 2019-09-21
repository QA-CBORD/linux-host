import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'st-contract-details',
  templateUrl: './contract-details.page.html',
  styleUrls: ['./contract-details.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContractDetailsPage implements OnInit {
  contractId = null;
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.contractId = this.activatedRoute.snapshot.paramMap.get('contractId');
  }
}
