import { UserAccount } from '@core/model/account/account.model';
import { SettingInfo } from '@core/model/configuration/setting-info.model';
import { Observable, of } from 'rxjs';
import { Settings } from 'src/app/app.global';

export const MockAccountsData: { userAccounts: Partial<UserAccount>[]; userSettings: Partial<SettingInfo>[] } = {
  userAccounts: [{ accountDisplayName: 'Unit Test Account' }],
  userSettings: [{ category: "unit.test" }],
};

export class MockAccountsService {
  getUserAccounts = (): Observable<Partial<UserAccount>[]> => of(MockAccountsData.userAccounts);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getUserSettings = (_settings: Settings.Setting[]): Observable<Partial<SettingInfo>[]> => of(MockAccountsData.userSettings);
}
