import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { MMobileLocationInfo } from '@sections/dashboard/models';
import { SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'st-activate-location-item',
  templateUrl: './st-activate-location-item.component.html',
  styleUrls: ['./st-activate-location-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StActivateLocationItemComponent {
  @Input() userInfoId: string;
  @Input() isShowId = true;
  @Input() location$: Observable<MMobileLocationInfo>;
  @Input() institutionName: string;
  @Input() userPhoto: string = null;
  @Input() userFullName: string;
  @Input() starClass: string;
  @Input() institutionPhoto: SafeResourceUrl;
  @Input() institutionColor = '';
}
