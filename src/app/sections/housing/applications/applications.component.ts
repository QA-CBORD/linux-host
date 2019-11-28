import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

import { ApplicationsService } from './applications.service';

import { Application } from './applications.model';

@Component({
  selector: 'st-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationsComponent implements OnInit {
  applications$: Observable<Application[]>;

  constructor(private _applicationsService: ApplicationsService) {}

  ngOnInit(): void {
    this.applications$ = this._applicationsService.getApplications();
  }

  handleClear(applicationId: number): void {
    this._applicationsService.clearApplication(applicationId);
  }
}
