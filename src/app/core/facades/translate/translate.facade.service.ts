import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ContentStringsStateService } from '@core/states/content-strings/content-strings-state.service';
import { tap } from 'rxjs';
import { CONTENT_STRINGS_DOMAINS, CONTENT_STRINGS_CATEGORIES } from 'src/app/content-strings';
import { ORDERING_CONTENT_STRINGS } from '@sections/ordering/ordering.config';

@Injectable({
  providedIn: 'root',
})
export class TranslateFacadeService {
  constructor(
    private readonly translateService: TranslateService,
    private readonly contentStringsStateService: ContentStringsStateService
  ) {}

  public listenForContentStringStateChanges() {
    this.contentStringsStateService.state$
      .pipe(
        tap(contentStrings => {
          if (!contentStrings.length) return;
          const csObj = {};
          contentStrings.forEach(cs => {
            if (!cs.value) return;
            [cs.domain, cs.category, cs.name].reduce(function (csObj, path) {
              // If property does not exist assign empty object
              if (!csObj[path]) {
                csObj[path] = {};
              }
              return csObj[path];
            }, csObj);
            // Assign content string value to translation
            csObj[cs.domain][cs.category][cs.name] = cs.value;
          });
          this.translateService.setTranslation(this.translateService.currentLang, csObj, true);
        })
      )
      .subscribe();
  }

  instant(key: string, interpolateParams?: object): string {
    return this.translateService.instant(key, interpolateParams);
  }

  orderingInstant(name: ORDERING_CONTENT_STRINGS, interpolateParams?: object): string {
    return this.translateService.instant(
      `${CONTENT_STRINGS_DOMAINS.patronUi}.${CONTENT_STRINGS_CATEGORIES.ordering}.${name}`,
      interpolateParams
    );
  }

  errorCommonInstant(name: ORDERING_CONTENT_STRINGS, interpolateParams?: object): string {
    return this.translateService.instant(
      `${CONTENT_STRINGS_DOMAINS.get_common}.${CONTENT_STRINGS_CATEGORIES.error}.${name}`,
      interpolateParams
    );
  }
}
