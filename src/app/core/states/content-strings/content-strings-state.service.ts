import { Injectable } from '@angular/core';
import { SingleEntityStateManager } from '@core/classes/single-entity-state-manager';
import { ContentStringInfo } from '@core/model/content/content-string-info.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { SettingInfo } from '@core/model/configuration/setting-info.model';
import { distinctUntilChanged, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ContentStringsStateService extends SingleEntityStateManager<ContentStringInfo[]> {
  protected activeUpdaters: number = 0;
  protected state: ContentStringInfo[] = [];
  protected readonly _state$: BehaviorSubject<ContentStringInfo[]> = new BehaviorSubject<ContentStringInfo[]>(this.state);
  protected readonly _isUpdating$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(!!this.activeUpdaters);

  getContentString$(domain: string, category: string, name: string): Observable<ContentStringInfo> {
    return this.state$.pipe(
      map((settings) => {
        if (!settings.length) return null;
        return settings.find(
          ({ domain: d, category: c, name: n }) => domain === d && category === c && name === n,
        );
      }),
      distinctUntilChanged(),
    );
  }

  removeContentString(domain: string, category: string, name: string): void {
    const index = this.state.findIndex(
      ({ category: c, name: n, domain: d }) => d === domain && c === category && n === name,
    );
    if (index !== -1) {
      this.state.splice(index, 1);
    }
    this.setState(this.state);
  }

  clearState(): void {
    this.state = [];
    this.dispatchStateChanges();
  }

  updateState(contentString: ContentStringInfo | ContentStringInfo[] = null): void {
    if (contentString === null) return;
    if (contentString instanceof Array) {
      contentString.forEach((s) => this.resolveAddingContentString(this.state, s));
    } else {
      this.resolveAddingContentString(this.state, contentString);
    }
    this.setState(this.state);
  }

  private resolveAddingContentString(contentStrings: ContentStringInfo[], contentString: ContentStringInfo): void {
    const index = contentStrings.findIndex(({ id }) => contentString.id === id);
    if (index !== -1) {
      contentStrings[index] = contentString;
    } else {
      contentStrings.push(contentString);
    }
  }

  protected dispatchStateChanges(): void {
    this._state$.next([...this.state]);
  }

  protected setState(newState: ContentStringInfo[]): void {
    this.state = JSON.parse(JSON.stringify(newState));
    this.dispatchStateChanges();
  }
}
