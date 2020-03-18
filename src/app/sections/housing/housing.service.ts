import { Injectable } from '@angular/core';
import { Observable, of, forkJoin, Subject } from 'rxjs';
import { map, switchMap, tap, catchError } from 'rxjs/operators';

import { Environment } from '../../environment';

import { HousingProxyService } from './housing-proxy.service';
import { ApplicationsStateService } from './applications/applications-state.service';
import { ContractsStateService } from './contracts/contracts-state.service';
import { TermsService } from './terms/terms.service';
import { ApplicationsService } from './applications/applications.service';

import { DefinitionsResponse, DetailsResponse } from './housing.model';
import { ApplicationDetails } from './applications/applications.model';
import { ContractListDetails, ContractDetails } from './contracts/contracts.model';
// import { generateApplications } from './applications/applications.mock';
// import { generateContractsList } from './contracts/contracts.mock';
// import { generateDetailsResponse } from './housing.mock';

@Injectable({
  providedIn: 'root',
})
export class HousingService {
  private readonly _patronApplicationsUrl: string = `${
    Environment.currentEnvironment.housing_aws_url
  }/patron-applications/v.1.0/patron-applications`;

  private readonly _applicationDefinitionUrl: string = `${this._patronApplicationsUrl}/application-definition`;

  private _refreshDefinitionsSource: Subject<void> = new Subject<void>();

  refreshDefinitions$: Observable<number> = this._refreshDefinitionsSource
    .asObservable()
    .pipe(switchMap(() => this._termsService.termId$));

  constructor(
    private _housingProxyService: HousingProxyService,
    private _applicationsStateService: ApplicationsStateService,
    private _contractsStateService: ContractsStateService,
    private _termsService: TermsService,
    private _applicationsService: ApplicationsService
  ) {}

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
      // TODO: Remove mock data
      // map(() => generateDetailsResponse(0)),
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
    return this.getDetails(key, queryParams).pipe(map((response: DetailsResponse) => response.contractDetails));
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
    // const applicationDefinitions: ApplicationDetails[] = generateApplications();
    // const contractDetails: ContractListDetails[] = generateContractsList();

    this._setState(applicationDefinitions, contractDetails);

    return of(
      new DefinitionsResponse({
        applicationDefinitions,
        contractDetails,
      })
    );
  }
}
