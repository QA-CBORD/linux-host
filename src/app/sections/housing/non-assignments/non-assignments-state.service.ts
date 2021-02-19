import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  NonAssignmentDetails,
  NonAssignmentListDetails
} from './non-assignments.model';

export interface NonAssignmentsState {
  entities: NonAssignmentEntities;
  nonAssignmentDetails: NonAssignmentDetails;
}

export interface NonAssignmentEntities {
  [key: number]: NonAssignmentListDetails;
}

@Injectable({
  providedIn: 'root'
})
export class NonAssignmentsStateService {
  private readonly _defaultState: NonAssignmentsState = {
    entities: {},
    nonAssignmentDetails: null
  };

  private readonly _nonAssignmentsStateSource: BehaviorSubject<NonAssignmentsState>
    = new BehaviorSubject<NonAssignmentsState>(this._defaultState);

  readonly nonAssignmentEntities$: Observable<NonAssignmentEntities>
    = this._nonAssignmentsStateSource.pipe(
      map(this._getEntities)
    );

  readonly nonAssignments$: Observable<NonAssignmentListDetails[]> =
    this.nonAssignmentEntities$.pipe(
      map(this._getNonAssignments.bind(this))
    );

  readonly nonAssignmentDetails$: Observable<NonAssignmentDetails> =
    this._nonAssignmentsStateSource.pipe(
      map(this._getNonAssignmentsDetails)
    );

  set nonAssignmentsState(value: NonAssignmentsState) {
    this._nonAssignmentsStateSource.next(value);
  }
  
  get nonAssignmentsState(): NonAssignmentsState {
    return this._nonAssignmentsStateSource.getValue();
  }

  constructor() { }

  setNonAssignment(key: number, nonAssignmentDetails: NonAssignmentListDetails) {
    const entities: NonAssignmentEntities = this.nonAssignmentsState.entities;

    this.nonAssignmentsState = {
      ...this.nonAssignmentsState,
      entities: {
        ...entities,
        [key]: nonAssignmentDetails
      }
    };
  }

  setNonAssignments(nonAssignments: NonAssignmentListDetails[]): void {
    this.nonAssignmentsState = {
      ...this.nonAssignmentsState,
      entities: this._toNonAssignmentEntities(nonAssignments)
    };
  }

  setNonAssignmentDetails(nonAssignmentDetails: NonAssignmentDetails): void {
    this.nonAssignmentsState = {
      ...this.nonAssignmentsState,
      nonAssignmentDetails
    };
  }

  private _getEntities(state: NonAssignmentsState): NonAssignmentEntities {
    return state.entities;
  }

  private _getNonAssignmentsDetails(state: NonAssignmentsState): NonAssignmentDetails {
    return state.nonAssignmentDetails;
  }

  private _getNonAssignments(entities: NonAssignmentEntities): NonAssignmentListDetails[] {
    return Object.keys(entities).map((key: string) => entities[parseInt(key, 10)]);
  }

  private _toNonAssignmentEntities(nonAssignments: NonAssignmentListDetails[]): NonAssignmentEntities {
    return nonAssignments.reduce((entities: NonAssignmentEntities, nonAssignment: NonAssignmentListDetails) => {
      return {
        ...entities,
        [nonAssignment.id]: nonAssignment //contractElementId instead
      };
    }, {});
  }

}
