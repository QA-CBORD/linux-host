import { EventEmitter } from "@angular/core";
import { of } from "rxjs";

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
  