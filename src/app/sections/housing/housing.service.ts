import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ROLES } from '../../app.global';
import { forkJoin, Observable, of, Subject } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';

import { HousingProxyService } from './housing-proxy.service';
import { ApplicationsStateService } from './applications/applications-state.service';
import { ContractsStateService } from './contracts/contracts-state.service';
import { TermsService } from './terms/terms.service';
import { ApplicationsService } from './applications/applications.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { ContractsService } from '@sections/housing/contracts/contracts.service';
import { RoomsStateService } from '@sections/housing/rooms/rooms-state.service';
import { ContractListStateService } from '@sections/housing/contract-list/contract-list-state.service';
import { ContractSummary } from '@sections/housing/contract-list/contractSummary.model';
import { CheckInOutStateService } from '@sections/housing/check-in-out/check-in-out-state.service';
import { CheckInOut, CheckInOutSlot } from '@sections/housing/check-in-out/check-in-out.model';
import { RoomSelect } from '@sections/housing/rooms/rooms.model';

import {
  CheckInOutResponse,
  CheckInOutSlotResponse,
  CheckInOutSlotsResponseOptions,
  ContractListResponse,
  DefinitionsResponse,
  DetailsResponse,
  FacilityDetailsResponse,
  OccupantDetailsResponse,
  Response,
  RoomSelectResponse,
} from './housing.model';
import {
  ApplicationDetails,
  RequestedRoommate,
  RequestedRoommateRequest,
  RequestedRoommateResponse,
} from './applications/applications.model';
import { Facility, FacilityDetailsToFacilityMapper } from './facilities/facilities.model';
import { ContractDetails, ContractListDetails } from './contracts/contracts.model';
import { FacilityOccupantDetails, RoommateDetails, RoommateResponse } from '@sections/housing/roommate/roommate.model';
import { NonAssignmentDetails, NonAssignmentListDetails } from './non-assignments/non-assignments.model';
import { NonAssignmentsStateService } from './non-assignments/non-assignments-state.service';
import { WaitingList, WaitingListDetails } from './waiting-lists/waiting-lists.model';
import { WaitingListStateService } from './waiting-lists/waiting-list-state.service';
import { WorkOrderDetails, WorkOrder } from './work-orders/work-orders.model';
import { WorkOrderStateService } from './work-orders/work-order-state.service';
import { InspectionsStateService } from './inspections-forms/inspections-forms-state.service';
import { Inspections, Inspection, InspectionsData } from './inspections-forms/inspections-forms.model';
import { AttachmentsList, AttachmentsListData } from './attachments/attachments.model';
import { AttachmentStateService } from './attachments/attachments-state.service';
@Injectable({
  providedIn: 'root',
})
export class HousingService {
  private readonly _baseUrl = this._environmentFacadeService.getEnvironmentObject().housing_aws_url;
  private readonly _patronApplicationsUrl: string = `${this._baseUrl}/patron-applications/v.1.0/patron-applications`;

  private readonly _applicationDefinitionUrl: string = `${this._patronApplicationsUrl}/application-definition`;
  private readonly _facilityMapper: FacilityDetailsToFacilityMapper;
  private _refreshDefinitionsSource: Subject<void> = new Subject<void>();

  refreshDefinitions$: Observable<number> = this._refreshDefinitionsSource
    .asObservable()
    .pipe(switchMap(() => this._termsService.termId$));

  constructor(
    private _environmentFacadeService: EnvironmentFacadeService,
    private _housingProxyService: HousingProxyService,
    private _applicationsStateService: ApplicationsStateService,
    private _contractsStateService: ContractsStateService,
    private _nonAssignmentsStateService: NonAssignmentsStateService,
    private _termsService: TermsService,
    private _applicationsService: ApplicationsService,
    private _loadingService: LoadingService,
    private _toastController: ToastController,
    private _router: Router,
    private _contractsService: ContractsService,
    private _roomsStateService: RoomsStateService,
    private _contractListStateService: ContractListStateService,
    private _checkInOutStateService: CheckInOutStateService,
    private _waitingListStateService: WaitingListStateService,
    private _workOrderStateService: WorkOrderStateService,
    private _inspectionsStateService: InspectionsStateService,
    private _attachmentStateService: AttachmentStateService
  ) {
    this._facilityMapper = new FacilityDetailsToFacilityMapper();
  }

