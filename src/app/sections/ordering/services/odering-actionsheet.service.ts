import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderActionSheetService {
  private openActionSheetSubject = new Subject<void>();

  openActionSheet(): void {
    this.openActionSheetSubject.next();
  }

  get openActionSheet$(): Observable<void> {
    return this.openActionSheetSubject.asObservable();
  }
}