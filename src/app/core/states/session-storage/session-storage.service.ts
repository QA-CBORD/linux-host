import { Injectable } from '@angular/core';
import { WebStorageState } from '@core/classes/web-storage-state.service';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService extends WebStorageState {

  constructor() {
    super(window.sessionStorage);
  }
}
