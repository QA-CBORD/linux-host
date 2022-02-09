import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StHierarcheTreeComponent } from './st-hierarchy-tree.component';

describe('StNavTabsPage', () => {
  let component: StHierarcheTreeComponent;
  let fixture: ComponentFixture<StHierarcheTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StHierarcheTreeComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StHierarcheTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
