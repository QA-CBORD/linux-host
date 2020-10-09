import { Component, OnInit } from '@angular/core';
import { UserFacadeService } from '@core/facades/user/user.facade.service';

@Component({
  selector: 'st-report-card',
  templateUrl: './report-card.component.html',
  styleUrls: ['./report-card.component.scss'],
})
export class ReportCardComponent implements OnInit {
  statusText: string = 'Lost';
  notLost: boolean;

  constructor(private readonly userFacadeService: UserFacadeService) {}

  ngOnInit() {
    this.userFacadeService
      .getUser$()
      .toPromise()
      .then(user => {});
  }
  toggleStatus() {}
}
