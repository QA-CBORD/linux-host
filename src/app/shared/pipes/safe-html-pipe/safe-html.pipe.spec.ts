import { TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { SafeHtmlPipe } from './safe-html.pipe';

describe('SafeHtmlPipe', () => {
  let pipe: SafeHtmlPipe;

  beforeEach(() => {
    const domSanitizerStub = () => ({ bypassSecurityTrustHtml: html => ({}) });
    TestBed.configureTestingModule({
      providers: [
        SafeHtmlPipe,
        { provide: DomSanitizer, useFactory: domSanitizerStub }
      ]
    });
    pipe = TestBed.inject(SafeHtmlPipe);
  });

  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
});
