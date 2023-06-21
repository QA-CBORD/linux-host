import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SortControlComponent } from './sort-control.component';

describe('SortControlComponent', () => {
  let component: SortControlComponent;
  let fixture: ComponentFixture<SortControlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SortControlComponent]
    });
    fixture = TestBed.createComponent(SortControlComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('select', () => {
    it('makes expected calls', () => {
     jest.spyOn(component, 'isDescend');
      component.select();
      expect(component.isDescend).toHaveBeenCalled();
    });
  });
});
