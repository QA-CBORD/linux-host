import { TestBed } from '@angular/core/testing';
import { ScanCardRoutingModule } from './scan-card.routing';

describe('ScanCardRoutingModule', () => {
  let pipe: ScanCardRoutingModule;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [ScanCardRoutingModule] });
    pipe = TestBed.inject(ScanCardRoutingModule);
  });

  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
});
