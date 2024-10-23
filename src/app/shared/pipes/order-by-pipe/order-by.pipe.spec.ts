import { OrderByPipe } from './order-by.pipe';

describe('OrderByPipe', () => {
  let pipe: OrderByPipe;

  beforeEach(() => {
    pipe = new OrderByPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should sort an array of objects by a string property', () => {
    const array = [{ name: 'Charlie' }, { name: 'Alice' }, { name: 'Bob' }];
    const sortedArray = pipe.transform(array, 'name');
    expect(sortedArray).toEqual([{ name: 'Alice' }, { name: 'Bob' }, { name: 'Charlie' }]);
  });

  it('should sort an array of objects by a number property', () => {
    const array = [{ age: 30 }, { age: 20 }, { age: 40 }];
    const sortedArray = pipe.transform(array, 'age');
    expect(sortedArray).toEqual([{ age: 20 }, { age: 30 }, { age: 40 }]);
  });

  it('should sort an array of objects with mixed types', () => {
    const array = [{ value: '30' }, { value: 20 }, { value: '40' }];
    const sortedArray = pipe.transform(array, 'value');
    expect(sortedArray).toEqual([{ value: 20 }, { value: '30' }, { value: '40' }]);
  });

  it('should handle an array of objects with missing properties', () => {
    const array = [{ name: 'Charlie' }, { name: 'Alice' }, {}, { name: 'Bob' }];
    const sortedArray = pipe.transform(array, 'name');
    expect(sortedArray).toEqual([{ name: 'Alice' }, { name: 'Bob' }, { name: 'Charlie' }, {}]);
  });

  it('should handle an empty array', () => {
    const array: any[] = [];
    const sortedArray = pipe.transform(array, 'name');
    expect(sortedArray).toEqual([]);
  });

  it('should handle an array with one element', () => {
    const array = [{ name: 'Alice' }];
    const sortedArray = pipe.transform(array, 'name');
    expect(sortedArray).toEqual([{ name: 'Alice' }]);
  });
});
