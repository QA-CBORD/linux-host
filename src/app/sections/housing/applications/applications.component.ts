import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ApplicationsService } from './applications.service';
import { ApplicationsStateService } from './applications-state.service';

@Component({
  selector: 'st-applications',
  templateUrl: './applications.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationsComponent implements OnInit, OnDestroy {
  private _subscription: Subscription = new Subscription();

  constructor(
    private _applicationsService: ApplicationsService,
    public applicationsStateService: ApplicationsStateService
  ) {}

  ngOnInit(): void {
    const applicationsSubscription: Subscription = this._applicationsService.getApplications().subscribe();

    this._subscription.add(applicationsSubscription);
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  handleClear(applicationKey: number): void {
    this._applicationsService.clearApplication(applicationKey);
  }
}
