import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contractview',
  templateUrl: './contractview.page.html',
  styleUrls: ['./contractview.page.scss'],
})
export class ContractviewPage implements OnInit {

  contractId = null;
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.contractId = this.activatedRoute.snapshot.paramMap.get('contractId');
  }

}
