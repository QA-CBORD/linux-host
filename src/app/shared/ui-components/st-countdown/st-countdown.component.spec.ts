import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StCountdownPage } from './st-countdown.page';

describe('StCountdownPage', () => {
  let component: StCountdownPage;
  let fixture: ComponentFixture<StCountdownPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StCountdownPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StCountdownPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
