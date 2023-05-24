import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';

import { BehaviorSubject, combineLatest, Observable, Subscription } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

import { MMobileLocationInfo } from './model';
import { MobileAccessService } from './service';
import { UserInfo } from '../../core/model/user';
import { CONTENT_STRINGS } from './mobile-acces.config';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { Keyboard } from '@capacitor/keyboard';
import { SearchbarCustomEvent } from '@ionic/angular';
import { NativeProvider } from '@core/provider/native-provider/native.provider';

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
    private readonly userFacadeService: UserFacadeService,
    private readonly mobileAccessService: MobileAccessService,
    private readonly institutionFacadeService: InstitutionFacadeService,
    private readonly nativeProvider: NativeProvider,
  ) {
    this.initComponent();
  }

  ngOnDestroy() {
    this.sourceSubscription.unsubscribe();
  }

  ngOnInit() {
    this.setContentStrings();
    this.userInfo$ = this.userFacadeService.getUserData$();
  }

  ngAfterViewInit() {
    this.setInstitutionInfo();
    this.setUserInfo();
  }

  onEnterKeyClicked() {
    if (this.nativeProvider.isMobile()) Keyboard.hide();
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

  onSearchedValue({ target: { value } }: SearchbarCustomEvent) {
    this.searchString$.next(value);
  }

  private setInstitutionInfo() {
    const subscription = this.userInfo$
      .pipe(
        //TODO: add pre download institution photo after back-end will provide this functionality
        // switchMap(({ institutionId: id }: UserInfo) => {
        //   institutionId = id;
        //   return this.institutionService.getInstitutionPhoto$(institutionId);
        // }),
        switchMap(({ institutionId: id }: UserInfo) => this.institutionFacadeService.getInstitutionInfo$(id))
      )
      .subscribe();

    this.sourceSubscription.add(subscription);
  }

  private setContentStrings() {
    const header = this.mobileAccessService.getContentValueByName(CONTENT_STRINGS.headerTitle);
    const search = this.mobileAccessService.getContentValueByName(CONTENT_STRINGS.searchbarPlaceholder);
    const pullRefreshLabel = this.mobileAccessService.getContentValueByName(CONTENT_STRINGS.labelPullToRefresh);
    const backBtn = this.mobileAccessService.getContentValueByName(CONTENT_STRINGS.backBtnHeader);

    this.contentString = { header, search, pullRefreshLabel, backBtn };
  }

  private setUserInfo() {
    const subscription = this.userFacadeService.getAcceptedPhoto$().subscribe();

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
