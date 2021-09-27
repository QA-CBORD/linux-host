import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { ContentStringCategory } from '@shared/model/content-strings/content-strings-api';
import { CommonService } from '@shared/services/common.service';
import { forkJoin } from 'rxjs';

import { Observable } from 'rxjs/internal/Observable';
import { map, take } from 'rxjs/operators';
import { CheckingSuccessContentCsModel } from '../contents-strings/checkin-content-string.model';

@Injectable()
export class CheckinSuccessResolver implements Resolve<Observable<any>> {
  constructor(private readonly commonService: CommonService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const checkinSuccess = this.commonService.loadContentString<CheckingSuccessContentCsModel>(
      ContentStringCategory.checkinSuccess
    );
    return forkJoin(checkinSuccess).pipe(map(([cs]) => ({ cs })));
  }
}
