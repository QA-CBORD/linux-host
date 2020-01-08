import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, take, switchMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import bwipjs from 'bwip-angular2';

import { UserInfo, UserSettingInfo } from '@core/model/user';
import { InstitutionService } from '@core/service/institution/institution.service';
import { UserService } from '@core/service/user-service/user.service';
import { Institution, InstitutionPhotoInfo } from '@core/model/institution';
import { User } from 'src/app/app.global';
import { CommerceApiService } from '@core/service/commerce/commerce-api.service';

@Component({
  selector: 'st-scan-card',
  templateUrl: './scan-card.component.html',
  styleUrls: ['./scan-card.component.scss'],
})
export class ScanCardComponent implements OnInit {
  userInfoId$: Observable<string>;
  institution$: Observable<Institution>;
  institutionPhoto$: Observable<SafeResourceUrl>;
  userPhoto: string;
  userId: string;
  institutionColor: string;

  constructor(
    private readonly userService: UserService,
    private readonly institutionService: InstitutionService,
    private readonly sanitizer: DomSanitizer,
    private readonly route: ActivatedRoute,
    private readonly commerceApiService: CommerceApiService
  ) {}

  ngOnInit() {
    this.setInstitutionColor();
    this.setUserId();
    this.setUserPhoto();
    this.setInstitution();
    this.setInstitutionPhoto();
    this.initBarcode();
    this.userInfoId$ = this.commerceApiService.getCashlessUserId();
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
        take(1)
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
      map(({ data, mimeType }: InstitutionPhotoInfo) => {
        return `data:${mimeType};base64,${data}`;
      }),
      map(response => this.sanitizer.bypassSecurityTrustResourceUrl(response))
    );
  }

  private initBarcode() {
    bwipjs(
      'barcodeCanvas',
      {
        bcid: 'pdf417',
        text: this.userId,
        includetext: false,
        height: 10,
      },
      (err, cvs) => {}
    );
  }

  private setInstitutionColor() {
    this.institutionColor = this.route.snapshot.queryParams.color;
  }
}
