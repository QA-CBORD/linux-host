import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositPageComponent } from './deposit-page.component';

describe('DepositPageComponent', () => {
  let component: DepositPageComponent;
  let fixture: ComponentFixture<DepositPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DepositPageComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
