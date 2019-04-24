import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Events, PopoverController } from '@ionic/angular';

import { map, take, tap } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';

import { UserService } from '../../../core/service/user-service/user.service';
import { MobileAccessService } from '../service/mobile-access.service';
import { CoordsService } from '../../../core/service/coords/coords.service';
import * as Globals from '../../../app.global';
import { MUserInfo } from '../../../core/model/user';
import { MGeoCoordinates } from '../../../core/model/geolocation/geocoordinates.interface';
import { InstitutionService } from '../../../core/service/institution/institution.service';
import { MMobileLocationInfo } from '../model/mobile-access.interface';
import { Institution } from '../../../core/model/institution/institution';
import { StPopoverComponent } from '../st-popover/st-popover.component';

@Component({
  selector: 'st-activate-location',
  templateUrl: './activate-location.component.html',
  styleUrls: ['./activate-location.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivateLocationComponent implements OnInit, OnDestroy {
  private readonly spinnerMessage = 'Activating location...';
  private readonly sourceSubscription: Subscription = new Subscription();
  private readonly staticBgImage: string = '/assets/images/card_background_illustration.svg';
  private locationId: string;
  private coords: any;
  userInfo$: Observable<MUserInfo>;
  location$: Observable<MMobileLocationInfo>;
  institution$: Observable<Institution>;
  private tempTitle: string = 'Mobile Access';
  photo: string;

  constructor(
    private readonly userService: UserService,
    private readonly routerLink: ActivatedRoute,
    private readonly mobileAccessService: MobileAccessService,
    private readonly geoDataService: CoordsService,
    private readonly events: Events,
    private readonly popoverCtrl: PopoverController,
    private readonly router: Router,
    private readonly location: Location,
    private readonly institutionService: InstitutionService,
    private readonly cdRef: ChangeDetectorRef
  ) {}

  get userFullName$(): Observable<string> {
    return this.userInfo$.pipe(
      map(({ firstName: fn, middleName: mn, lastName: ln }: MUserInfo) => `${fn || ''} ${mn || ''} ${ln || ''}`)
    );
  }

  ngOnDestroy() {
    this.sourceSubscription.unsubscribe();
  }

  ngOnInit() {
    this.locationId = this.routerLink.snapshot.params.id;
    this.userInfo$ = this.userService.userData;
    this.location$ = this.mobileAccessService.getLocationById(this.locationId);
    this.setUserPhoto();
    this.setCoords();
    this.setInstitution();
  }

  activateLocation() {
    // TODO: create Spinner in some special service:
    this.spinnerHandler(true);

    const subscription = this.mobileAccessService
      .activateMobileLocation(this.locationId, this.coords)
      .pipe(tap(() => this.spinnerHandler()))
      .subscribe(res => this.modalHandler(res), () => this.spinnerHandler());

    this.sourceSubscription.add(subscription);
  }

  async modalHandler(res) {
    const popover = await this.popoverCtrl.create({
      component: StPopoverComponent,
      componentProps: {
        data: res,
      },
      animated: false,
      backdropDismiss: true,
    });

    popover.onDidDismiss().then(({ data }) => {
      if (data === 'OKAY') {
        this.location.back();
      }

      if (data === 'RETRY') {
        this.activateLocation();
      }
    });

    return await popover.present();
  }

  private setInstitution() {
    this.institution$ = this.institutionService.institutionData.pipe(tap(data => console.log(data)));
    this.cdRef.detectChanges();
  }
  //TODO: add this function to ngOnInit after back-end will be ready
  // private setInstitutionPhoto() {
  //   this.institutionPhoto$ = this.userInfo$.pipe(
  //     switchMap(({ institutionId }: MUserInfo) => this.institutionService.getInstitutionPhotoById(institutionId)),
  //     map(({ data, mimeType }: InstitutionPhotoInfo) => {
  //       return `data:${mimeType};base64,${data}`;
  //     })
  //   );
  // }

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

  private setCoords() {
    const subscription = this.geoDataService
      .initCoords()
      .subscribe((coords: MGeoCoordinates) => (this.coords = coords));

    this.sourceSubscription.add(subscription);
  }

  private spinnerHandler(started: boolean = false) {
    const start = {
      bShow: true,
      message: this.spinnerMessage,
    };
    const stop = { bShow: false };
    const loaderArgs = started ? start : stop;

    this.events.publish(Globals.Events.LOADER_SHOW, loaderArgs);
  }
}
