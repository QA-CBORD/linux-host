import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, skipWhile, switchMap, take, tap, delay } from 'rxjs/operators';
import { Observable, timer, Subscription } from 'rxjs';
import bwipjs from 'bwip-angular2';

import { UserInfo } from '@core/model/user';
import { InstitutionService } from '@core/service/institution/institution.service';
import { UserService } from '@core/service/user-service/user.service';
import { Institution, InstitutionPhotoInfo } from '@core/model/institution';
import { CommerceApiService } from '@core/service/commerce/commerce-api.service';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { DASHBOARD_SETTINGS_CONFIG } from '@sections/dashboard/dashboard.config';
import { NativeProvider } from '@core/provider/native-provider/native.provider';

@Component({
  selector: 'st-scan-card',
  templateUrl: './scan-card.component.html',
  styleUrls: ['./scan-card.component.scss'],
})
export class ScanCardComponent implements OnInit, OnDestroy {
  private readonly BARCODE_GEN_INTERVAL = 180000; /// 3 minutes
  private readonly subscription: Subscription = new Subscription();
  showBarcode: boolean = false;
  userInfoId$: Observable<string>;
  institution$: Observable<Institution>;
  institutionPhoto$: Observable<SafeResourceUrl>;
  isMediaSettingExists$: Observable<boolean>;
  userPhoto: string;
  userId: string;
  institutionColor: string;

  constructor(
    private readonly userService: UserService,
    private readonly institutionService: InstitutionService,
    private readonly sanitizer: DomSanitizer,
    private readonly route: ActivatedRoute,
    private readonly commerceApiService: CommerceApiService,
    private readonly settingsFacadeService: SettingsFacadeService,
    private readonly nativeInterface: NativeProvider
  ) {}

  ngOnInit() {
    this.isMediaSettingExists$ = this.settingsFacadeService.getSetting$(DASHBOARD_SETTINGS_CONFIG.displayMediaType)
      .pipe(map(({ value }) => !!value && !!value.length));
    this.setInstitutionColor();
    this.setUserId();
    this.setUserPhoto();
    this.setInstitution();
    this.setInstitutionPhoto();
    this.initBarcode();
    this.userInfoId$ = this.commerceApiService.getCashlessUserId().pipe(map(d => (d.length ? d : 'None')));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  get userFullName$(): Observable<string> {
    return this.userService.userData.pipe(
      map(({ firstName: fn, middleName: mn, lastName: ln }: UserInfo) => `${fn || ''} ${mn || ''} ${ln || ''}`)
    );
  }

  private setUserId() {
    this.userService.userData.pipe(take(1)).subscribe(res => {
      this.userId = res.id;
    });
  }

  private setUserPhoto() {
    this.userService
      .getAcceptedPhoto()
      .pipe(
        map(({ data, mimeType }) => `data:${mimeType};base64,${data}`),
        take(1),
      )
      .subscribe((url: string) => {
        this.userPhoto = url;
      });
  }

  private setInstitution() {
    this.institution$ = this.institutionService.institutionData;
  }

  private setInstitutionPhoto() {
    this.institutionPhoto$ = this.userService.userData.pipe(
      switchMap(({ institutionId }: UserInfo) => this.institutionService.getInstitutionPhotoById(institutionId)),
      skipWhile(d => !d),
      map(({ data, mimeType }: InstitutionPhotoInfo) => {
        return `data:${mimeType};base64,${data}`;
      }),
      map(response => this.sanitizer.bypassSecurityTrustResourceUrl(response))
    );
  }

  private initBarcode() {
    this.subscription.add(
      timer(0, this.BARCODE_GEN_INTERVAL)
        .pipe(
          switchMap(_ => this.nativeInterface.getPatronBarcode()),
          tap(value => {
            value ? (this.showBarcode = true) : (this.showBarcode = false);
          }),
          delay(500)
        )
        .subscribe(
          value => {
            this.generateBarcode(value);
          },
          error => {
            this.showBarcode = false;
          }
        )
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
