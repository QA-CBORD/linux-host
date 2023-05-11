import { TestBed } from '@angular/core/testing';
import { ObservableStorageService } from './observable-storage.service';
import { Storage } from '@ionic/storage';
import { firstValueFrom, of } from 'rxjs';

const hello = 'hello';
const mock = {
  [hello]: ' world'
}

describe(ObservableStorageService, () => {
  let service: ObservableStorageService;
  let _storage;
  

  beforeEach(() => {
    _storage = {
      get: jest.fn(() => of(mock.hello)),
      set: jest.fn(() => of(mock.hello)),
      remove: jest.fn(() => of(mock.hello)),
      clear: jest.fn(() => of(mock.hello))
    };
    TestBed.configureTestingModule({
      providers: [{ provide: Storage, useValue: _storage }],
    });

    service = TestBed.inject(ObservableStorageService);
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should get the key form storage', async () => {
    const value = await firstValueFrom(service.get(hello));
    expect(value).toEqual(mock.hello);
  });

  it('should set the key in storage', async () => {
    const value = await firstValueFrom(service.set(hello, mock[hello]));
    expect(value).toBeTruthy();
  });

  it('should remove the key in storage', async () => {
    const value = await firstValueFrom(service.remove(hello));
    expect(value).toBeTruthy();
  });

  it('should clear the storage', async () => {
    const spy1 = jest.spyOn(_storage as any, 'clear');
    service.clear();
    expect(spy1).toBeCalledTimes(1);
  });
});
