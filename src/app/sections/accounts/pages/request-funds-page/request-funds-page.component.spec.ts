import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestFundsPageComponent } from './request-funds-page.component';


describe('RequestFundsPagePage', () => {
  let component: RequestFundsPageComponent;
  let fixture: ComponentFixture<RequestFundsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RequestFundsPageComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestFundsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
