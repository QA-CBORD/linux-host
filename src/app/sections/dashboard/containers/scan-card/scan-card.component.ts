import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, skipWhile, switchMap, take, catchError } from 'rxjs/operators';
import { Observable, of, Subscription } from 'rxjs';
import { UserInfo } from '@core/model/user';
import { Institution, InstitutionPhotoInfo } from '@core/model/institution';
import { CommerceApiService } from '@core/service/commerce/commerce-api.service';
import { getUserFullName, isEmptyObject } from '@core/utils/general-helpers';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { Settings } from '../../../../app.global';
import { AppState } from '@capacitor/app';
import { DASHBOARD_NAVIGATE } from '@sections/dashboard/dashboard.config';
import { BarcodeFacadeService } from '@core/service/barcode/barcode.facade.service';
import { AppStatesFacadeService } from '@core/facades/appEvents/app-events.facade.service';
import { ModalController } from '@ionic/angular';
import { ScreenBrigtnessService } from '@core/service/screen-brightness/screen-brightness.service';
import bwipjs from 'bwip-angular2';

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
  userFullName$: Observable<string>;
  userPhoto: string;
  userId: string;
  @Input() isBackButtonShow = true;
  @Input() isDismissButtonShow: boolean;
  @Input('color') institutionColor: string;

  previousBrigness: number;
  suscription: Subscription = new Subscription();

  constructor(
    private readonly institutionFacadeService: InstitutionFacadeService,
    private readonly sanitizer: DomSanitizer,
    private readonly route: ActivatedRoute,
    private readonly commerceApiService: CommerceApiService,
    private readonly userFacadeService: UserFacadeService,
    private readonly barcodeFacadeService: BarcodeFacadeService,
    private readonly router: Router,
    private readonly appStatesFacadeService: AppStatesFacadeService,
    private readonly brightnessService: ScreenBrigtnessService,
    private readonly modalController: ModalController
  ) {}

  adjustBrignessOnAppState = async (appState: AppState) => {
    if (
      isEmptyObject(appState) ||
      (appState.isActive && (this.router.url.includes(DASHBOARD_NAVIGATE.scanCard) || this.isOpenedAsModal()))
    ) {
      this.setFullBrightness();
    } else {
      this.setPreviousBrightness();
    }
  };

  ngOnInit() {
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
    this.suscription = this.appStatesFacadeService.getStateChangeEvent$.subscribe(this.adjustBrignessOnAppState);
    this.userInfoId$ = this.commerceApiService.getCashlessUserId().pipe(map(d => (d.length ? d : 'None')));
  }

  setUserFullName$() {
    this.userFullName$ = this.getUserInfo().pipe(map((userInfo: UserInfo) => getUserFullName(userInfo)));
  }

  private getUserInfo() {
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
        skipWhile(acceptedPhoto => !acceptedPhoto || acceptedPhoto === null),
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

  async onBack() {
    this.modalController.dismiss().catch();
  }

  private initBarcode() {
    this.generateBarcode$ = this.barcodeFacadeService.generateBarcode(true).pipe(
      map(value => {
        this.generateBarcode(value);
        return true;
      }),
      catchError(() => of(false))
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
      () => {
        /// don't care
      }
    );
  }

  private setInstitutionColor() {
    this.institutionColor = this.institutionColor || this.route.snapshot.queryParams.color;
  }

  private async setFullBrightness() {
    const { brightness } = await this.brightnessService.getBrightness();
    this.previousBrigness = brightness;
    await this.brightnessService.setBrightness({ brightness: 1 });
  }

  async setPreviousBrightness() {
    if (this.previousBrigness) {
      await this.brightnessService.setBrightness({ brightness: this.previousBrigness });
    }
  }

  async ionViewWillLeave() {
    this.setPreviousBrightness();
  }

  ngOnDestroy(): void {
    this.setPreviousBrightness();
    this.suscription.unsubscribe();
  }

  isOpenedAsModal(): boolean {
    return this.isDismissButtonShow && !this.isBackButtonShow;
  }
}
