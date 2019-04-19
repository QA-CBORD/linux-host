import {
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Events, Platform } from '@ionic/angular';
import { Keyboard } from '@ionic-native/keyboard/ngx';

import { BehaviorSubject, combineLatest, Observable, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { MMobileLocationInfo } from './model/mobile-access.interface';
import { MobileAccessService } from './service/mobile-access.service';
import { CoordsService } from '../../core/service/coords/coords.service';
import { MGeoCoordinates } from '../../core/model/geolocation/geocoordinates.interface';
import { InstitutionService } from '../../core/service/institution/institution.service';
import { UserService } from '../../core/service/user-service/user.service';
import { MUserInfo } from '../../core/model/user';
import { Institution } from '../../core/model/institution/institution';

@Component({
  selector: 'app-mobile-access',
  templateUrl: './mobile-access.page.html',
  styleUrls: ['./mobile-access.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileAccessPage implements OnDestroy, OnInit, AfterViewInit {
  private readonly sourceSubscription: Subscription = new Subscription();
  private readonly searchString$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private currentCoords: MGeoCoordinates;
  locations$: Observable<MMobileLocationInfo[]>;
  userInfo$: Observable<MUserInfo>;

  constructor(
    private readonly platform: Platform,
    private readonly userService: UserService,
    private readonly events: Events,
    private readonly keyboard: Keyboard,
    private readonly mobileAccessService: MobileAccessService,
    private readonly coordsService: CoordsService,
    private readonly institutionService: InstitutionService
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

  // private handleMobileLocationResult(
  //   newMobileLocations: MMobileLocationInfo[]
  // ) {
  //   /// check for incoming data
  //   if (newMobileLocations && newMobileLocations.length > 0) {
  //     this.bShowNoLocationsAvailable = false;
  //     /// correct any distance value issues for display (make UI friendly)
  //     for (let i = 0; i < newMobileLocations.length; i++) {
  //       newMobileLocations[i].distance > 99
  //         ? (newMobileLocations[i].distance = NaN)
  //         : newMobileLocations[i].distance > 5
  //         ? (newMobileLocations[i].distance = Number(
  //             newMobileLocations[i].distance.toFixed(2)
  //           ))
  //         : (newMobileLocations[i].distance = newMobileLocations[i].distance);
  //     }
  //
  //     if (
  //       !(
  //         this.mobileLocationInfo !== null &&
  //         JSON.stringify(this.mobileLocationInfo) ===
  //           JSON.stringify(newMobileLocations)
  //       )
  //     ) {
  //     }
  //
  //     this.mobileLocationInfo = newMobileLocations;
  //     this.filterLocations();
  //     this.bIsUpdatingLocations = false;
  //   } else {
  //     this.bShowNoLocationsAvailable = true;
  //     ExceptionProvider.showException(this.events, {
  //       displayOptions: Globals.Exception.DisplayOptions.TWO_BUTTON,
  //       messageInfo: {
  //         title: Globals.Exception.Strings.TITLE,
  //         message: 'There are no locations to display',
  //         positiveButtonTitle: 'RETRY',
  //         positiveButtonHandler: () => {
  //           this.retrieveMobileLocationData(true);
  //         },
  //         negativeButtonTitle: 'CLOSE',
  //         negativeButtonHandler: () => {
  //           this.bIsUpdatingLocations = false;
  //           // this.platform.exitApp();
  //         },
  //       },
  //     });
  //   }
  //   this.events.publish(Globals.Events.LOADER_SHOW, { bShow: false });
  // }

  // /**
  //  * Handle user enter key on search bar
  //  */
  // onSearchEnterKey() {
  //   try {
  //     this.keyboard.hide();
  //   } catch (e) {}
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

  refreshLocationList($event) {
    const subscription = this.mobileAccessService
      .getLocations(this.currentCoords)
      .subscribe(() => $event.target.complete());

    this.sourceSubscription.add(subscription);
  }

  private setCoords() {
    const subscription = this.coordsService.coordinates.subscribe(
      (coords: MGeoCoordinates) => (this.currentCoords = coords)
    );

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

  favouriteHandler(id: string) {
    const subscription = this.mobileAccessService.updateFavouritesList(id).subscribe();

    this.sourceSubscription.add(subscription);
  }

  onSearchedValue(searchString: string) {
    this.searchString$.next(searchString);
  }

  private filterLocationsBySearchString(searchString: string, locations: MMobileLocationInfo[]): MMobileLocationInfo[] {
    return locations.filter(
      ({ name, locationId: id }: MMobileLocationInfo) =>
        this.isIncludeInString(searchString, name) || this.isIncludeInString(searchString, id)
    );
  }

  private isIncludeInString(searchString: string, sourseString: string): boolean {
    return sourseString.toUpperCase().includes(searchString.toUpperCase());
  }
}
