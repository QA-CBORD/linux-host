import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SingleListComponent } from './single-list.component';

describe('SingleListComponent', () => {
  let component: SingleListComponent;
  let fixture: ComponentFixture<SingleListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SingleListComponent],
    });
    fixture = TestBed.createComponent(SingleListComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      jest.spyOn(component, 'writeValue');
      component.ngOnInit();
      expect(component.writeValue).toHaveBeenCalled();
    });
  });

  it('itemChosen should call writeValue and onChange', () => {
    const writeValueSpy = jest.spyOn(component, 'writeValue').mockImplementation();
    const onChangeSpy = jest.spyOn(component, 'onChange').mockImplementation();

    const testValue = 'test';
    component.itemChosen({ detail: { value: testValue } } as CustomEvent);

    expect(writeValueSpy).toHaveBeenCalledWith(testValue);
    expect(onChangeSpy).toHaveBeenCalledWith(testValue);
  });

  it('value getter should return innerValue', () => {
    const testValue = 'test';
    component.innerValue = testValue;

    expect(component.value).toEqual(testValue);
  });

  it('value setter should call writeValue if value is different from innerValue', () => {
    const writeValueSpy = jest.spyOn(component, 'writeValue').mockImplementation();

    const newValue = 'new';
    component.value = newValue;

    expect(writeValueSpy).toHaveBeenCalledWith(newValue);
  });

  it('value setter should not call writeValue if value is same as innerValue', () => {
    const writeValueSpy = jest.spyOn(component, 'writeValue').mockImplementation();

    const sameValue = 'test';
    component.innerValue = sameValue;

    component.value = sameValue;

    expect(writeValueSpy).not.toHaveBeenCalled();
  });

  it('registerOnChange should set onChange callback', () => {
    const onChangeFn = jest.fn();
    component.registerOnChange(onChangeFn);

    expect(component.onChange).toEqual(onChangeFn);
  });

  it('registerOnTouched should set onTouched callback', () => {
    const onTouchedFn = jest.fn();
    component.registerOnTouched(onTouchedFn);

    expect(component.onTouched).toEqual(onTouchedFn);
  });

  it('onBlur should call onTouched callback', () => {
    const onTouchedSpy = jest.spyOn(component, 'onTouched').mockImplementation();

    component.onBlur();

    expect(onTouchedSpy).toHaveBeenCalled();
  });
});
