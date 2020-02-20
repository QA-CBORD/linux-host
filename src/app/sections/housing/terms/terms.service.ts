import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { BASE_URL } from '../housing.config';
import { Environment } from '../../../environment';

import { HousingProxyService } from '../housing-proxy.service';

import { Term } from './terms.model';

@Injectable({
  providedIn: 'root',
})
export class TermsService {
  private _termIdSource: ReplaySubject<number> = new ReplaySubject<number>(1);

  termId$: Observable<number> = this._termIdSource.asObservable();

  constructor(private _housingProxyService: HousingProxyService) {}

  getTerms(): Observable<Term[]> {
    const apiUrl: string = `${BASE_URL}/${
      Environment.currentEnvironment.housing_aws_prefix
    }/patron-applications/v.1.0/patron-terms/patrons/self`;

    return this._housingProxyService.get<Term[]>(apiUrl).pipe(
      map((terms: any[]) => (Array.isArray(terms) ? terms.map((term: any) => new Term(term)) : [])),
      catchError(() => of([]))
    );
  }

  setTermId(termId: number): void {
    this._termIdSource.next(termId);
  }
}
