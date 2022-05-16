import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, skipWhile, switchMap, take, catchError } from 'rxjs/operators';
import { Observable, of, Subscription } from 'rxjs';
import bwipjs from 'bwip-angular2';

import { UserInfo } from '@core/model/user';
import { Institution, InstitutionPhotoInfo } from '@core/model/institution';
import { CommerceApiService } from '@core/service/commerce/commerce-api.service';
import { getUserFullName } from '@core/utils/general-helpers';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { Settings } from '../../../../app.global';
import { Brightness } from '@ionic-native/brightness/ngx';
import { NativeProvider } from '@core/provider/native-provider/native.provider';
import { AppState } from '@capacitor/app';
import { DASHBOARD_NAVIGATE } from '@sections/dashboard/dashboard.config';
import { BarcodeFacadeService } from '@core/service/barcode/barcode.facade.service';
import { AppStatesFacadeService } from '@core/facades/appEvents/app-events.facade.service';

@Component({
  selector: 'st-scan-card',
  templateUrl: './scan-card.component.html',
  styleUrls: ['./scan-card.component.scss'],
})
export class ScanCardComponent implements OnInit, OnDestroy {
  generateBarcode$: Observable<boolean>;
  userInfoId$: Observable<string>;
  institution$: Observable<Institution>;
  institutionPhoto$: Observable<SafeResourceUrl>;
  isMediaSettingExists$: Observable<boolean>;
  userPhoto: string;
  userId: string;
  institutionColor: string;
  previousBrigness: number;
  suscription: Subscription = new Subscription();

  constructor(
    private readonly institutionFacadeService: InstitutionFacadeService,
    private readonly sanitizer: DomSanitizer,
    private readonly route: ActivatedRoute,
    private readonly commerceApiService: CommerceApiService,
    private readonly userFacadeService: UserFacadeService,
    private readonly barcodeFacadeService: BarcodeFacadeService,
    private readonly nativeProvider: NativeProvider,
    private readonly router: Router,
    private readonly appStatesFacadeService: AppStatesFacadeService,
    private readonly brightness: Brightness
  ) { }

  adjustBrignessOnAppState = async (appState: AppState) => {
    if (appState.isActive && this.router.url.includes(DASHBOARD_NAVIGATE.scanCard)) {
      this.setFullBrightness();
    } else {
      this.setPreviousBrightness();
    }
  };

  ngOnInit() {
    console.log('ScanCardComponent: ');
    this.isMediaSettingExists$ = this.barcodeFacadeService
      .getSetting(Settings.Setting.PATRON_DISPLAY_MEDIA_TYPE)
      .pipe(map(({ value }) => !!value && !!value.length));
    this.setInstitutionColor();
    this.setUserId();
    this.setUserPhoto();
    this.setInstitution();
    this.setInstitutionPhoto();
    this.initBarcode();
    this.suscription = this.appStatesFacadeService.getStateChangeEvent$.subscribe(this.adjustBrignessOnAppState);
    this.userInfoId$ = this.commerceApiService.getCashlessUserId().pipe(map(d => (d.length ? d : 'None')));
  }

  get userFullName$(): Observable<string> {
    return this.userFacadeService.getUserInfo().pipe(map((userInfo: UserInfo) => getUserFullName(userInfo)));
  }

  private setUserId() {
    this.userFacadeService
      .getUserInfo()
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
    this.institution$ = this.userFacadeService.getUserInfo().pipe(
      switchMap(({ institutionId }: UserInfo) => this.institutionFacadeService.getInstitutionInfo$(institutionId)),
      take(1)
    );
  }

  private setInstitutionPhoto() {
    this.institutionPhoto$ = this.userFacadeService.getUserInfo().pipe(
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

  private async setFullBrightness() {
    if (this.nativeProvider.isMobile()) {
      this.previousBrigness = await this.brightness.getBrightness();
      await this.brightness.setBrightness(1);
    }
  }

  async setPreviousBrightness() {
    if (this.nativeProvider.isMobile() && this.previousBrigness) {
      await this.brightness.setBrightness(this.previousBrigness);
    }
  }

  async ionViewWillLeave() {
    this.setPreviousBrightness();
  }

  ngOnDestroy(): void {
    this.setPreviousBrightness();
    this.suscription.unsubscribe();
  }
}
