import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptInPage } from './opt-in.page';

describe('OptInPage', () => {
  let component: OptInPage;
  let fixture: ComponentFixture<OptInPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptInPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptInPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