  getDefinitions(termId: number) {
    const apiUrl = `${this._patronApplicationsUrl}/term/${termId}/patron/self`;

    return this._housingProxyService.get<DefinitionsResponse>(apiUrl).pipe(
      map(response => new DefinitionsResponse(response)),
      switchMap((response: DefinitionsResponse) => this._patchDefinitionsByStore(response)),
      tap((response: DefinitionsResponse) =>
        this._setState(
          response.applicationDefinitions,
          response.contractDetails,
          response.nonAssignmentDetails,
          response.waitingLists,
          response.workOrders
        )
      ),
      catchError(() => this._handleGetDefinitionsError())
    );
  }

  refreshDefinitions(): void {
    this._refreshDefinitionsSource.next();
  }

  getDetails(key: number, queryParams: string[] = []): Observable<DetailsResponse> {
    const queryString: string = queryParams.length ? `?${queryParams.join('&')}` : '';
    const apiUrl = `${this._applicationDefinitionUrl}/${key}/patron/self${queryString}`;

    return this._housingProxyService.get<DetailsResponse>(apiUrl).pipe(
      map(response => new DetailsResponse(response)),
      tap((details: DetailsResponse) => {
        if (details.applicationDetails) {
          this._applicationsStateService.setApplicationDetails(details.applicationDetails);
        }

        if (details.contractDetails) {
          this._contractsStateService.setContractDetails(details.contractDetails);
        }

        if (details.nonAssignmentDetails) {
          this._nonAssignmentsStateService.setNonAssignmentDetails(details.nonAssignmentDetails);
        }
        if (details.workOrdersDetails) {
          this._workOrderStateService.setWorkOrderDetails(details.workOrdersDetails);
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
          const dateTimeAccepted: string = details.contractInfo.dateTimeAccepted;
          const isSigned = dateTimeAccepted.length > 4 ? dateTimeAccepted : JSON.parse(dateTimeAccepted);
          if (isSigned) {
            this._contractsService.sign(true);
          }
        })
      );
  }

  getNonAssignmentDetails(key: number, queryParams: string[] = []): Observable<NonAssignmentDetails> {
    return this.getDetails(key, queryParams).pipe(map((response: DetailsResponse) => response.nonAssignmentDetails));
  }

  getRoomSelects(termId: number) {
    const apiUrl = `${this._baseUrl}/roomselectproxy/v.1.0/room-selects-proxy/patron/${termId}`;
    return this._housingProxyService.get<RoomSelectResponse>(apiUrl).pipe(
      map(response => new RoomSelectResponse(response)),
      tap((response: RoomSelectResponse) => this._setRoomsState(response.roomSelects)),
      catchError(() => this._handleGetRoomSelectsError())
    );
  }

  getInspections(termId: number) {
    const apiUrl = `${this._baseUrl}/roomselectproxy/v.1.0/room-inspections-proxy/all?termKey=${termId}`;
    return this._housingProxyService.get<InspectionsData>(apiUrl).pipe(
      map(response => new InspectionsData(response)),
      tap((response: InspectionsData) => this._setInspectionsList(response.data)),
      catchError(() => this._handleInspectionListSelectedError())
    );
  }

  getAttachmentsListDetails(termKey?: number) {
    const apiUrl = `${this._baseUrl}/patron-applications/v.1.0/patron-attachment?termKey=${termKey}`;
    return this._housingProxyService.get<AttachmentsListData>(apiUrl).pipe(
      map(response => new AttachmentsListData(response)),
      tap((response: AttachmentsListData) => this._setAttachmenstList(response.data)),
      catchError(() => this._handleAttachmentListSelectedError())
    );
  }

  getInspectionDetails(termId: number, residentInspectionKey?: number, contractElementKey?: number, checkIn?: boolean) {
    const apiUrl: string = residentInspectionKey
      ? `${
          this._baseUrl
        }/roomselectproxy/v.1.0/room-inspections-proxy?residentInspectionKey=${residentInspectionKey}&termKey=${termId}&contractElementKey=${contractElementKey}&checkIn=${
          checkIn + ''
        }`
      : `${this._baseUrl}/roomselectproxy/v.1.0/room-inspections-proxy?termKey=${termId}&contractElementKey=${contractElementKey}&checkIn=${checkIn}`;
      return this._housingProxyService.get<Inspection>(apiUrl).pipe(
      map(response => new Inspection(response)),
      tap((response: Inspection) => this._setInspection(response)),
      catchError(() => this._handleInspectionSelectedError())
    );
  }

  getRequestedRoommates(request: RequestedRoommateRequest) {
    const apiUrl = `${this._baseUrl}/patron-applications/v.1.0/patron-preferences/requested`;
    return this._housingProxyService.post<Response>(apiUrl, request).pipe(
      map(response => new RequestedRoommateResponse(response.data)),
      catchError(() => this._handleGetRequestedRoommatesError())
    );
  }

  getPatronContracts(termId: number) {
    const apiUrl = `${this._baseUrl}/roomselectproxy/v.1.0/room-selects-proxy/contracts/self?termKey=${termId}`;
    return this._housingProxyService.get<ContractListResponse>(apiUrl).pipe(
      map(response => new ContractListResponse(response)),
      tap((response: ContractListResponse) => this._setContractSummariesState(response.contractSummaries)),
      catchError(() => this._handleGetContractSummariesError())
    );
  }

  getCheckInOuts(termId: number) {
    const apiUrl = `${this._baseUrl}/roomselectproxy/v.1.0/check-in-out/patron/${termId}`;
    return this._housingProxyService.get<CheckInOutResponse>(apiUrl).pipe(
      map(response => new CheckInOutResponse(response)),
      tap((response: CheckInOutResponse) => this._setCheckInOutsState(response.checkInOuts)),
      catchError(() => this._handleGetCheckInOutsError())
    );
  }

  getCheckInOutSlots(checkInOutKey: number): Observable<CheckInOutSlot[]> {
    const apiUrl = `${this._baseUrl}/roomselectproxy/v.1.0/check-in-out/patron/spot/${checkInOutKey}`;
    return this._housingProxyService.get<CheckInOutSlotsResponseOptions>(apiUrl).pipe(
      map(response => new CheckInOutSlotResponse(response).slots),
      catchError(err => {
        throw err;
      })
    );
  }

  getFacilities(roomSelectKey: number): Observable<Facility[]> {
    const apiUrl = `${this._baseUrl}/roomselectproxy/v.1.0/room-selects-proxy/facilities/details/${roomSelectKey}`;
    return this._housingProxyService.get<FacilityDetailsResponse>(apiUrl).pipe(
      map(response => {
        const details = new FacilityDetailsResponse(response);
        return this._facilityMapper.map(details.facilityDetails);
      }),
      catchError(e => {
        throw e;
      })
    );
  }

  getOccupantDetails(roomSelectKey: number, facilityKey: number): Observable<FacilityOccupantDetails[]> {
    const apiUrl = `${this._baseUrl}/roomselectproxy/v.1.0/room-selects-proxy/occupant-details/facilities/`;
    return this._housingProxyService
      .post<Response>(apiUrl, {
        roomSelectKey: roomSelectKey,
        facilityKeys: [facilityKey],
      })
      .pipe(
        map((response: Response) => {
          const details = new OccupantDetailsResponse(response.data);
          return details.occupants;
        }),
        catchError(err => {
          throw err;
        })
      );
  }

  getAllOccupantDetails(roomSelectKey: number, facilityKeys: number[]): Observable<FacilityOccupantDetails[]> {
    const apiUrl = `${this._baseUrl}/roomselectproxy/v.1.0/room-selects-proxy/occupant-details/facilities`;
    return this._housingProxyService
      .post<Response>(apiUrl, {
        roomSelectKey: roomSelectKey,
        facilityKeys: facilityKeys,
      })
      .pipe(
        map((response: Response) => {
          const details = new OccupantDetailsResponse(response.data);
          return details.occupants;
        }),
        tap(occupants => {
          this._roomsStateService.setOccupantDetails(occupants);
        }),
        catchError(err => {
          throw err;
        })
      );
  }

  searchRoommates(searchBy: string, searchValue: string): Observable<RoommateDetails[]> {
    const queryString = `?type=${searchBy}&searchValue=${searchValue}`;
    const apiUrl = `${this._baseUrl}/patron-applications/v.1.0/patrons/search${queryString}`;
    return this._housingProxyService.get<Response>(apiUrl).pipe(
      map(response => {
        const roommates = new RoommateResponse(response);
        return roommates.roommates;
      }),
      catchError(err => {
        throw err;
      })
    );
  }

  getWaitList(key: number): Observable<WaitingListDetails> {
    const apiUrl = `${this._baseUrl}/patron-applications/v.1.0/patron-waiting-lists/waiting-list/${key}/patron/`;
    return this._housingProxyService.get<WaitingListDetails>(apiUrl).pipe(
      map(response => {
        this._waitingListStateService.setWaitingListDetails(response);
        return new WaitingListDetails(response);
      })
    );
  }

  getWorkOrders(termKey: number, workOrderKey = 0): Observable<WorkOrderDetails> {
    //TODO: change url work orders
    const apiUrl = `${this._baseUrl}/patron-applications/v.1.0/work-orders/${termKey}/${workOrderKey}/`;
    return this._housingProxyService.get<WorkOrderDetails>(apiUrl).pipe(
      map(response => {
        this._workOrderStateService.setWorkOrderDetails(response);
        return new WorkOrderDetails(response);
      })
    );
  }

  _handleGetRoomSelectsError(): Observable<RoomSelectResponse> {
    const roomSelects: RoomSelect[] = [];
    this._setRoomsState(roomSelects);

    return of(new RoomSelectResponse({ roomSelects }));
  }

  _handleInspectionSelectedError(): Observable<Inspection> {
    const inspection: Inspection = null;
    this._setInspection(inspection);

    return of(new Inspection(null));
  }

  _handleInspectionListSelectedError(): Observable<Inspections> {
    const inspection: Inspections[] = [];
    this._setInspectionsList(inspection);

    return of(new Inspections(null));
  }

  _handleAttachmentListSelectedError(): Observable<AttachmentsList> {
    const attachmentsList: AttachmentsList[] = [];
    this._setAttachmenstList(attachmentsList);

    return of(new AttachmentsList(null));
  }

  _handleGetRequestedRoommatesError(): Observable<RequestedRoommateResponse> {
    const roommates: RequestedRoommate[] = [];
    this._setRequestedRoommateState(roommates);

    return of(new RequestedRoommateResponse({ requestedRoommates: roommates }));
  }

  _handleGetContractSummariesError(): Observable<ContractListResponse> {
    const contractSummaries: ContractSummary[] = [];
    this._setContractSummariesState(contractSummaries);

    return of(new ContractListResponse({ contractSummaries }));
  }
  _handleGetCheckInOutsError(): Observable<CheckInOutResponse> {
    const checkInOuts: CheckInOut[] = [];
    this._setCheckInOutsState(checkInOuts);

    return of(new CheckInOutResponse({ checkInOuts }));
  }

  _setRoomsState(roomSelects: RoomSelect[]): void {
    this._roomsStateService.setRoomSelects(roomSelects);
  }
  _setContractSummariesState(contractSummaries: ContractSummary[]): void {
    this._contractListStateService.setContractSummaries(contractSummaries);
  }
  _setCheckInOutsState(checkInOuts: CheckInOut[]): void {
    this._checkInOutStateService.setCheckInOuts(checkInOuts);
  }

  _setRequestedRoommateState(roommates: RequestedRoommate[]): void {
    this._applicationsStateService.setRequestedRoommates(roommates);
  }

  _setInspectionsList(value: Inspections[]): void {
    this._inspectionsStateService.setInspectionList(value);
  }

  _setAttachmenstList(value: AttachmentsList[]): void {
    this._attachmentStateService.setAttachmentList(value);
  }

  _setInspection(value: Inspection): void {
    this._inspectionsStateService.setInspectionForm(value);
  }

  /**
   *  Handles navigation back to dashboard and updates all subscribers w/ new information
   */
  goToDashboard(): void {
    this._loadingService.closeSpinner();
    this._router.navigate([`${ROLES.patron}/housing/dashboard`]);
  }

  /**
   * Returns navigation back to dashboard as an observable
   */
  goToDashboard$(): Observable<Promise<boolean>> {
    this._loadingService.closeSpinner();
    return of(this._router.navigate([`${ROLES.patron}/housing/dashboard`]));
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleSuccessfulAssignment(contractKey: number): void {
    this.goToDashboard$().subscribe(() => {
      // TODO goes to contract form based on contract element key & contract form key
    });
  }
  handleErrors(error: Error): void {
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
        buttons: [{ text: 'Dismiss' }],
      })
      .then((toast: HTMLIonToastElement) => toast.present());
  }

