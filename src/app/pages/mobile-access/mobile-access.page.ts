import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Events, Platform, ToastController } from '@ionic/angular';
import { Keyboard } from '@ionic-native/keyboard/ngx';

import { BehaviorSubject, combineLatest, Observable, Subscription } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

import { MMobileLocationInfo } from './model/mobile-access.interface';
import { MobileAccessService } from './service/mobile-access.service';
import { CoordsService } from '../../core/service/coords/coords.service';
import { MGeoCoordinates } from '../../core/model/geolocation/geocoordinates.interface';
import { InstitutionService } from '../../core/service/institution/institution.service';
import { MUserInfo } from '../../core/model/user';
import { UserService } from '../../core/service/user-service/user.service';

@Component({
  selector: 'app-mobile-access',
  templateUrl: './mobile-access.page.html',
  styleUrls: ['./mobile-access.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileAccessPage implements OnDestroy, OnInit, AfterViewInit {
  private readonly sourceSubscription: Subscription = new Subscription();
  private readonly searchString$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private readonly toastDuration: number = 1000;
  private currentCoords: MGeoCoordinates;
  private tempTitle: string = 'Mobile Access';
  locations$: Observable<MMobileLocationInfo[]>;
  userInfo$: Observable<MUserInfo>;

  constructor(
    private readonly platform: Platform,
    private readonly userService: UserService,
    private readonly events: Events,
    private readonly keyboard: Keyboard,
    private readonly mobileAccessService: MobileAccessService,
    private readonly coordsService: CoordsService,
    private readonly institutionService: InstitutionService,
    private readonly toastController: ToastController
  ) {
    this.initComponent();
  }
  // /**
  //  * Make request to retrieve Mobile Location information and handle response
  //  */
  // private retrieveMobileLocationData(bShowLoader: boolean) {
  //   this.bIsUpdatingLocations = true;
  //   if (bShowLoader) {
  //     this.events.publish(Globals.Events.LOADER_SHOW, {
  //       bShow: true,
  //       message: 'Retrieving locations...',
  //     });
  //   }
  //   this.sourceSubscription.add(
  //     this.mobileAccessProvider.getMobileLocationData(this.geoData).subscribe(
  //       mobileLocationData => {
  //         this.handleMobileLocationResult(mobileLocationData);
  //       },
  //       (error: Error) => {
  //         let errorMessage =
  //           'An error occurred while trying to retrieve your information.';
  //         if (error != null && error.message) {
  //           errorMessage = error.message;
  //         }
  //         this.events.publish(Globals.Events.LOADER_SHOW, { bShow: false });
  //         ExceptionProvider.showException(this.events, {
  //           displayOptions: Globals.Exception.DisplayOptions.TWO_BUTTON,
  //           messageInfo: {
  //             title: Globals.Exception.Strings.TITLE,
  //             message: errorMessage,
  //             positiveButtonTitle: 'RETRY',
  //             positiveButtonHandler: () => {
  //               this.retrieveMobileLocationData(true);
  //             },
  //             negativeButtonTitle: 'CLOSE',
  //             negativeButtonHandler: () => {
  //               this.bIsUpdatingLocations = false;
  //               // this.platform.exitApp();
  //             },
  //           },
  //         });
  //       }
  //     )
  //   );
  // }

  ngOnDestroy() {
    this.sourceSubscription.unsubscribe();
  }

  ngOnInit() {
    this.userInfo$ = this.userService.userData;
    this.setCoords();
  }

  ngAfterViewInit() {
    this.setInstitutionInfo();
    this.setUserInfo();
  }

  refreshLocationList($event) {
    const subscription = this.mobileAccessService
      .getLocations(this.currentCoords)
      .subscribe(() => $event.target.complete());

    this.sourceSubscription.add(subscription);
  }

  favouriteHandler(id: string) {
    this.mobileAccessService
      .updateFavouritesList(id)
      .pipe(
        switchMap(() => this.mobileAccessService.getLocationById(id)),
        take(1)
      )
      .subscribe(this.presentToast.bind(this));
  }

  onSearchedValue(searchString: string) {
    this.searchString$.next(searchString);
  }

  async presentToast({ name, isFavourite }: MMobileLocationInfo) {
    const addLocationMessage = 'was added to your favourite list';
    const removeLocationMessage = 'was removed from your favourite list';

    const message = `${name} ${isFavourite ? addLocationMessage : removeLocationMessage}`;
    const toast = await this.toastController.create({
      message,
      duration: this.toastDuration,
    });
    toast.present();
  }

  private setInstitutionInfo() {
    let institutionId;
    const subscription = this.userInfo$
      .pipe(
        switchMap(({ institutionId: id }: MUserInfo) => {
          institutionId = id;
          return this.institutionService.getInstitutionPhotoById(institutionId);
        }),
        switchMap(() => this.institutionService.getInstitutionDataById(institutionId))
      )
      .subscribe();

    this.sourceSubscription.add(subscription);
  }

  private setUserInfo() {
    const subscription = this.userService.getAcceptedPhoto().subscribe();

    this.sourceSubscription.add(subscription);
  }

  // START REDESIGN:
  private initComponent() {
    this.platform.ready().then(() => {
      this.locations$ = combineLatest(this.mobileAccessService.locations, this.searchString$).pipe(
        map(([locations, str]: [MMobileLocationInfo[], string]) => this.filterLocationsBySearchString(str, locations))
      );
    });
  }

  private setCoords() {
    const subscription = this.coordsService.coordinates.subscribe(
      (coords: MGeoCoordinates) => (this.currentCoords = coords)
    );

    this.sourceSubscription.add(subscription);
  }

  private filterLocationsBySearchString(searchString: string, locations: MMobileLocationInfo[]): MMobileLocationInfo[] {
    return locations.filter(
      ({ name, locationId: id }: MMobileLocationInfo) =>
        this.isIncludeInString(searchString, name) || this.isIncludeInString(searchString, id)
    );
  }

  private isIncludeInString(searchString: string, sourceString: string): boolean {
    return sourceString.toUpperCase().includes(searchString.toUpperCase());
  }
}
