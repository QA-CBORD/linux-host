import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
import { of } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';

export enum OptionsName {
  PreferredName = 'preferredName',
  FullName = 'fullName',
  FullNameDOB = 'fullNameDOB',
}

@Component({
  selector: 'st-requested-roommates',
  templateUrl: './requested-roommates.component.html',
  styleUrls: ['./requested-roommates.component.scss'],
})
export class RequestedRoommatesComponent implements OnInit {
  options: RoommateSearchOptions;
  requestedRoommates: any;
  selectedTermKey: number;

  constructor(
    private _applicationStateService: ApplicationsStateService,
    private _loadingService: LoadingService,
    private readonly cdRef: ChangeDetectorRef,
    private _termService: TermsService,
    private _housingService: HousingService
  ) {}

  ngOnInit(): void {
    this._applicationStateService.roommateSearchOptions.pipe(take(1)).subscribe(options => {
      this.options = options;
    });
    this.getSelectedTerms();
    this.getRequestedRoommates();
  }

  updateRequestedRoommates() {
    this.getRequestedRoommates();
  }

  get optionsName(): typeof OptionsName {
    return OptionsName;
  }

  private getSelectedTerms() {
    this._termService.termId$.pipe(take(1)).subscribe(termId => (this.selectedTermKey = termId));
  }

  private getRequestedRoommates() {
    const applicationDetails = this._applicationStateService.applicationsState.applicationDetails;
    const requestedRoommates = this._applicationStateService.getRequestedRoommate();

    const patronRequests =applicationDetails && applicationDetails.roommatePreferences
      .filter(patron => patron.patronKeyRoommate !== 0)
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
    this._housingService
      .getRequestedRoommates(requestBody)
      .pipe(
        map((data: RequestedRoommateResponse) => {
          return data.requestedRoommates.map(d => {
            const roommatePref = applicationDetails && applicationDetails.roommatePreferences.find(
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
          });
        }),
        take(1),
        catchError(() => {
          this._loadingService.closeSpinner();
          return of(null);
        })
      )
      .subscribe(requestedRoommates => {
        this._loadingService.closeSpinner();
        this.requestedRoommates = requestedRoommates;
        this.cdRef.detectChanges();
      });
  }
}
