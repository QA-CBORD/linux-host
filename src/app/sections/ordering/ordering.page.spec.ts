import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderingPage } from './ordering.page';

describe('OrderingPage', () => {
  let component: OrderingPage;
  let fixture: ComponentFixture<OrderingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