  private _patchDefinitionsByStore(response: DefinitionsResponse): Observable<DefinitionsResponse> {
    const {
      applicationDefinitions: appDef,
      contractDetails: contractsDet,
      nonAssignmentDetails,
      waitingLists: wLists,
      workOrders,
    } = response;

    const patchedApplications: Observable<ApplicationDetails[]> =
      appDef.length > 0 ? this._applicationsService.patchApplicationsByStoredStatus(appDef) : of([]);

    return forkJoin(patchedApplications, of(contractsDet), of(nonAssignmentDetails), of(wLists), of(workOrders)).pipe(
      map(
        ([applicationDefinitions, contractDetails, nonAssignments, waitingLists]: [
          ApplicationDetails[],
          ContractListDetails[],
          NonAssignmentListDetails[],
          WaitingList[],
          WorkOrder
        ]) =>
          new DefinitionsResponse({
            applicationDefinitions,
            contractDetails,
            nonAssignmentDetails: nonAssignments,
            waitingLists,
            workOrders,
          })
      )
    );
  }

  private _setState(
    applications: ApplicationDetails[],
    contracts: ContractListDetails[],
    nonAssignments: NonAssignmentListDetails[],
    waitingLists: WaitingList[],
    workOrders: WorkOrder
  ): void {
    this._applicationsStateService.setApplications(applications);
    this._contractsStateService.setContracts(contracts);
    this._nonAssignmentsStateService.setNonAssignments(nonAssignments);
    this._waitingListStateService.setWaitingList(waitingLists);
    this._workOrderStateService.setWorkOrder(workOrders);
  }

