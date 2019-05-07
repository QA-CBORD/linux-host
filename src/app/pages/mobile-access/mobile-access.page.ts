import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Events, Platform, ToastController } from '@ionic/angular';
import { Keyboard } from '@ionic-native/keyboard/ngx';

import { BehaviorSubject, combineLatest, Observable, Subscription } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

import { MMobileLocationInfo } from './model';
import { MobileAccessService } from './service';
import { InstitutionService } from '../../core/service/institution/institution.service';
import { MUserInfo } from '../../core/model/user';
import { UserService } from '../../core/service/user-service/user.service';
import { CONTENT_STRINGS, TOAST_MESSAGE } from './mobile-acces.config';

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
  locations$: Observable<MMobileLocationInfo[]>;
  contentString: { [key: string]: string };
  userInfo$: Observable<MUserInfo>;

  constructor(
    private readonly platform: Platform,
    private readonly userService: UserService,
    private readonly events: Events,
    private readonly keyboard: Keyboard,
    private readonly mobileAccessService: MobileAccessService,
    private readonly institutionService: InstitutionService,
    private readonly toastController: ToastController
  ) {
    this.initComponent();
  }

  ngOnDestroy() {
    this.sourceSubscription.unsubscribe();
  }

  ngOnInit() {
    this.setContentStrings();
    this.userInfo$ = this.userService.userData;
  }

  ngAfterViewInit() {
    this.setInstitutionInfo();
    this.setUserInfo();
  }

  refreshLocationList($event) {
    this.mobileAccessService
      .getLocations()
      .pipe(take(1))
      .subscribe(() => $event.target.complete());
  }

  favouriteHandler(id: string) {
    this.mobileAccessService
      .updateFavouritesList(id)
      .pipe(
        switchMap(() => this.mobileAccessService.getLocationById(id)),
        take(1)
      )
      .subscribe(this.presentToast.bind(this), this.errorSavingFavourites.bind(this));
  }

  onSearchedValue(searchString: string) {
    this.searchString$.next(searchString);
  }

  async presentToast({ name, isFavourite }: MMobileLocationInfo) {
    const message = `${name} ${isFavourite ? TOAST_MESSAGE.addedFav : TOAST_MESSAGE.removedFav}`;
    const toast = await this.toastController.create({
      message,
      duration: this.toastDuration,
    });
    toast.present();
  }

  async errorSavingFavourites() {
    const toast = await this.toastController.create({
      message: TOAST_MESSAGE.errorSavingFav,
      duration: this.toastDuration,
    });
    toast.present();
  }

  private setInstitutionInfo() {
    const subscription = this.userInfo$
      .pipe(
        //TODO: add pre download institution photo after back-end will provide this functionality
        // switchMap(({ institutionId: id }: MUserInfo) => {
        //   institutionId = id;
        //   return this.institutionService.getInstitutionPhotoById(institutionId);
        // }),
        switchMap(({ institutionId: id }: MUserInfo) => this.institutionService.getInstitutionDataById(id))
      )
      .subscribe();

    this.sourceSubscription.add(subscription);
  }

  private setContentStrings() {
    let header = this.mobileAccessService.getContentValueByName(CONTENT_STRINGS.headerTitle);
    let search = this.mobileAccessService.getContentValueByName(CONTENT_STRINGS.searchbarPlaceholder);

    header = header ? header : '';
    search = search ? search : '';

    this.contentString = { header, search };
  }

  private setUserInfo() {
    const subscription = this.userService.getAcceptedPhoto().subscribe();

    this.sourceSubscription.add(subscription);
  }

  private initComponent() {
    this.platform.ready().then(() => {
      this.locations$ = combineLatest(this.mobileAccessService.locations, this.searchString$).pipe(
        map(([locations, str]: [MMobileLocationInfo[], string]) => this.filterLocationsBySearchString(str, locations))
      );
    });
  }

  private filterLocationsBySearchString(searchString: string, locations: MMobileLocationInfo[]): MMobileLocationInfo[] {
    return locations.filter(
      ({ name, locationId: id }: MMobileLocationInfo) =>
        this.isIncludedInString(searchString, name) || this.isIncludedInString(searchString, id)
    );
  }

  private isIncludedInString(searchString: string, sourceString: string): boolean {
    return sourceString.toUpperCase().includes(searchString.toUpperCase());
  }
}
