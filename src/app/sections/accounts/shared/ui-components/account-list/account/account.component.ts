import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UserAccount } from '../../../../../../core/model/account/account.model';

@Component({
  selector: 'st-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountComponent {
  @Input() tabletResolution: boolean;
  @Input() account: UserAccount;
  @Input() lastItem: boolean;
}
