import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandListComponent } from './expand-list.component';

describe('ExpandListComponent', () => {
  let component: ExpandListComponent;
  let fixture: ComponentFixture<ExpandListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExpandListComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpandListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
