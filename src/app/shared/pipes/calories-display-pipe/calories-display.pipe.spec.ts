import { MenuItemInfo, NutritionInfo } from '@sections/ordering';
import { CaloriesDisplayPipe } from './calories-display.pipe';

describe('CaloriesDisplayPipe', () => {
  let pipe: CaloriesDisplayPipe;

  beforeEach(() => {
    pipe = new CaloriesDisplayPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return formatted calories when displayValue is present and not zero', () => {
    const menuItem: MenuItemInfo = {
      nutritionInfo: [{ name: 'calories', displayValue: '150' } as NutritionInfo],
    } as MenuItemInfo;
    expect(pipe.transform(menuItem)).toBe('150 cal');
  });

  it('should return an empty string when displayValue is zero', () => {
    const menuItem: MenuItemInfo = {
      nutritionInfo: [{ name: 'calories', displayValue: '0' } as NutritionInfo],
    } as MenuItemInfo;
    expect(pipe.transform(menuItem)).toBe('');
  });

  it('should return an empty string when displayValue is not present', () => {
    const menuItem: MenuItemInfo = {
      nutritionInfo: [{ name: 'calories' } as NutritionInfo],
    } as MenuItemInfo;
    expect(pipe.transform(menuItem)).toBe('');
  });

  it('should return an empty string when calories info is not present', () => {
    const menuItem: MenuItemInfo = {
      nutritionInfo: [{ name: 'protein', displayValue: '20' } as NutritionInfo],
    } as MenuItemInfo;
    expect(pipe.transform(menuItem)).toBe('');
  });
});
