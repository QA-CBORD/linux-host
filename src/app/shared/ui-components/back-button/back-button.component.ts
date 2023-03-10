import { ChangeDetectionStrategy, Component, Input, OnDestroy } from '@angular/core';
import { ApplicationsStateService } from '@sections/housing/applications/applications-state.service';
import { HousingService } from '../../../sections/housing/housing.service';
import { TermsService } from '../../../sections/housing/terms/terms.service';
import { RequestedRoommate, RequestedRoommateResponse, RequestedRoommateRequest } from '../../../sections/housing/applications/applications.model';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'st-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackButtonComponent implements OnDestroy {
  @Input() defaultHref: string;

  @Input() text = 'Back';

  requestedRoommates$: Observable<RequestedRoommate[]>;
  private selectedTermKey = 0;
  private subscriptions: Subscription = new Subscription();

  constructor(
    public _applicationsStateService: ApplicationsStateService,
    private _housingService: HousingService,
    private _termService: TermsService) { }


  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  clicked(): void {
   if (this.defaultHref == "/housing/dashboard") {
     this._initTermsSubscription();
     this._initGetRequestedRoommatesSubscription();
   }
  }

  private _initTermsSubscription() {
    this.subscriptions.add(
      this._termService.termId$
          .subscribe(termId => this.selectedTermKey = termId));
  }

  private _initGetRequestedRoommatesSubscription() {
    const applicationDetails = this._applicationsStateService.applicationsState.applicationDetails;
    const patronRequests = applicationDetails.roommatePreferences
      .filter(x => x.patronKeyRoommate !== 0)
      .map(x => new RequestedRoommate({
        preferenceKey: x.preferenceKey,
        patronRoommateKey: x.patronKeyRoommate
      }));

    const requestBody = new RequestedRoommateRequest({
      termKey: this.selectedTermKey,
      patronRequests
    });

      this._housingService.getRequestedRoommates(requestBody).pipe(
        map((data: RequestedRoommateResponse) => data.requestedRoommates.map(d => {
          const roommatePref = applicationDetails.roommatePreferences
                .find(f => f.patronKeyRoommate === d.patronRoommateKey
                        && f.preferenceKey === d.preferenceKey);

          return new RequestedRoommate({
            firstName: roommatePref ? roommatePref.firstName : '',
            lastName: roommatePref ? roommatePref.lastName : '',
            preferenceKey: d.preferenceKey,
            patronRoommateKey: d.patronRoommateKey,
            confirmed: d.confirmed,
            middleName: d.middleName ? d.middleName : '',
            birthDate: d.birthDate,
            preferredName: d.preferredName ? d.preferredName : ''
          });
        }))
      ).subscribe((data)=>{
        data.forEach((roommateRequest) => {
          const requestRommateStateService = this._applicationsStateService.getRequestedRoommate();
          const isRequesteRommate = requestRommateStateService.find(request => request.preferenceKey === roommateRequest.preferenceKey );
          if (!isRequesteRommate){
            this._applicationsStateService.setRequestedRoommate(roommateRequest);
          }
        });
      });
  }
}
