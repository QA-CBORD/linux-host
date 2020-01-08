import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, PopoverController, ToastController } from '@ionic/angular';

import { map, take, switchMap } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';

import { UserService } from '@core/service/user-service/user.service';
import { MobileAccessService } from '../service';
import { UserInfo } from '@core/model/user';
import { InstitutionService } from '@core/service/institution/institution.service';
import { MMobileLocationInfo } from '../model';
import { Institution } from '@core/model/institution';
import { MobileAccessPopoverComponent } from '@sections/mobile-access/mobile-access-popover';
import { LoadingService } from '@core/service/loading/loading.service';
import { CONTENT_STRINGS } from '../mobile-acces.config';
import { BUTTON_TYPE } from '@core/utils/buttons.config';
import { InstitutionPhotoInfo } from '@core/model/institution';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NAVIGATE } from 'src/app/app.global';
import { CommerceApiService } from '@core/service/commerce/commerce-api.service';

@Component({
  selector: 'st-activate-location',
  templateUrl: './activate-location.component.html',
  styleUrls: ['./activate-location.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivateLocationComponent implements OnInit, OnDestroy {
  private readonly toastDuration: number = 6000;
  private readonly sourceSubscription: Subscription = new Subscription();
  private locationId: string;

  location$: Observable<MMobileLocationInfo>;
  institution$: Observable<Institution>;
  institutionPhoto$: Observable<SafeResourceUrl>;
  userPhoto$: Observable<string>;
  userInfoId$: Observable<string>;
  photo: string = null;
  institutionColor$: Observable<string>;
  contentString;

  constructor(
    private readonly userService: UserService,
    private readonly routerLink: ActivatedRoute,
    private readonly mobileAccessService: MobileAccessService,
    private readonly popoverCtrl: PopoverController,
    private readonly toastController: ToastController,
    private readonly nav2: NavController,
    private readonly institutionService: InstitutionService,
    private readonly loading: LoadingService,
    private readonly sanitizer: DomSanitizer,
    private readonly commerceApiService: CommerceApiService
  ) {
  }

  get userFullName$(): Observable<string> {
    return this.userService.userData.pipe(
      map(({ firstName: fn = '', middleName: mn = '', lastName: ln = '' }: UserInfo) => `${fn} ${mn} ${ln}`),
    );
  }

  ngOnDestroy() {
    this.sourceSubscription.unsubscribe();
  }

  get starClass(): Observable<string> {
    const baseClass = 'user-data__location-star';
    const active = `${baseClass} ${baseClass}--active`;
    return this.location$.pipe(map(({ isFavourite }: MMobileLocationInfo) => `${isFavourite ? active : baseClass}`));
  }

  ngOnInit() {
    this.setContentStrings();
    this.locationId = this.routerLink.snapshot.params.id;
    this.location$ = this.mobileAccessService.getLocationById(this.locationId);
    this.setUserPhoto();
    this.setInstitution();
    this.setInstitutionPhoto();
    this.setInstitutionColor();
    this.userInfoId$ = this.commerceApiService.getCashlessUserId();
  }

  async activateLocation() {
    await this.loading.showSpinner(this.contentString.activateLocationLoader);
    const subscription = this.mobileAccessService.activateMobileLocation(this.locationId).subscribe(
      res => this.loading.closeSpinner().then(() => this.modalHandler(res)),
      () => {
        this.loading.closeSpinner().then(() => this.presentToast(this.contentString.errorResponseActivateLocation));
      },
    );

    this.sourceSubscription.add(subscription);
  }

  favouriteHandler() {
    this.mobileAccessService
      .updateFavouritesList(this.locationId)
      .pipe(take(1))
      .subscribe();
  }

  async modalHandler(res) {
    const popover = await this.popoverCtrl.create({
      component: MobileAccessPopoverComponent,
      componentProps: {
        data: res,
      },
      animated: false,
      backdropDismiss: true,
    });

    popover.onDidDismiss().then(({ role }) => {
      if (role === BUTTON_TYPE.OKAY) {
        this.nav2.navigateBack(`/${NAVIGATE.mobileAccess}`);
      }

      if (role === BUTTON_TYPE.RETRY) {
        this.activateLocation();
      }
    });

    return await popover.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: this.toastDuration,
    });
    toast.present();
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
      map(response => this.sanitizer.bypassSecurityTrustResourceUrl(response)),
    );
  }

  private setContentStrings() {
    const activate = this.mobileAccessService.getContentValueByName(CONTENT_STRINGS.activateBtn);
    const header = this.mobileAccessService.getContentValueByName(CONTENT_STRINGS.headerTitle);
    const activateLocationLoader = this.mobileAccessService.getContentValueByName(
      CONTENT_STRINGS.activateLocationLoader,
    );
    const errorResponseActivateLocation = this.mobileAccessService.getContentValueByName(
      CONTENT_STRINGS.errorResponseActivateLocation,
    );
    const headerTitleActivate = this.mobileAccessService.getContentValueByName(CONTENT_STRINGS.headerTitleActivate);
    const backBtnHeader = this.mobileAccessService.getContentValueByName(CONTENT_STRINGS.backBtnHeader);

    this.contentString = {
      activate,
      header,
      activateLocationLoader,
      errorResponseActivateLocation,
      headerTitleActivate,
      backBtnHeader,
    };
  }

  private setUserPhoto() {
    this.userPhoto$ = this.userService
      .getAcceptedPhoto()
      .pipe(
        map(({ data, mimeType }) => `data:${mimeType};base64,${data}`),
        take(1),
      );
  }

  private setInstitutionColor() {
    this.institutionColor$ = this.mobileAccessService.getInstitutionColor()
      .pipe(map(v => '#' + JSON.parse(v)['native-header-bg']));
  }
}
