import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositTypeNavComponent } from './deposit-type-nav.component';

describe('DepositTypeNavComponent', () => {
  let component: DepositTypeNavComponent;
  let fixture: ComponentFixture<DepositTypeNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DepositTypeNavComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositTypeNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
