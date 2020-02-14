import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { ApplicationsService } from './applications.service';
import { ApplicationsStateService } from './applications-state.service';
import { TermsService } from '../terms/terms.service';
import { LoadingService } from '@core/service/loading/loading.service';

@Component({
  selector: 'st-applications',
  templateUrl: './applications.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationsComponent implements OnInit, OnDestroy {
  private _subscription: Subscription = new Subscription();

  constructor(
    private _applicationsService: ApplicationsService,
    private _termsService: TermsService,
    private _loadingService: LoadingService,
    public applicationsStateService: ApplicationsStateService
  ) {}

  ngOnInit(): void {
    const applicationsSubscription: Subscription = this._termsService.termId$
      .pipe(
        switchMap((termId: number) => {
          this._loadingService.showSpinner();

          return this._applicationsService.getApplications(termId);
        })
      )
      .subscribe({
        next: () => this._loadingService.closeSpinner(),
        error: () => this._loadingService.closeSpinner(),
      });

    this._subscription.add(applicationsSubscription);
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
