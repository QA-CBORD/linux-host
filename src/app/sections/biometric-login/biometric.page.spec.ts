import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BiometricPage } from './biometric.page';

describe('BiometricPage', () => {
  let component: BiometricPage;
  let fixture: ComponentFixture<BiometricPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BiometricPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiometricPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
