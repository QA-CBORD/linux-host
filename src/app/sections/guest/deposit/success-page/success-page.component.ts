import { Component, Input, OnInit } from '@angular/core';
import { DepositSuccessCsModel } from '../model/success-page-cs.model';

@Component({
  selector: 'st-success-page',
  templateUrl: './success-page.component.html',
  styleUrls: ['./success-page.component.scss'],
})
export class SuccessPage implements OnInit {
  @Input() csModel: DepositSuccessCsModel;

  @Input() data: any = {};

  constructor() {}

  ngOnInit() {}
}
