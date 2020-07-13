import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ContractListDetails, ContractDetails } from './contracts.model';

export interface ContractsState {
  entities: ContractEntities;
  contractDetails: ContractDetails;
}

export interface ContractEntities {
  [key: number]: ContractListDetails;
}

@Injectable({
  providedIn: 'root',
})
export class ContractsStateService {
  private readonly _defaultState: ContractsState = {
    entities: {},
    contractDetails: null,
  };

  private readonly _contractsStateSource: BehaviorSubject<ContractsState> = new BehaviorSubject<ContractsState>(
    this._defaultState
  );

  readonly contractEntities$: Observable<ContractEntities> = this._contractsStateSource.pipe(map(this._getEntities));

  readonly contracts$: Observable<ContractListDetails[]> = this.contractEntities$.pipe(
    map(this._getContracts.bind(this))
  );

  readonly contractDetails$: Observable<ContractDetails> = this._contractsStateSource.pipe(
    map(this._getContractDetails)
  );

  set contractsState(value: ContractsState) {
    this._contractsStateSource.next(value);
  }

  get contractsState(): ContractsState {
    return this._contractsStateSource.getValue();
  }

  setContracts(contracts: ContractListDetails[]): void {
    this.contractsState = { ...this.contractsState, entities: this._toContractEntities(contracts) };
  }

  setContract(contractKey: number, contractDetails: ContractListDetails) {
    const entites: ContractEntities = this.contractsState.entities;

    this.contractsState = {
      ...this.contractsState,
      entities: { ...entites, [contractKey]: contractDetails },
    };
  }

  setContractDetails(contractDetails: ContractDetails): void {
    this.contractsState = { ...this.contractsState, contractDetails };
  }

  private _getEntities(state: ContractsState) {
    return state.entities;
  }

  private _getContracts(entities: ContractEntities) {
    return this._toContractsArray(entities);
  }

  private _toContractEntities(contracts: ContractListDetails[]): ContractEntities {
    return contracts.reduce((entities: ContractEntities, contract: ContractListDetails) => {
      return {
        ...entities,
        [contract.id]: contract,
      };
    }, {});
  }

  private _toContractsArray(entities: ContractEntities): ContractListDetails[] {
    return Object.keys(entities).map((key: string) => entities[parseInt(key, 10)]);
  }

  private _getContractDetails(state: ContractsState): ContractDetails {
    return state.contractDetails;
  }
}
