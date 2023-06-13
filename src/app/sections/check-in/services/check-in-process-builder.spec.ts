import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { CheckingProcess } from './check-in-process-builder';

describe('CheckingProcess', () => {
  let service: CheckingProcess;

  beforeEach(() => {
    const routerStub = () => ({ navigate: (array, object) => ({}), url: {} });
    TestBed.configureTestingModule({
      providers: [CheckingProcess, { provide: Router, useFactory: routerStub }]
    });
    service = TestBed.inject(CheckingProcess);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
