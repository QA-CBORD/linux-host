import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { MobileAccessService } from './services/mobile-access.service';
import { MMobileLocationInfo } from '@sections/dashboard/models';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { NAVIGATE } from '../../../../app.global';
import { LOCAL_ROUTING } from '@sections/mobile-access/mobile-acces.config';

@Component({
  selector: 'st-mobile-access-tile',
  templateUrl: './mobile-access-tile.component.html',
  styleUrls: ['./mobile-access-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileAccessTileComponent implements OnInit {
  accessList$: Observable<MMobileLocationInfo[]>;
  isLoadingData = true;
  maxAmount: number = 4;
  skeletonArray: any[] = new Array(this.maxAmount);

  constructor(private readonly mobileAccessService: MobileAccessService,
              private readonly router: Router) {
  }

  ngOnInit() {
    this.accessList$ = this.mobileAccessService.getLocations().pipe(
      map((locations) => locations.slice(0, this.maxAmount)),
      tap(() => this.isLoadingData = false),
    );
  }

  navigateTo(locationId) {
    this.router.navigate([`/${NAVIGATE.mobileAccess}/${LOCAL_ROUTING.activate}/${locationId}`]);
  }
}
