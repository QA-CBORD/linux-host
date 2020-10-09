import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'st-report-card',
  templateUrl: './report-card.component.html',
  styleUrls: ['./report-card.component.scss'],
})
export class ReportCardComponent implements OnInit {
  statusText: string = 'Lost';
  notLost: boolean;

  constructor() {}

  ngOnInit() {}
  toggleStatus() {}
}
