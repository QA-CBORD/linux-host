import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { finalize, map, take } from 'rxjs/operators';
import { MobileAccessService } from './services/mobile-access.service';
import { MMobileLocationInfo } from '@sections/dashboard/models';
import { Router } from '@angular/router';
import { PATRON_NAVIGATION } from '../../../../app.global';
import { LOCAL_ROUTING } from '@sections/mobile-access/mobile-acces.config';
import { Observable } from 'rxjs';

@Component({
  selector: 'st-mobile-access-tile',
  templateUrl: './mobile-access-tile.component.html',
  styleUrls: ['./mobile-access-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileAccessTileComponent implements OnInit {
  accessList$: Observable<MMobileLocationInfo[]>;
  isLoadingData = true;
  maxAmount = 4;
  skeletonArray: any[] = new Array(this.maxAmount);

  constructor(
    private readonly mobileAccessService: MobileAccessService,
    private readonly router: Router,
    private readonly cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getLocations();
  }

  getLocations() {
    this.accessList$ = this.mobileAccessService.getLocations().pipe(
      take(1),
      map(locations => locations.slice(0, this.maxAmount)),
      finalize(() => {
        this.isLoadingData = false;
        this.cdRef.detectChanges();
      })
    )
    this.accessList$.subscribe();
  }

  navigateTo(locationId) {
    this.router.navigate([`/${PATRON_NAVIGATION.mobileAccess}/${LOCAL_ROUTING.activate}/${locationId}`]);
  }
}
