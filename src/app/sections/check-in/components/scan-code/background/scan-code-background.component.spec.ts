import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ScanCodeBackground } from './scan-code-background.component';

describe('ScanCodeBackground', () => {
  let component: ScanCodeBackground;
  let fixture: ComponentFixture<ScanCodeBackground>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ScanCodeBackground]
    });
    fixture = TestBed.createComponent(ScanCodeBackground);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
