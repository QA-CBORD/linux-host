import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import { UserNotificationsFacadeService } from '@core/facades/notifications/user-notifications.service';
import { ContentStringInfo } from '@core/model/content/content-string-info.model';
import { forkJoin } from 'rxjs';
import { CONTENT_STRINGS_DOMAINS, CONTENT_STRINGS_CATEGORIES } from 'src/app/content-strings';

export const notificationsResolver: ResolveFn<[ContentStringInfo[], void]> = () => {
  const contentStringsFacadeService: ContentStringsFacadeService = inject(ContentStringsFacadeService);
  const userNotificationsFacadeService: UserNotificationsFacadeService = inject(UserNotificationsFacadeService);
  return forkJoin([
    contentStringsFacadeService.fetchContentStrings$(
      CONTENT_STRINGS_DOMAINS.patronUi,
      CONTENT_STRINGS_CATEGORIES.notifications
    ),
    userNotificationsFacadeService.fetchNotifications(),
  ]);
};
