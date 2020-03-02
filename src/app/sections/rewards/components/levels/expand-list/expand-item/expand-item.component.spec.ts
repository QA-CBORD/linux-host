import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandItemComponent } from './expand-item.component';

describe('ExpandItemComponent', () => {
  let component: ExpandItemComponent;
  let fixture: ComponentFixture<ExpandItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExpandItemComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpandItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
