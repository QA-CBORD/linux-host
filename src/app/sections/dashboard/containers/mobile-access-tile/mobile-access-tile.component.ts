import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { finalize, take } from 'rxjs/operators';
import { MobileAccessService } from './services/mobile-access.service';
import { MMobileLocationInfo } from '@sections/dashboard/models';
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
  accessList: MMobileLocationInfo[];
  isLoadingData = true;
  maxAmount: number = 4;
  skeletonArray: any[] = new Array(this.maxAmount);

  constructor(
    private readonly mobileAccessService: MobileAccessService,
    private readonly router: Router,
    private readonly cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {

    // TODO: Look at | async type implementation
    this.mobileAccessService
      .getLocations()
      .pipe(
        take(1),
        finalize(() => {
          this.isLoadingData = false;
          this.cdRef.detectChanges();
        })
      )
      .subscribe(locations => {
        this.accessList = locations.slice(0, this.maxAmount);
      });
  }

  navigateTo(locationId) {
    this.router.navigate([`/${NAVIGATE.mobileAccess}/${LOCAL_ROUTING.activate}/${locationId}`]);
  }
}
