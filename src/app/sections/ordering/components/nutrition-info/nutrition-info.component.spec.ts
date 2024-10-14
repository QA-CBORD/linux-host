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
  it('should set menuItem and build nutrition data correctly', () => {
    const menuItem: MenuItemInfo = {
      calories: 200,
      carbs: 30,
      protein: 10,
      allergens: ['Peanuts', 'Soy'],
    } as MenuItemInfo;

    component.menuItem = menuItem;

    expect(component.nutritionData).toEqual([
      { name: 'Protein', value: '10g' },
      { name: 'Calories', value: '200' },
      { name: 'Total Carbohydrates', value: '30g' },
    ]);
    expect(component.allergens).toBe('Peanuts, Soy');
    expect(component.hasNutritionInfo).toBe(true);
  });

  it('should handle menuItem with no allergens and no nutrition data', () => {
    const menuItem: MenuItemInfo = {} as MenuItemInfo;

    component.menuItem = menuItem;

    expect(component.nutritionData).toEqual([]);
    expect(component.allergens).toBe('');
    expect(component.hasNutritionInfo).toBe(false);
  });

  it('should handle menuItem with only allergens', () => {
    const menuItem: MenuItemInfo = {
      allergens: ['Peanuts', 'Soy'],
    } as MenuItemInfo;

    component.menuItem = menuItem;

    expect(component.nutritionData).toEqual([]);
    expect(component.allergens).toBe('Peanuts, Soy');
    expect(component.hasNutritionInfo).toBe(true);
  });

  it('should handle menuItem with only nutrition data', () => {
    const menuItem: MenuItemInfo = {
      calories: 200,
      carbs: 30,
      protein: 10,
    } as MenuItemInfo;

    component.menuItem = menuItem;

    expect(component.nutritionData).toEqual([
      { name: 'Protein', value: '10g' },
      { name: 'Calories', value: '200' },
      { name: 'Total Carbohydrates', value: '30g' },
    ]);
    expect(component.allergens).toBe('');
    expect(component.hasNutritionInfo).toBe(true);
  });
});
