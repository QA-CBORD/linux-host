import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountListComponent } from './account-list.component';

describe('AccoutListPage', () => {
  let component: AccountListComponent;
  let fixture: ComponentFixture<AccountListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccountListComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
