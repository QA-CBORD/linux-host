import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractviewPage } from './contractview.page';

describe('ContractviewPage', () => {
  let component: ContractviewPage;
  let fixture: ComponentFixture<ContractviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractviewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
