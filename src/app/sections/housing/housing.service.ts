import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ROLES } from '../../app.global';
import { forkJoin, Observable, of, pipe, Subject, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';


import { HousingProxyService } from './housing-proxy.service';
import { ApplicationsStateService } from './applications/applications-state.service';
import { ContractsStateService } from './contracts/contracts-state.service';
import { TermsService } from './terms/terms.service';
import { ApplicationsService } from './applications/applications.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { ContractsService } from '@sections/housing/contracts/contracts.service';
import { RoomsStateService } from '@sections/housing/rooms/rooms-state.service';
import { RoomSelect } from '@sections/housing/rooms/rooms.model';

import {
  DefinitionsResponse,
  DetailsResponse,
  FacilityDetailsResponse, OccupantDetailsResponse, OccupantDetailsResponseOptions,
  Response,
  RoomSelectResponse,
} from './housing.model';
import { ApplicationDetails } from './applications/applications.model';
import { Facility, FacilityDetailsToFacilityMapper } from './facilities/facilities.model';
import { ContractDetails, ContractListDetails } from './contracts/contracts.model';
import { FacilityOccupantDetails } from '@sections/housing/roommate/roomate.model';

@Injectable({
  providedIn: 'root',
})
export class HousingService {
  private readonly _baseUrl = this._environmentFacadeService.getEnvironmentObject().housing_aws_url;
  private readonly _patronApplicationsUrl: string = `${this._baseUrl}/patron-applications/v.1.0/patron-applications`;

  private readonly _applicationDefinitionUrl: string = `${this._patronApplicationsUrl}/application-definition`;
  private readonly  _facilityMapper: FacilityDetailsToFacilityMapper;
  private _refreshDefinitionsSource: Subject<void> = new Subject<void>();

  refreshDefinitions$: Observable<number> = this._refreshDefinitionsSource
    .asObservable()
    .pipe(switchMap(() => this._termsService.termId$));

  constructor(
    private _environmentFacadeService: EnvironmentFacadeService,
    private _housingProxyService: HousingProxyService,
    private _applicationsStateService: ApplicationsStateService,
    private _contractsStateService: ContractsStateService,
    private _termsService: TermsService,
    private _applicationsService: ApplicationsService,
    private _loadingService: LoadingService,
    private _toastController: ToastController,
    private _router: Router,
    private _contractsService: ContractsService,
    private _roomsStateService: RoomsStateService,
  ) {
    this._facilityMapper = new FacilityDetailsToFacilityMapper();
  }

  getDefinitions(termId: number) {
    const apiUrl: string = `${this._patronApplicationsUrl}/term/${termId}/patron/self`;

    return this._housingProxyService.get<DefinitionsResponse>(apiUrl).pipe(
      map((response: any) => new DefinitionsResponse(response)),
      switchMap((response: DefinitionsResponse) => this._patchDefinitionsByStore(response)),
      tap((response: DefinitionsResponse) => this._setState(response.applicationDefinitions, response.contractDetails)),
      catchError(() => this._handleGetDefinitionsError())
    );
  }

  refreshDefinitions(): void {
    this._refreshDefinitionsSource.next();
  }

  getDetails(key: number, queryParams: string[] = []): Observable<DetailsResponse> {
    const queryString: string = queryParams.length ? `?${queryParams.join('&')}` : '';
    const apiUrl: string = `${this._applicationDefinitionUrl}/${key}/patron/self${queryString}`;

    return this._housingProxyService.get<DetailsResponse>(apiUrl).pipe(
      map((response: any) => new DetailsResponse(response)),
      tap((details: DetailsResponse) => {
        if (details.applicationDetails) {
          this._applicationsStateService.setApplicationDetails(details.applicationDetails);
        }

        if (details.contractDetails) {
          this._contractsStateService.setContractDetails(details.contractDetails);
        }
      })
    );
  }

  getApplicationDetails(key: number): Observable<ApplicationDetails> {
    return this.getDetails(key).pipe(map((response: DetailsResponse) => response.applicationDetails));
  }

  getContractDetails(key: number, queryParams: string[] = []): Observable<ContractDetails> {
    return this.getDetails(key, queryParams)
      .pipe(map((response: DetailsResponse) => response.contractDetails))
      .pipe(
        tap((details: ContractDetails) => {
          if (details.contractInfo.dateTimeSigned) {
            this._contractsService.sign(true);
          }
        })
      );
  }

  getRoomSelects(termId: number) {
    const apiUrl: string = `${this._baseUrl}/roomselectproxy/v.1.0/room-selects-proxy/patron/${termId}`;
    return this._housingProxyService.get<RoomSelectResponse>(apiUrl).pipe(
      map((response: any) => new RoomSelectResponse(response)),
      tap((response: RoomSelectResponse) => this._setRoomsState(response.roomSelects)),
      catchError(() => this._handleGetRoomSelectsError())
    );
  }
  getFacilities(roomSelectKey: number): Observable<Facility[]> {
    const apiUrl = `${
      this._baseUrl
    }/roomselectproxy/v.1.0/room-selects-proxy/facilities/details/${roomSelectKey}`;
    return this._housingProxyService.get<FacilityDetailsResponse>(apiUrl).pipe(
      map((response: any) => {
        const details = new  FacilityDetailsResponse(response)
        return this._facilityMapper.map(details.facilityDetails);
      }),
      catchError((e) =>{ throw e})
    );
  }

  getOccupantDetails(roomSelectKey:number, facilityKey: number): Observable<FacilityOccupantDetails[]> {
    const apiUrl = `${this._baseUrl}/roomselectproxy/v.1.0/room-selects-proxy/occupant-details/facilities/`;
    return this._housingProxyService.post<Response>(apiUrl, {
      roomSelectKey: roomSelectKey,
      facilityKeys: [facilityKey]
    }).pipe(
      map((response: Response) => {
        const details = new OccupantDetailsResponse(response.data);
        return details.occupants;
      }),
      catchError(err => {throw err})
    )
  }

  getAllOccupantDetails(roomSelectKey: number, facilityKeys: number[]): Observable<FacilityOccupantDetails[]> {
    const apiUrl = `${this._baseUrl}/roomselectproxy/v.1.0/room-selects-proxy/occupant-details/facilities`;
    return this._housingProxyService.post<Response>(apiUrl, {
      roomSelectKey: roomSelectKey,
      facilityKeys: facilityKeys
    }).pipe(
      map((response: Response) => {
        const details = new OccupantDetailsResponse(response.data);
        return details.occupants;
      }),
      tap(occupants => {
        this._roomsStateService.setOccupantDetails(occupants);
      }),
      catchError(err => {throw err})
    )
  }

  _handleGetRoomSelectsError(): Observable<RoomSelectResponse> {
    const roomSelects: RoomSelect[] = [];
    this._setRoomsState(roomSelects);

    return of(new RoomSelectResponse({ roomSelects }));
  }

  _setRoomsState(roomSelects: RoomSelect[]): void {
    this._roomsStateService.setRoomSelects(roomSelects);
  }

  /**
   *  Handles navigation back to dashboard and updates all subscribers w/ new information
   */
  handleSuccess(): void {
    this._loadingService.closeSpinner();
    this._router.navigate([`${ROLES.patron}/housing/dashboard`]).then(() => this.refreshDefinitions());
  }

  /**
   * Returns navigation back to dashboard as an observable
   */
  handleSuccess$(): Observable<any> {
    this._loadingService.closeSpinner();
    return of(this._router.navigate([`${ROLES.patron}/housing/dashboard`]).then(() => this.refreshDefinitions()));
  }

  handleSuccessfulAssignment(contractKey: number): void {
    this.handleSuccess$().subscribe(() => {
      // TODO goes to contract form based on contract element key & contract form key
    });
  }
  handleErrors(error: any): void {
    console.log(error);
    let message = 'Something went wrong. Try again later';

    this._loadingService.closeSpinner();

    if (error instanceof HttpErrorResponse) {
      const statusMessage: string = (error.error as Response).status.message;

      message = statusMessage || message;
    }

    this._toastController
      .create({
        message,
        position: 'top',
        duration: 3000,
        showCloseButton: true,
      })
      .then((toast: HTMLIonToastElement) => toast.present());
  }

  private _patchDefinitionsByStore(response: DefinitionsResponse): Observable<DefinitionsResponse> {
    const { applicationDefinitions, contractDetails } = response;

    const patchedApplications: Observable<ApplicationDetails[]> =
      applicationDefinitions.length > 0
        ? this._applicationsService.patchApplicationsByStoredStatus(applicationDefinitions)
        : of([]);

    return forkJoin(patchedApplications, of(contractDetails)).pipe(
      map(
        ([applicationDefinitions, contractDetails]: [ApplicationDetails[], ContractListDetails[]]) =>
          new DefinitionsResponse({
            applicationDefinitions,
            contractDetails,
          })
      )
    );
  }

  private _setState(applications: ApplicationDetails[], contracts: ContractListDetails[]): void {
    this._applicationsStateService.setApplications(applications);
    this._contractsStateService.setContracts(contracts);
  }



  private _handleGetDefinitionsError(): Observable<DefinitionsResponse> {
    const applicationDefinitions: ApplicationDetails[] = [];
    const contractDetails: ContractListDetails[] = [];

    this._setState(applicationDefinitions, contractDetails);

    return of(
      new DefinitionsResponse({
        applicationDefinitions,
        contractDetails,
      })
    );
  }
}



