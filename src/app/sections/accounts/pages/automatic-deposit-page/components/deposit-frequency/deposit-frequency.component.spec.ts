import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositFrequencyComponent } from './deposit-frequency.component';

describe('DepositFrequencyComponent', () => {
  let component: DepositFrequencyComponent;
  let fixture: ComponentFixture<DepositFrequencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DepositFrequencyComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositFrequencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
