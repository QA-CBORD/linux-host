import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NavController, PopoverController, ToastController } from '@ionic/angular';

import { map, take } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';

import { UserService } from '../../../core/service/user-service/user.service';
import { MobileAccessService } from '../service';
import { UserInfo } from '../../../core/model/user';
import { InstitutionService } from '../../../core/service/institution/institution.service';
import { MMobileLocationInfo } from '../model';
import { Institution } from '../../../core/model/institution/institution.model';
import { MobileAccessPopoverComponent } from '../mobile-access-popover';
import { LoadingService } from '../../../core/service/loading/loading.service';
import { CONTENT_STRINGS } from '../mobile-acces.config';

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
  userInfo$: Observable<UserInfo>;
  location$: Observable<MMobileLocationInfo>;
  institution$: Observable<Institution>;
  contentString;
  photo: string = null;

  constructor(
    private readonly userService: UserService,
    private readonly routerLink: ActivatedRoute,
    private readonly mobileAccessService: MobileAccessService,
    private readonly popoverCtrl: PopoverController,
    private readonly toastController: ToastController,
    private readonly router: Router,
    private readonly location: Location,
    private readonly nav2: NavController,
    private readonly institutionService: InstitutionService,
    private readonly cdRef: ChangeDetectorRef,
    private readonly loading: LoadingService
  ) {}

  get userFullName$(): Observable<string> {
    return this.userInfo$.pipe(
      map(({ firstName: fn, middleName: mn, lastName: ln }: UserInfo) => `${fn || ''} ${mn || ''} ${ln || ''}`)
    );
  }

  ngOnDestroy() {
    this.sourceSubscription.unsubscribe();
  }

  get starClass(): Observable<string> {
    const cl = 'user-data__location';
    const favourite = 'user-data__location--favourite';
    return this.location$.pipe(map(({ isFavourite }: MMobileLocationInfo) => `${cl} ${isFavourite ? favourite : ''}`));
  }

  ngOnInit() {
    this.setContentStrings();
    this.locationId = this.routerLink.snapshot.params.id;
    this.userInfo$ = this.userService.userData;
    this.location$ = this.mobileAccessService.getLocationById(this.locationId);
    this.setUserPhoto();
    this.setInstitution();
  }

  activateLocation() {
    this.loading.showSpinner(this.contentString.activateLocationLoader);

    const subscription = this.mobileAccessService.activateMobileLocation(this.locationId).subscribe(
      res => this.loading.closeSpinner().then(() => this.modalHandler(res)),
      () => {
        this.loading.closeSpinner().then(() => this.presentToast(this.contentString.errorResponseActivateLocation));
      }
    );

    this.sourceSubscription.add(subscription);
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

    popover.onDidDismiss().then(({ data }) => {
      if (data === 'OKAY') {
        this.nav2.navigateBack('/mobile-access');
      }

      if (data === 'RETRY') {
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
    this.cdRef.detectChanges();
  }
  //TODO: add this function to ngOnInit after back-end will be ready
  // private setInstitutionPhoto() {
  //   this.institutionPhoto$ = this.userInfo$.pipe(
  //     switchMap(({ institutionId }: UserInfo) => this.institutionService.getInstitutionPhotoById(institutionId)),
  //     map(({ data, mimeType }: InstitutionPhotoInfo) => {
  //       return `data:${mimeType};base64,${data}`;
  //     })
  //   );
  // }

  private setContentStrings() {
    let activate = this.mobileAccessService.getContentValueByName(CONTENT_STRINGS.activateBtn);
    let header = this.mobileAccessService.getContentValueByName(CONTENT_STRINGS.headerTitle);
    let activateLocationLoader = this.mobileAccessService.getContentValueByName(CONTENT_STRINGS.activateLocationLoader);
    let errorResponseActivateLocation = this.mobileAccessService.getContentValueByName(
      CONTENT_STRINGS.errorResponseActivateLocation
    );
    let headerTitleActivate = this.mobileAccessService.getContentValueByName(CONTENT_STRINGS.headerTitleActivate);
    let backBtnHeader = this.mobileAccessService.getContentValueByName(CONTENT_STRINGS.backBtnHeader);

    activate = activate ? activate : '';
    header = header ? header : '';
    activateLocationLoader = activateLocationLoader ? activateLocationLoader : '';
    errorResponseActivateLocation = errorResponseActivateLocation ? errorResponseActivateLocation : '';
    headerTitleActivate = headerTitleActivate ? headerTitleActivate : '';
    backBtnHeader = backBtnHeader ? backBtnHeader : '';

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
    this.userService
      .getAcceptedPhoto()
      .pipe(
        map(({ data, mimeType }) => `data:${mimeType};base64,${data}`),
        take(1)
      )
      .subscribe((url: string) => {
        this.photo = url;
        this.cdRef.detectChanges();
      });
  }
}
