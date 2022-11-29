import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HousingProxyService } from '../housing-proxy.service';

import { Term } from './terms.model';

@Injectable({
  providedIn: 'root',
})
export class TermsService {
  private _termIdSource: ReplaySubject<number> = new ReplaySubject<number>(1);
  private _termLabelSource: ReplaySubject<string> = new ReplaySubject<string>(1);

  termId$: Observable<number> = this._termIdSource.asObservable();
  termlabel$: Observable<string> = this._termLabelSource.asObservable();

  constructor(
    private _environmentFacadeService: EnvironmentFacadeService,
    private _housingProxyService: HousingProxyService
  ) {
    this._termLabelSource.next('Select Term');
  }

  getTerms(): Observable<Term[]> {
    const apiUrl = `${
      this._environmentFacadeService.getEnvironmentObject().housing_aws_url
    }/patron-applications/v.1.0/patron-terms/patrons/self`;

    return this._housingProxyService.get<Term[]>(apiUrl).pipe(
      map((terms: any[]) => (Array.isArray(terms) ? terms.map((term: any) => new Term(term)) : [])),
      catchError(() => of([]))
    );
  }

  setTerm(term: Term): void {
    this._termIdSource.next(term.key);
    this._termLabelSource.next(term.termName);
  }
}
