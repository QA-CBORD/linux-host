import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { SettingInfo } from '../../../../../core/model/configuration/setting-info.model';
import { AccountsService } from '../../../services/accounts.service';
import { NAVIGATE } from '../../../../../app.global';
import { MENU_LIST_ITEMS, MENU_LIST_ROUTES } from './local.config';
import { MenuReceivingFundsListItem } from '../../../models/menu-list-item';

@Component({
  selector: 'st-menu-receiving-funds',
  templateUrl: './menu-receiving-funds.component.html',
  styleUrls: ['./menu-receiving-funds.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuReceivingFundsComponent implements OnInit {
  menuItems$: Observable<MenuReceivingFundsListItem[]>;

  constructor(private readonly accountsService: AccountsService, private readonly router: Router) {}

  ngOnInit() {
    this.menuItems$ = this.accountsService.settings$.pipe(map(settings => this.handleListItems(settings)));
  }

  get hasShowedItem$(): Observable<boolean> {
    return this.menuItems$.pipe(map(items => items.some(({ isShow }) => isShow)));
  }

  redirect(name: string) {
    this.router.navigate([NAVIGATE.accounts, MENU_LIST_ROUTES.get(name)], { skipLocationChange: true });
  }

  trackByMenuName(i: number, {name}: MenuReceivingFundsListItem): string {
    return name;
  }

  private handleListItems(settings: SettingInfo[]): MenuReceivingFundsListItem[] {
    const navList = Array.from(MENU_LIST_ITEMS.keys());

    return navList.map(element => {
      const setting = settings.find(setting => setting.name === element);
      return setting && { name: setting.name, isShow: Boolean(Number(setting.value)) };
    });
  }
}
