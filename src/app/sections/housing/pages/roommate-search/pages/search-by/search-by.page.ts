import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingService } from '@core/service/loading/loading.service';
import { ApplicationsStateService } from '@sections/housing/applications/applications-state.service';
import {
  RequestedRoommate,
  RequestedRoommateRequest,
  RequestedRoommateResponse,
  RoommateSearchOptions,
} from '@sections/housing/applications/applications.model';
import { HousingService } from '@sections/housing/housing.service';
import { TermsService } from '@sections/housing/terms/terms.service';
import { Observable, Subscription, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { PATRON_NAVIGATION } from 'src/app/app.global';

export enum OptionsName {
  PreferredName = 'preferredName',
  FullName = 'fullName',
  FullNameDOB = 'fullNameDOB',
}
@Component({
  selector: 'st-search-by',
  templateUrl: './search-by.page.html',
  styleUrls: ['./search-by.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchByPage implements OnInit, OnDestroy {
  searchForm: FormGroup;
  searchOptions$: Observable<RoommateSearchOptions>;
  requestedRoommates$: Observable<RequestedRoommate[]>;

  private selectedTermKey = 0;
  private subscriptions: Subscription = new Subscription();
  firstInputName = 'first';
  secondInputName = 'second';
  constructor(
    private _router: Router,
    private _applicationStateService: ApplicationsStateService,
    private _loadingService: LoadingService,
    private _housingService: HousingService,
    private _termService: TermsService,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit() {
    this.searchForm = this.fb.group({
      [this.firstInputName]: [''],
      [this.secondInputName]: [''],
    });

    this.searchForm.setValidators(this.atLeastOneFilled());
    this.searchForm.updateValueAndValidity();
    this.searchOptions$ = this._applicationStateService.roommateSearchOptions;
    this._initTermsSubscription();
    this._initGetRequestedRoommatesSubscription();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private _initTermsSubscription() {
    this.subscriptions.add(this._termService.termId$.subscribe(termId => (this.selectedTermKey = termId)));
  }

  private _initGetRequestedRoommatesSubscription() {
    const applicationDetails = this._applicationStateService.applicationsState.applicationDetails;
    const requestedRoommates = this._applicationStateService.getRequestedRoommate();

    const patronRequests = applicationDetails.roommatePreferences
      .filter(x => x.patronKeyRoommate !== 0)
      .map(
        x =>
          new RequestedRoommate({
            preferenceKey: x.preferenceKey,
            patronRoommateKey: x.patronKeyRoommate,
          })
      );

    const requestBody = new RequestedRoommateRequest({
      termKey: this.selectedTermKey,
      patronRequests,
    });

    this._loadingService.showSpinner();
    this.requestedRoommates$ = this._housingService.getRequestedRoommates(requestBody).pipe(
      map((data: RequestedRoommateResponse) =>
        data.requestedRoommates.map(d => {
          const roommatePref = applicationDetails.roommatePreferences.find(
            f => f.patronKeyRoommate === d.patronRoommateKey && f.preferenceKey === d.preferenceKey
          );

          return new RequestedRoommate({
            firstName: roommatePref ? roommatePref.firstName : '',
            lastName: roommatePref ? roommatePref.lastName : '',
            preferenceKey: d.preferenceKey,
            patronRoommateKey: d.patronRoommateKey,
            confirmed: requestedRoommates.some(roommate => {
              if (roommate.patronRoommateKey === d.patronRoommateKey && roommate.confirmed == true) {
                return roommate.confirmed;
              }
              return d.confirmed;
            }),
            middleName: d.middleName ? d.middleName : '',
            birthDate: d.birthDate,
            preferredName: d.preferredName ? d.preferredName : '',
          });
        })
      ),
      tap(() => {
        this._loadingService.closeSpinner();
      }),
      catchError((error: any) => {
        this._loadingService.closeSpinner();
        return throwError(error);
      })
    );
  }

  searchRoommates(options: RoommateSearchOptions): void {
    if (!this.searchForm.valid) {
      return;
    }
    const firstInput = this.firstInput;
    const secondInput = this.secondInput;

    let searchValue = `${firstInput.value}`;
    searchValue = secondInput.value !== '' ? `${searchValue},${secondInput.value}` : searchValue;

    const data: RoommateSearchOptions = {
      ...options,
      searchValue,
    };

    this._applicationStateService.setRoommateSearchOptions(data);

    this._router.navigate([`${PATRON_NAVIGATION.housing}/roommates-search/results`], { skipLocationChange: true });
  }

  isApplicationSubmitted() {
    return this._applicationStateService.isSubmitted(
      this._applicationStateService.applicationsState.applicationDetails.applicationDefinition.key
    );
  }

  get OptionsName(): typeof OptionsName {
    return OptionsName;
  }

  get firstInput() {
    return this.searchForm.get(this.firstInputName);
  }

  get secondInput() {
    return this.searchForm.get(this.secondInputName);
  }

  private atLeastOneFilled = () => {
    return (controlGroup: FormGroup) => {
      const controls = controlGroup.controls;
      if (anyInputFilled()) {
        return {
          atLeastOneFilled: true,
        };
      }
      return null;

      function anyInputFilled() {
        return !Object.keys(controls).some(key => controls[key].value !== '');
      }
    };
  };
}
