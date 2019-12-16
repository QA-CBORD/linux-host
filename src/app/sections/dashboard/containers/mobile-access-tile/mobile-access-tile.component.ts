import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { MobileAccessService } from './services/mobile-access.service';
import { MMobileLocationInfo } from '@sections/dashboard/models';
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
  maxAmount: number = 4;
  skeletonArray: any[] = new Array(this.maxAmount);

  constructor(private readonly mobileAccessService: MobileAccessService) {
  }

  ngOnInit() {
    this.accessList$ = this.mobileAccessService.getLocations().pipe(
      map((locations) => locations.slice(0, this.maxAmount)),
      tap(() => this.isLoadingData = false),
    );
  }
}
