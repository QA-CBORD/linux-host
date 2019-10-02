import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { ApplicationsService } from './applications.service';

import { ApplicationsStateService } from './applications-state.service';

@Component({
  selector: 'st-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationsComponent implements OnInit {
  constructor(
    private _applicationsService: ApplicationsService,
    public applicationsStateService: ApplicationsStateService
  ) {}

  ngOnInit() {
    this._applicationsService.getPatronApplications().subscribe();
  }
}
