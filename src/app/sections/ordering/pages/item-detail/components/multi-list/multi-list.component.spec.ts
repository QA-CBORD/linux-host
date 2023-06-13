import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MultiListComponent } from './multi-list.component';

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
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`innerValue has default value`, () => {
    expect(component.innerValue).toEqual([]);
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'writeValue').and.callThrough();
      component.ngOnInit();
      expect(component.writeValue).toHaveBeenCalled();
    });
  });

  describe('onItemsChecked', () => {
    it('makes expected calls', () => {
      spyOn(component, 'writeValue').and.callThrough();
      component.onItemsChecked();
      expect(component.writeValue).toHaveBeenCalled();
    });
  });
});
