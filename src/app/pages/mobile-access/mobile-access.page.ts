import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Events, Platform } from '@ionic/angular';
import { Keyboard } from '@ionic-native/keyboard/ngx';

import { BehaviorSubject, combineLatest, Observable, Subscription } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

import { MMobileLocationInfo } from './model';
import { MobileAccessService } from './service';
import { InstitutionService } from '../../core/service/institution/institution.service';
import { UserInfo } from '../../core/model/user';
import { UserService } from '../../core/service/user-service/user.service';
import { CONTENT_STRINGS } from './mobile-acces.config';

@Component({
  selector: 'app-mobile-access',
  templateUrl: './mobile-access.page.html',
  styleUrls: ['./mobile-access.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileAccessPage implements OnDestroy, OnInit, AfterViewInit {
  private readonly sourceSubscription: Subscription = new Subscription();
  private readonly searchString$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  locations$: Observable<MMobileLocationInfo[]>;
  contentString: { [key: string]: string };
  userInfo$: Observable<UserInfo>;

  constructor(
    private readonly platform: Platform,
    private readonly userService: UserService,
    private readonly events: Events,
    private readonly keyboard: Keyboard,
    private readonly mobileAccessService: MobileAccessService,
    private readonly institutionService: InstitutionService
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

  onEnterKeyClicked() {
    if (this.keyboard) {
      this.keyboard.hide();
    }
  }

  refreshLocationList($event) {
    this.mobileAccessService
      .getLocations()
      .pipe(take(1))
      .subscribe(
        () => {
          $event.target.complete();
        },
        () => {
          $event.target.complete();
        }
      );
  }

  favouriteHandler(id: string) {
    this.mobileAccessService
      .updateFavouritesList(id)
      .pipe(take(1))
      .subscribe();
  }

  onSearchedValue({ target: { value } }: any) {
    this.searchString$.next(value);
  }

  private setInstitutionInfo() {
    const subscription = this.userInfo$
      .pipe(
        //TODO: add pre download institution photo after back-end will provide this functionality
        // switchMap(({ institutionId: id }: UserInfo) => {
        //   institutionId = id;
        //   return this.institutionService.getInstitutionPhotoById(institutionId);
        // }),
        switchMap(({ institutionId: id }: UserInfo) => this.institutionService.getInstitutionDataById(id))
      )
      .subscribe();

    this.sourceSubscription.add(subscription);
  }

  private setContentStrings() {
    const header = this.mobileAccessService.getContentValueByName(CONTENT_STRINGS.headerTitle);
    const search = this.mobileAccessService.getContentValueByName(CONTENT_STRINGS.searchbarPlaceholder);
    const pullRefreshLabel = this.mobileAccessService.getContentValueByName(CONTENT_STRINGS.labelPullToRefresh);

    this.contentString = { header, search, pullRefreshLabel };
  }

  private setUserInfo() {
    const subscription = this.userService.getAcceptedPhoto().subscribe();
    this.sourceSubscription.add(subscription);
  }

  private initComponent() {
    this.locations$ = combineLatest(this.mobileAccessService.locations, this.searchString$).pipe(
      map(([locations, str]: [MMobileLocationInfo[], string]) => this.filterLocationsBySearchString(str, locations))
    );
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
