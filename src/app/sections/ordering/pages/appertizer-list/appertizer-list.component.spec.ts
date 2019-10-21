import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppertizerListComponent } from './appertizer-list.component';

describe('AppertizerListComponent', () => {
  let component: AppertizerListComponent;
  let fixture: ComponentFixture<AppertizerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppertizerListComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppertizerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
