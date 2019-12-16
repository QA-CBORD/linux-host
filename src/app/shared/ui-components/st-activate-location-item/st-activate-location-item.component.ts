import { ChangeDetectionStrategy, Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInfo } from '../../../core/model/user';
import { Institution } from '../../../core/model/institution/institution.model';
import { MMobileLocationInfo } from '@sections/dashboard/models';

@Component({
  selector: 'st-activate-location-item',
  templateUrl: './st-activate-location-item.component.html',
  styleUrls: ['./st-activate-location-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StActivateLocationItemComponent implements OnInit {
  @Input() userInfoId: string;
  @Input() location$: Observable<MMobileLocationInfo>;
  @Input() institutionName: string;
  @Input() userPhoto: string = null;
  @Input() userFullName: string;
  @Input() starClass;
  @Input() institutionPhoto;
 
  constructor() {}

  ngOnInit() {}

}