  private _handleGetDefinitionsError(): Observable<DefinitionsResponse> {
    const applicationDefinitions: ApplicationDetails[] = [];
    const contractDetails: ContractListDetails[] = [];
    const nonAssignmentDetails: NonAssignmentListDetails[] = [];
    const waitingLists: WaitingList[] = [];

    //TODO: workORDERs
    const workOrders: WorkOrder = new WorkOrder({
      canSubmit: null,
      workOrders: [],
    });

    this._setState(applicationDefinitions, contractDetails, nonAssignmentDetails, waitingLists, workOrders);

    return of(
      new DefinitionsResponse({
        applicationDefinitions,
        contractDetails,
        nonAssignmentDetails,
        waitingLists,
        workOrders,
      })
    );
  }

  public getRequestedRommate(termKey: number) {
    const applicationDetails = this._applicationsStateService.applicationsState.applicationDetails;
    const requestedRoommates = this._applicationsStateService.getRequestedRoommate();
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
      termKey: termKey,
      patronRequests,
    });

    return this.getRequestedRoommates(requestBody).pipe(
      map((data: RequestedRoommateResponse) => {
        data.requestedRoommates.forEach(d => {
          const roommatePref = applicationDetails.roommatePreferences.find(
            f =>
              f.patronKeyRoommate === d.patronRoommateKey &&
              f.preferenceKey === d.preferenceKey &&
              !requestedRoommates.find(y => y.patronRoommateKey === d.patronRoommateKey)
          );

          const requestedRoommateObj = new RequestedRoommate({
            firstName: roommatePref ? roommatePref.firstName : '',
            lastName: roommatePref ? roommatePref.lastName : '',
            preferenceKey: d.preferenceKey,
            patronRoommateKey: d.patronRoommateKey,
            confirmed: applicationDetails.roommatePreferences.some(roommate => {
              if (roommate.patronKeyRoommate === d.patronRoommateKey && d.confirmed) {
                return true;
              }
              return d.confirmed;
            }),
            middleName: d.middleName ? d.middleName : '',
            birthDate: d.birthDate,
            preferredName: d.preferredName ? d.preferredName : '',
          });
          if (requestedRoommateObj.firstName) {
            this._applicationsStateService.setRequestedRoommate(requestedRoommateObj);
          }
        });
      })
    );
  }

  updatePaymentSuccess(appDetails: ApplicationDetails) {
    const { patronAttributes, patronPreferences, roommatePreferences, patronAddresses } = appDetails;
    const body = {
      patronAttributes,
      patronPreferences,
      roommatePreferences,
      patronAddresses,
      patronApplication: {
        termKey: appDetails.applicationDefinition.termKey,
        applicationDefinitionKey: appDetails.applicationDefinition.key,
        status: 3,
      },
    };
    return this._housingProxyService
      .put(this._patronApplicationsUrl, body)
      .pipe(
        take(1),
        catchError(() => this._handleGetDefinitionsError())
      )
      .subscribe();
  }
}
