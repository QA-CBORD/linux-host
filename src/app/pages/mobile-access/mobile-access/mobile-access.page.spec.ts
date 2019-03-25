import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileAccessPage } from './mobile-access.page';

describe('MobileAccessPage', () => {
  let component: MobileAccessPage;
  let fixture: ComponentFixture<MobileAccessPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileAccessPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileAccessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
