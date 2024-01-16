import { TestBed } from '@angular/core/testing';
import { MainNavItemsPipe } from './main-nav-items.pipe';
import { NavigationBottomBarElement } from '@core/model/navigation/navigation-bottom-bar-element';

describe('MainNavItemsPipe', () => {
  let pipe: MainNavItemsPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MainNavItemsPipe],
    });

    pipe = TestBed.inject(MainNavItemsPipe);
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return an array with the correct number of elements when amount is less than the array length', () => {
    const barElements: NavigationBottomBarElement[] = [
      { name: 'Item 1' },
      { name: 'Item 2' },
      { name: 'Item 3' },
    ] as NavigationBottomBarElement[];
    const amount = 2;

    const result = pipe.transform(barElements, amount);

    expect(result.length).toEqual(amount - 1);
    expect(result).toEqual([{ name: 'Item 1' }]);
  });

  it('should return the original array when amount is greater than or equal to the array length', () => {
    const barElements: NavigationBottomBarElement[] = [
      { name: 'Item 1' },
      { name: 'Item 2' },
      { name: 'Item 3' },
    ] as NavigationBottomBarElement[];
    const amount = 5;

    const result = pipe.transform(barElements, amount);

    expect(result.length).toEqual(barElements.length);
    expect(result).toEqual(barElements);
  });

  it('should return an empty array when the input array is empty', () => {
    const barElements: NavigationBottomBarElement[] = [];
    const amount = 2;

    const result = pipe.transform(barElements, amount);

    expect(result.length).toEqual(0);
    expect(result).toEqual([]);
  });

  it('should return an empty array when the input array is null or undefined', () => {
    const barElements: NavigationBottomBarElement[] = null;
    const amount = 2;

    const result = pipe.transform(barElements, amount);

    expect(result.length).toEqual(0);
    expect(result).toEqual([]);
  });
});
