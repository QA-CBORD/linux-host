import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiListComponent } from './multi-list.component';

describe('MultiListComponent', () => {
  let component: MultiListComponent;
  let fixture: ComponentFixture<MultiListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiListComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
