import { inject } from '@angular/core';
import { forkJoin } from 'rxjs';
import { LoadingService } from '@core/service/loading/loading.service';
import { finalize, first } from 'rxjs/operators';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import { CONTENT_STRINGS_DOMAINS, CONTENT_STRINGS_CATEGORIES } from 'src/app/content-strings';
import { ContentStringInfo } from '@core/model/content/content-string-info.model';

// Functional resolver
export const photoUploadResolver: ResolveFn<[ContentStringInfo[]]> = (
  _route: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot
) => {
  const loadingService = inject(LoadingService);
  loadingService.showSpinner();
  return forkJoin([
    inject(ContentStringsFacadeService).fetchContentStrings$(
      CONTENT_STRINGS_DOMAINS.get_mobile,
      CONTENT_STRINGS_CATEGORIES.photoUpload
    )
  ]).pipe(
    finalize(() => {
      loadingService.closeSpinner();
    }),
    first()
  );
};
