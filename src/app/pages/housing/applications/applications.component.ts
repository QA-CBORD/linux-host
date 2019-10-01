import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

import { ApplicationsService } from './applications.service';

import { Application, PatronApplication } from './applications.model';

@Component({
  selector: 'st-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationsComponent implements OnInit {
  constructor(private _applicationsService: ApplicationsService) {}

  applications$: Observable<PatronApplication[]>;

  ngOnInit() {
    this.applications$ = this._applicationsService.getPatronApplications();
  }

  // isNotPending(application: Application): boolean {
  //   return this.getApplicationStatus(application) !== ApplicationStatus.Pending;
  // }

  // isNotNewAndNotPending(application: Application): boolean {
  //   return this.getApplicationStatus(application) !== ApplicationStatus.New && this.isNotPending(application);
  // }

  trackById(_: number, application: Application): number {
    return application.id;
  }
}
