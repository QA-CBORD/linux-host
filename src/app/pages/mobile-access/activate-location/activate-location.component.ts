import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Events, PopoverController } from '@ionic/angular';

import { map, tap } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';

import { UserService } from '../../../core/service/user-service/user.service';
import { MobileAccessService } from '../service/mobile-access.service';
import { CoordsService } from '../../../core/service/coords/coords.service';
import * as Globals from '../../../app.global';
import { ExceptionProvider } from '../../../core/provider/exception-provider/exception.provider';
import { MUserInfo } from '../../../core/model/user/user-info.interface';
import { MGeoCoordinates } from '../../../core/model/geolocation/geocoordinates.interface';

@Component({
  selector: 'st-activate-location',
  templateUrl: './activate-location.component.html',
  styleUrls: ['./activate-location.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivateLocationComponent implements OnInit, OnDestroy {
  private readonly spinnerMessage = 'Activating locations...';
  private readonly sourceSubscription: Subscription = new Subscription();
  userInfo$: Observable<MUserInfo>;
  photoUrl$: Observable<string>;
  locationId: string;
  coords: any;

  constructor(
    private readonly userService: UserService,
    private readonly routerLink: ActivatedRoute,
    private readonly mobileAccessService: MobileAccessService,
    private readonly geoDataService: CoordsService,
    private readonly events: Events,
    private readonly popoverCtrl: PopoverController,
    private readonly router: Router,
    private readonly location: Location,
  ) {
  }

  get userFullName$(): Observable<string> {
    return this.userInfo$.pipe(
      map((user: MUserInfo) =>
        `${user.firstName || ''} ${user.lastName || ''} ${user.middleName || ''}`,
      ),
    );
  }

  ngOnInit() {
    this.locationId = this.routerLink.snapshot.params.id;
    this.userInfo$ = this.userService.getUser();
    this.setUserPhoto();
    this.setCoords();
  }

  ngOnDestroy() {
    this.sourceSubscription.unsubscribe();
  }

  activateLocation() {
    this.spinnerHandler(true);

    const subscription = this.mobileAccessService
      .activateMobileLocation(this.locationId, this.coords)
      .pipe(tap(() => this.spinnerHandler()))
      .subscribe(({ responseCode: status, message }) => this.modalHandler(message, status !== '00'));

    this.sourceSubscription.add(subscription);
  }

  private setUserPhoto() {
    this.photoUrl$ = this.userService
      .getAcceptedPhoto()
      .pipe(map(({ data, mimeType }) => `data:${mimeType};base64,${data}`));
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

  private modalHandler(message: string, error: boolean = false) {
    const successTittle = 'Success!';
    const errorTittle = 'Fail!';
    const title = error ? errorTittle : successTittle;

    ExceptionProvider.showException(this.events, {
      displayOptions: Globals.Exception.DisplayOptions.ONE_BUTTON,
      messageInfo: {
        title,
        message,
        positiveButtonTitle: 'OK',
        positiveButtonHandler: () => {
          this.closeModalHandler();
        },
      },
    });
  }

  private closeModalHandler() {
    this.events.publish(Globals.Events.LOADER_SHOW, { bShow: false });
    this.location.back();
  }
}
