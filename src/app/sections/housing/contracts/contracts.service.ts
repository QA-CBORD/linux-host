import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Environment } from '../../../environment';

import { HousingProxyService } from '../housing-proxy.service';

import { ResponseStatus } from '../housing.model';
import { ContractRequest } from './contracts.model';

@Injectable({
  providedIn: 'root',
})
export class ContractsService {
  private readonly _patronContractsUrl: string = `${
    Environment.currentEnvironment.housing_aws_url
  }/patron-applications/v.1.0/patron-contracts`;

  constructor(private _housingProxyService: HousingProxyService) {}

  submitContract(contractElementKey: number): Observable<ResponseStatus> {
    const dateSigned: string = new Date().toISOString();
    const body: ContractRequest = new ContractRequest({
      contractElementKey,
      dateSigned,
    });

    return this._housingProxyService.put(this._patronContractsUrl, body);
  }
}
