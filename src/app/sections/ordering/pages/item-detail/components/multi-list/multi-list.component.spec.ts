import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MultiListComponent } from './multi-list.component';
import { FormControl } from '@angular/forms';

describe('MultiListComponent', () => {
  let component: MultiListComponent;
  let fixture: ComponentFixture<MultiListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [MultiListComponent]
    });
    fixture = TestBed.createComponent(MultiListComponent);
    component = fixture.componentInstance;
    const mockValue = [];
    component.control = new FormControl(mockValue);
    component.options = [];
    fixture.detectChanges();
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`innerValue has default value`, () => {
    expect(component.innerValue).toEqual([]);
  });
});