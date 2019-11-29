import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Component, OnInit, Input } from '@angular/core';

import { Observable } from 'rxjs';
import { map, startWith, tap, first } from 'rxjs/operators';

import { AccessCardService } from './services/access-card.service';

@Component({
  selector: 'st-access-card',
  templateUrl: './access-card.component.html',
  styleUrls: ['./access-card.component.scss'],
})
export class AccessCardComponent implements OnInit {
  userName$: Observable<string>;
  userPhoto$: Promise<string>;
  institutionName$: Observable<string>;
  institutionPhoto$: Observable<SafeResourceUrl>;
  institutionBackgroundImage$: Observable<string>;
  getMyCardEnabled$: Observable<boolean>;
  applePayEnabled$: Observable<boolean>;
  isLoadingImg: boolean;
  @Input() isMobileAccessButtonEnabled: boolean;

  constructor(private readonly accessCardService: AccessCardService, private readonly sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.getUserData();
    this.setInstitutionData();
    this.getFeaturesEnabled();
  }

  private getUserData() {
    this.isLoadingImg = true;
    this.userName$ = this.accessCardService.getUserName();
    this.userPhoto$ = this.accessCardService.getUserPhoto().pipe(first())
      .toPromise().finally(() => this.isLoadingImg = !this.isLoadingImg);
  }

  private setInstitutionData() {
    this.institutionName$ = this.accessCardService.getInstitutionName();
    this.institutionPhoto$ = this.accessCardService
      .getInstitutionImage()
      .pipe(map(response => this.sanitizer.bypassSecurityTrustResourceUrl(response)));
    this.institutionBackgroundImage$ = this.accessCardService.getInstitutionBackgroundImage();
  }

  private getFeaturesEnabled() {
    this.getMyCardEnabled$ = this.accessCardService.isGETMyCardEnabled();
    this.applePayEnabled$ = this.accessCardService.isApplePayEnabled();
  }
}
