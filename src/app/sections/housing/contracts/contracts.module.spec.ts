import { TestBed } from '@angular/core/testing';
import { ContractsModule } from './contracts.module';

describe('ContractsModule', () => {
  let pipe: ContractsModule;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [ContractsModule] });
    pipe = TestBed.inject(ContractsModule);
  });

  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
});
