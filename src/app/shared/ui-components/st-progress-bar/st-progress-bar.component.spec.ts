import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StProgressBarPage } from './st-progress-bar.page';

describe('StProgressBarPage', () => {
  let component: StProgressBarPage;
  let fixture: ComponentFixture<StProgressBarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StProgressBarPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StProgressBarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
