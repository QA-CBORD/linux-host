import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MultiListComponent } from './multi-list.component';
import { FormControl } from '@angular/forms';
import { MenuGroupItemInfo, MenuItemInfo } from '@sections/ordering/components';

describe('MultiListComponent', () => {
  let component: MultiListComponent;
  let fixture: ComponentFixture<MultiListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [MultiListComponent],
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
  it('should call writeValue and onChange with control value', () => {
    const writeValueSpy = jest.spyOn(component, 'writeValue').mockImplementation();
    const onChangeSpy = jest.spyOn(component, 'onChange').mockImplementation();

    const testValue = 'test value';
    component.control.setValue(testValue);

    component.ngOnInit();

    expect(writeValueSpy).toHaveBeenCalledWith(testValue);
    expect(onChangeSpy).toHaveBeenCalledWith(testValue);
  });

  it('should modify options based on control value and isExistingItemInCart', () => {
    const item1 = {
      menuGroupId: '1',
      menuGroupName: '',
      displayRank: 0,
      priceOverride: 0,
      visible: false,
      active: false,
      notes: '',
      menuItem: {
        id: '1',
        merchantId: '',
        externalSystemRef: '',
        name: 'item1',
        description: '',
        minimumPrice: 0,
        price: 0,
        externalSystemFields: '',
        taxMask: 0,
        visible: false,
        active: false,
        deleted: false,
        calories: 0,
        reportingCategory: '',
        carbs: 0,
        protein: 0,
        imageReference: '',
        menuItemOptions: [],
        displayCalories: '',
      },
    } as any;

    const item2 = {
      menuGroupId: '2',
      menuGroupName: '',
      displayRank: 0,
      priceOverride: 0,
      visible: false,
      active: false,
      notes: '',
      menuItem: {
        id: '2',
        merchantId: '',
        externalSystemRef: '',
        name: 'item2',
        description: '',
        minimumPrice: 0,
        price: 0,
        externalSystemFields: '',
        taxMask: 0,
        visible: false,
        active: false,
        deleted: false,
        calories: 0,
        reportingCategory: '',
        carbs: 0,
        protein: 0,
        imageReference: '',
        menuItemOptions: [],
        displayCalories: '',
      },
    } as any;
    component.options = [item1, item2] as MenuGroupItemInfo[];
    component.innerValue = ['item1']; // Mocking innerValue
    component.isExistingItemInCart = true;

    component.ngOnInit();

    // Verify that modifiedOptions are updated as expected
    expect(component.modifiedOptions).toEqual([
      { ...item1, checked: false },
      { ...item2, checked: false },
    ]);
  });
  it('should add item if not present in innerValue', () => {
    const testItem = { id: 1, name: 'Test Item' };
    component.innerValue = []; // Reset innerValue

    component.onItemsChecked({ detail: { value: testItem } });

    expect(component.innerValue).toContain(testItem);
  });

  it('should remove item if already present in innerValue', () => {
    const testItem = { id: 1, name: 'Test Item' };
    component.innerValue = [testItem]; // Set innerValue with the test item

    component.onItemsChecked({ detail: { value: testItem } });

    expect(component.innerValue).not.toContain(testItem);
  });
  it('should return innerValue', () => {
    const testValue = ['test', 'value'];
    component.innerValue = testValue;

    expect(component.value).toEqual(testValue);
  });

  it('should call writeValue if value is different from innerValue', () => {
    const writeValueSpy = jest.spyOn(component, 'writeValue').mockImplementation();

    const newValue = ['new', 'value'];
    component.value = newValue;

    expect(writeValueSpy).toHaveBeenCalledWith(newValue);
  });

  it('should not call writeValue if value is same as innerValue', () => {
    const writeValueSpy = jest.spyOn(component, 'writeValue').mockImplementation();

    const sameValue = ['test', 'value'];
    component.innerValue = sameValue; // Set innerValue to the same value

    component.value = sameValue;

    expect(writeValueSpy).not.toHaveBeenCalled();
  });
  it('should register onChange', () => {
    const onChangeFn = () => {};
    component.registerOnChange(onChangeFn);
    expect(component.onChange).toBe(onChangeFn);
  });

  it('should register onTouched', () => {
    const onTouchedFn = () => {};
    component.registerOnTouched(onTouchedFn);
    expect(component.onTouched).toBe(onTouchedFn);
  });

  it('should call onTouched on onBlur', () => {
    const onTouchedSpy = jest.spyOn(component, 'onTouched');
    component.onBlur();
    expect(onTouchedSpy).toHaveBeenCalled();
  });
});
