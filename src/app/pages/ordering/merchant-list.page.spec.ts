import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantListPage } from './merchant-list.page';

describe('MerchantListPage', () => {
  let component: MerchantListPage;
  let fixture: ComponentFixture<MerchantListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MerchantListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
