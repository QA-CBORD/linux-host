import { TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { SafeUrlPipe } from './safe-url.pipe';

describe('SafeUrlPipe', () => {
  let pipe: SafeUrlPipe;

  beforeEach(() => {
    const domSanitizerStub = () => ({
      bypassSecurityTrustResourceUrl: url => ({})
    });
    TestBed.configureTestingModule({
      providers: [
        SafeUrlPipe,
        { provide: DomSanitizer, useFactory: domSanitizerStub }
      ]
    });
    pipe = TestBed.inject(SafeUrlPipe);
  });

  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms X to Y', () => {
    const value: any = 'X';
    const args: string[] = [];
    expect(pipe.transform(value, args)).toEqual('Y');
  });
});
