import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutritionInfoComponent } from './nutrition-info.component';
import { TranslateService } from '@ngx-translate/core';
import { TranslateServiceStub } from 'src/app/testing/classes/translate-service.spec';
import { MenuItemInfo } from '@sections/ordering/shared/models';

describe('NutritionInfoComponent', () => {
  let component: NutritionInfoComponent;
  let fixture: ComponentFixture<NutritionInfoComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NutritionInfoComponent],
      providers: [{ provide: TranslateService, useClass: TranslateServiceStub }],
    }).compileComponents();

    fixture = TestBed.createComponent(NutritionInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize properties correctly', () => {
    expect(component.nutritionData).toEqual([]);
    expect(component.allergens).toBe('');
    expect(component.hasNutritionInfo).toBe(false);
  });
  it('should not update properties when menuItem is null or undefined', () => {
    component.menuItem = null;
    expect(component.nutritionData).toEqual([]);
    expect(component.allergens).toBe('');
    expect(component.hasNutritionInfo).toBe(false);

    component.menuItem = undefined;
    expect(component.nutritionData).toEqual([]);
    expect(component.allergens).toBe('');
    expect(component.hasNutritionInfo).toBe(false);
  });

  it('should update nutritionData and set hasNutritionInfo to true when menuItem has nutrition info', () => {
    const mockMenuItem = {
      nutritionInfo: [
        { name: 'Calories', value: '200' },
        { name: 'Total Fat', value: '10g' },
      ],
      allergens: [],
    } as any as MenuItemInfo;

    component.menuItem = mockMenuItem;

    expect(component.nutritionData).toEqual(mockMenuItem.nutritionInfo);
    expect(component.allergens).toBe('');
    expect(component.hasNutritionInfo).toBe(true);
  });

  it('should update allergens and set hasNutritionInfo to true when menuItem has allergens', () => {
    const mockMenuItem = {
      nutritionInfo: [],
      allergens: ['Peanuts', 'Soy'],
    } as any as MenuItemInfo;

    component.menuItem = mockMenuItem;

    expect(component.nutritionData).toEqual([]);
    expect(component.allergens).toBe('Peanuts, Soy');
    expect(component.hasNutritionInfo).toBe(true);
  });

  it('should update both nutritionData and allergens correctly when menuItem has both', () => {
    const mockMenuItem = {
      nutritionInfo: [{ name: 'Calories', value: '150' }],
      allergens: ['Milk', 'Eggs'],
    } as any as MenuItemInfo;

    component.menuItem = mockMenuItem;

    expect(component.nutritionData).toEqual(mockMenuItem.nutritionInfo);
    expect(component.allergens).toBe('Milk, Eggs');
    expect(component.hasNutritionInfo).toBe(true);
  });

  it('should set hasNutritionInfo to false when both nutritionData and allergens are empty', () => {
    const mockMenuItem = {
      nutritionInfo: [],
      allergens: [],
    } as any as MenuItemInfo;

    component.menuItem = mockMenuItem;

    expect(component.nutritionData).toEqual([]);
    expect(component.allergens).toBe('');
    expect(component.hasNutritionInfo).toBe(false);
  });
});
