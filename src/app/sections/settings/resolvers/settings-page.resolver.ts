import { inject } from '@angular/core';
import { forkJoin } from 'rxjs';
import { LoadingService } from '@core/service/loading/loading.service';
import { finalize, first } from 'rxjs/operators';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import { CONTENT_STRINGS_DOMAINS, CONTENT_STRINGS_CATEGORIES } from 'src/app/content-strings';
import { ContentStringInfo } from '@core/model/content/content-string-info.model';

// Functional resolver
export const settingsPageResolver: ResolveFn<[ContentStringInfo[]]> = (
  _route: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot,
  loadingService = inject(LoadingService),
  contentStringFacadeService = inject(ContentStringsFacadeService)
) => {
  loadingService.showSpinner();
  return forkJoin([
    contentStringFacadeService.fetchContentStrings$(
      CONTENT_STRINGS_DOMAINS.patronUi,
      CONTENT_STRINGS_CATEGORIES.mobileCredential
    ),
  ]).pipe(
    finalize(() => {
      loadingService.closeSpinner();
    }),
    first()
  );
};
