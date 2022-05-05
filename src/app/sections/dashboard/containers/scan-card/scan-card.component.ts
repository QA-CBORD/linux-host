import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, skipWhile, switchMap, take, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import bwipjs from 'bwip-angular2';

import { UserInfo } from '@core/model/user';
import { Institution, InstitutionPhotoInfo } from '@core/model/institution';
import { CommerceApiService } from '@core/service/commerce/commerce-api.service';
import { getUserFullName } from '@core/utils/general-helpers';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { Settings } from '../../../../app.global';
import { BarcodeFacadeService } from '@core/service/barcode/barcode.facade.service';

@Component({
  selector: 'st-scan-card',
  templateUrl: './scan-card.component.html',
  styleUrls: ['./scan-card.component.scss'],
})
export class ScanCardComponent implements OnInit {
  private readonly BARCODE_GEN_INTERVAL = 180000; /// 3 minutes
  generateBarcode$: Observable<boolean>;
  userInfoId$: Observable<string>;
  institution$: Observable<Institution>;
  institutionPhoto$: Observable<SafeResourceUrl>;
  isMediaSettingExists$: Observable<boolean>;
  userFullName$: Observable<string>;
  userPhoto: string;
  userId: string;
  institutionColor: string;

  constructor(
    private readonly institutionFacadeService: InstitutionFacadeService,
    private readonly sanitizer: DomSanitizer,
    private readonly route: ActivatedRoute,
    private readonly commerceApiService: CommerceApiService,
    private readonly barcodeFacadeService: BarcodeFacadeService,
    private readonly userFacadeService: UserFacadeService
  ) {}

  ngOnInit() {
    console.log("ScanCardComponent: ", )
    this.setUserFullName$();
    this.isMediaSettingExists$ = this.barcodeFacadeService
      .getSetting(Settings.Setting.PATRON_DISPLAY_MEDIA_TYPE)
      .pipe(map(({ value }) => !!value && !!value.length));
    this.setInstitutionColor();
    this.setUserId();
    this.setUserPhoto();
    this.setInstitution();
    this.setInstitutionPhoto();
    this.initBarcode();
    this.userInfoId$ = this.commerceApiService.getCashlessUserId().pipe(map(d => (d.length ? d : 'None')));
  }

  setUserFullName$() {
    console.log("userFullName$()  userFullName$()")
    this.userFullName$ = this.getUserInfo().pipe(map((userInfo: UserInfo) => getUserFullName(userInfo)));
  }

  private getUserInfo(){
    return this.userFacadeService.getUserInfo();
  }

  private setUserId() {
    this.getUserInfo()
      .pipe(take(1))
      .subscribe(({ id }) => (this.userId = id));
  }

  private setUserPhoto() {
    this.userFacadeService
      .getAcceptedPhoto$()
      .pipe(
        map(({ data, mimeType }) => `data:${mimeType};base64,${data}`),
        take(1)
      )
      .subscribe((url: string) => {
        this.userPhoto = url;
      });
  }

  private setInstitution() {
    this.institution$ = this.getUserInfo().pipe(
      switchMap(({ institutionId }: UserInfo) => this.institutionFacadeService.getInstitutionInfo$(institutionId)),
      take(1)
    );
  }

  private setInstitutionPhoto() {
    this.institutionPhoto$ = this.getUserInfo().pipe(
      switchMap(({ institutionId }: UserInfo) => this.institutionFacadeService.getInstitutionPhoto$(institutionId)),
      skipWhile(d => !d || d === null),
      map(({ data, mimeType }: InstitutionPhotoInfo) => {
        return `data:${mimeType};base64,${data}`;
      }),
      map(response => this.sanitizer.bypassSecurityTrustResourceUrl(response))
    );
  }

  private initBarcode() {
    this.generateBarcode$ = this.barcodeFacadeService.generateBarcode(true).pipe(
      map(value => {
        this.generateBarcode(value);
        return true;
      }),
      catchError(_ => of(false))
    );
  }

  private generateBarcode(value: string) {
    bwipjs(
      'barcodeCanvas',
      {
        bcid: 'pdf417',
        text: value,
        includetext: false,
        height: 10,
      },
      (err, cvs) => {
        /// don't care
      }
    );
  }

  private setInstitutionColor() {
    this.institutionColor = this.route.snapshot.queryParams.color;
  }
}
