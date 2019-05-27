import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardsPopoverPage } from './rewards-popover.page';

describe('RewardsPopoverPage', () => {
  let component: RewardsPopoverPage;
  let fixture: ComponentFixture<RewardsPopoverPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RewardsPopoverPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardsPopoverPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
