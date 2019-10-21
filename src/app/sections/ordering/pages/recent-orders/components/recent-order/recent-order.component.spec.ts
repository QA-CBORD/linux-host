import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentOrderComponent } from './recent-order.component';

describe('RecentOrderComponent', () => {
  let component: RecentOrderComponent;
  let fixture: ComponentFixture<RecentOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentOrderComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
