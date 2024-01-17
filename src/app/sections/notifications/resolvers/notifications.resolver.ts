import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import { ContentStringInfo } from '@core/model/content/content-string-info.model';
import { forkJoin } from 'rxjs';
import { CONTENT_STRINGS_DOMAINS, CONTENT_STRINGS_CATEGORIES } from 'src/app/content-strings';

export const notificationsResolver: ResolveFn<[ContentStringInfo[]]> = () => {
  const contentStringsFacadeService: ContentStringsFacadeService = inject(ContentStringsFacadeService);
  return forkJoin([
    contentStringsFacadeService.fetchContentStrings$(
      CONTENT_STRINGS_DOMAINS.patronUi,
      CONTENT_STRINGS_CATEGORIES.notifications
    ),
  ]);
};
