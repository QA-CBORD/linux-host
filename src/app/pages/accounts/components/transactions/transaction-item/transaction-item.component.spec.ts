import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionItemPage } from './transaction-item.page';

describe('TransactionItemPage', () => {
  let component: TransactionItemPage;
  let fixture: ComponentFixture<TransactionItemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TransactionItemPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionItemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
