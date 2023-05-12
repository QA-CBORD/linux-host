import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of } from 'rxjs';
import { ObservableSessionStorageService } from './observable-session-storage.service';

const hello = 'hello';
const mock = {
  [hello]: ' world'
}

describe(ObservableSessionStorageService, () => {
  let service: ObservableSessionStorageService;
  
  const localStorageMock = (() => {
    let store = {};
  
    return {
      getItem(key) {
        return store[key] || null;
      },
      setItem(key, value) {
        store[key] = value.toString();
      },
      removeItem(key) {
        delete store[key];
      },
      clear() {
        store = {};
      }
    };
  })();
  
  Object.defineProperty(window, 'sessionStorage', {
    value: localStorageMock
  });

  beforeEach(() => {
    service = TestBed.inject(ObservableSessionStorageService);
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should get the key form storage', async () => {
    const value = await firstValueFrom(service.get(''));
    expect(value).toBeNull();
  });

  it('should set the key in storage', async () => {
    const value = await firstValueFrom(service.set(hello, mock[hello]));
    expect(value).toBeTruthy();
  });

  it('should remove the key in storage', async () => {
    const value = await firstValueFrom(service.remove(hello));
    expect(value).toBeUndefined();
  });

  it('should clear the storage', async () => {
    const value = await firstValueFrom(service.clear());
    expect(value).toBeUndefined();
  });
});
