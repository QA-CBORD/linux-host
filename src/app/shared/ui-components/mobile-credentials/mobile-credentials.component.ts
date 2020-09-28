import { Component, Input, OnInit } from '@angular/core';
import { MobileCredential } from '@core/service/payments-api/model/credential-utils';

@Component({
  selector: 'st-mobile-credentials',
  templateUrl: './mobile-credentials.component.html',
  styleUrls: ['./mobile-credentials.component.scss'],
})
export class MobileCredentialsComponent implements OnInit {

  @Input() data: MobileCredential;

  constructor() { }

  ngOnInit() {
    console.log("input data: ", this.data);
  }

}
