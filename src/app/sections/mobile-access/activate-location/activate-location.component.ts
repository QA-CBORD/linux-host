import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, PopoverController } from '@ionic/angular';

import { map, take } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';

import { MobileAccessService } from '../service';
import { MActivateMobileLocationResult, MMobileLocationInfo } from '../model';
import { Institution } from '@core/model/institution';
import { MobileAccessPopoverComponent } from '@sections/mobile-access/mobile-access-popover';
import { LoadingService } from '@core/service/loading/loading.service';
import { CONTENT_STRINGS } from '../mobile-acces.config';
import { BUTTON_TYPE } from '@core/utils/buttons.config';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PATRON_NAVIGATION } from 'src/app/app.global';
import { CommerceApiService } from '@core/service/commerce/commerce-api.service';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { ToastService } from '@core/service/toast/toast.service';
import { getPhotoDataUrl } from '@core/operators/images.operators';
import { UserLocalProfileService } from '@shared/services/user-local-profile/user-local-profile.service';

@Component({
  selector: 'st-activate-location',
  templateUrl: './activate-location.component.html',
  styleUrls: ['./activate-location.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivateLocationComponent implements OnInit, OnDestroy {
  private readonly toastDuration: number = 6000;
  private readonly sourceSubscription: Subscription = new Subscription();
  private readonly _userLocalProfileService = inject(UserLocalProfileService);
  userLocalProfileSignal = this._userLocalProfileService.userLocalProfileSignal;

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
    private readonly routerLink: ActivatedRoute,
    private readonly mobileAccessService: MobileAccessService,
    private readonly popoverCtrl: PopoverController,
    private readonly toastService: ToastService,
    private readonly nav2: NavController,
    private readonly institutionFacadeService: InstitutionFacadeService,
    private readonly loading: LoadingService,
    private readonly sanitizer: DomSanitizer,
    private readonly commerceApiService: CommerceApiService,
    private readonly userFacadeService: UserFacadeService
  ) {}

  ngOnDestroy() {
    this.sourceSubscription.unsubscribe();
  }

  get starClass(): Observable<string> {
    const baseClass = 'user-data__location-star';
    const active = `${baseClass} ${baseClass}--active`;
    return this.location$.pipe(map(({ isFavourite }: MMobileLocationInfo) => `${isFavourite ? active : baseClass}`));
  }

  get starAriaLabel(): Observable<string> {
    return this.location$.pipe(
      map(({ isFavourite, name }: MMobileLocationInfo) =>
        isFavourite
          ? `Selected Favorite Button, Remove ${name} as favorite location, actions available`
          : `Selected Favorite Button, Add ${name} as favorite location, actions available`
      )
    );
  }

  ngOnInit() {
    this.setContentStrings();
    this.locationId = this.routerLink.snapshot.params.id;
    this.location$ = this.mobileAccessService.getLocationById(this.locationId);
    this.setUserPhoto();
    this.setInstitutionPhoto();
    this.setInstitutionColor();
    this.userInfoId$ = this.commerceApiService.getCashlessUserId();
  }

  async activateLocation() {
    await this.loading.showSpinner({ message: this.contentString.activateLocationLoader });
    const subscription = this.mobileAccessService
      .activateMobileLocation(this.locationId)
      .pipe(take(1))
      .subscribe(
        res => this.loading.closeSpinner().then(() => this.modalHandler(res)),
        () => {
          this.loading.closeSpinner().then(() => this.presentToast(this.contentString.errorResponseActivateLocation));
        }
      );

    this.sourceSubscription.add(subscription);
  }

  favouriteHandler() {
    this.mobileAccessService.updateFavouritesList(this.locationId).pipe(take(1)).subscribe();
  }

  async modalHandler(res: MActivateMobileLocationResult) {
    const popover = await this.popoverCtrl.create({
      cssClass: 'sc-popover',
      component: MobileAccessPopoverComponent,
      componentProps: {
        data: res,
      },
      animated: false,
      backdropDismiss: true,
    });

    popover.onDidDismiss().then(({ role }) => {
      if (role === BUTTON_TYPE.OKAY) {
        this.nav2.navigateBack(`/${PATRON_NAVIGATION.mobileAccess}`);
      }

      if (role === BUTTON_TYPE.RETRY) {
        this.activateLocation();
      }
    });

    return await popover.present();
  }

  async presentToast(message: string) {
    await this.toastService.showToast({ message, duration: this.toastDuration });
  }

  private setInstitutionPhoto() {
    this.institution$ = this.institutionFacadeService.cachedInstitutionInfo$;
    this.institutionPhoto$ = this.institutionFacadeService.cachedInstitutionPhoto$.pipe(
      getPhotoDataUrl(),
      map(response => this.sanitizer.bypassSecurityTrustResourceUrl(response))
    );
  }

  private setContentStrings() {
    const activate = this.mobileAccessService.getContentValueByName(CONTENT_STRINGS.activateBtn);
    const header = this.mobileAccessService.getContentValueByName(CONTENT_STRINGS.headerTitle);
    const activateLocationLoader = this.mobileAccessService.getContentValueByName(
      CONTENT_STRINGS.activateLocationLoader
    );
    const errorResponseActivateLocation = this.mobileAccessService.getContentValueByName(
      CONTENT_STRINGS.errorResponseActivateLocation
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
    this.userPhoto$ = this.userFacadeService.getAcceptedPhoto$();
  }

  private setInstitutionColor() {
    this.institutionColor$ = this.mobileAccessService
      .getInstitutionColor()
      .pipe(map(v => '#' + (JSON.parse(v) ? JSON.parse(v)['native-header-bg'] : '')));
  }
}
