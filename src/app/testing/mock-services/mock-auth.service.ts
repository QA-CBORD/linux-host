import { Observable, of } from 'rxjs';

export class MockAuthService {
  authenticateSystem$ = (): Observable<string> => of('');
}
