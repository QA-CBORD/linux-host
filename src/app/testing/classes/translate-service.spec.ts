import { EventEmitter } from '@angular/core';
import { of } from 'rxjs';

// Test for the TranslateServiceStub class
describe('AppComponent', () => {
  it('can load instance', () => {
    expect(new TranslateServiceStub()).toBeTruthy();
  });
});

export class TranslateServiceStub {
  onLangChange = new EventEmitter();
  onTranslationChange = new EventEmitter();
  onDefaultLangChange = new EventEmitter();

  public get(key: any): any {
    return of(key);
  }

  public instant(key: any): any {
    return key;
  }
}
