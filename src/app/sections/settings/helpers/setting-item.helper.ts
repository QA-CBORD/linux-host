import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { map } from 'rxjs/operators';
import { UserInfo } from '@core/model/user';

export function getCardStatus(service: UserFacadeService): Promise<boolean> {
  return service
    .getUserData$()
    .pipe(map((userInfo: UserInfo) => userInfo.hasCashlessCard && userInfo.cashlessMediaStatus === 2))
    .toPromise();
}
