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
  PreferredName = 'preferredNameLast',
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
  requestedRoommates: RequestedRoommate[];
  selectedTermKey: number;

  constructor(
    private _applicationStateService: ApplicationsStateService,
    private _loadingService: LoadingService,
    private readonly cdRef: ChangeDetectorRef,
    private _termService: TermsService,
    private _housingService: HousingService
  ) { }

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

    const patronRequests =
      applicationDetails &&
      applicationDetails.roommatePreferences
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
        map((response: RequestedRoommateResponse) => {
          return response.requestedRoommates.map(roommate => {
            const roommatePref =
              applicationDetails &&
              applicationDetails.roommatePreferences.find(
                f => f.patronKeyRoommate === roommate.patronRoommateKey && f.preferenceKey === roommate.preferenceKey
              );

            return ({
              firstName: roommatePref?.firstName || '',
              lastName: roommatePref?.lastName || '',
              preferenceKey: roommate.preferenceKey,
              patronRoommateKey: roommate.patronRoommateKey,
              confirmed: this.isRoommateConfirmed(requestedRoommates, roommate),
              middleName: roommate?.middleName || '',
              birthDate: roommate?.birthDate || '',
              preferredName: roommate?.preferredName || '',
            } as RequestedRoommate);
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

  private isRoommateConfirmed(requestedRoommates: RequestedRoommate[], d: RequestedRoommate): boolean {
    return requestedRoommates.some(roommate => {
      if (roommate.patronRoommateKey === d.patronRoommateKey && roommate.confirmed) {
        return roommate.confirmed;
      }
      return d.confirmed;
    });
  }

  get hasRequestedRoommate() {
    return this.requestedRoommates && this.requestedRoommates.length > 0;
  }
}
