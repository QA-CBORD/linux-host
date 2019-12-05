import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

import { ApplicationsService } from './applications.service';

import { ApplicationDetails } from './applications.model';
import { ApplicationsStateService } from './applications-state.service';

@Component({
  selector: 'st-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationsComponent implements OnInit {
  applications$: Observable<ApplicationDetails[]>;

  constructor(
    private _applicationsService: ApplicationsService,
    private _applicationsStateService: ApplicationsStateService
  ) {}

  ngOnInit(): void {
    this.applications$ = this._applicationsStateService.applications$;

    this._applicationsService.getApplications().subscribe();
  }

  handleClear(applicationKey: number): void {
    this._applicationsService.clearApplication(applicationKey);
  }
}
