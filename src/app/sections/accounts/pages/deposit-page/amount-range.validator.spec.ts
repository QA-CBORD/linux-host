import { amountRangeValidator } from './amount-range.validator';
import { FormControl } from '@angular/forms';

describe('amountRangeValidator', () => {
    it('should return null if the value is within the specified range', () => {
        const validator = amountRangeValidator(0, 100);
        const control = new FormControl(50);
        const result = validator(control);
        expect(result).toBeNull();
    });

    it('should return an error object if the value is below the specified range', () => {
        const validator = amountRangeValidator(0, 100);
        const control = new FormControl(-50);
        const result = validator(control);
        expect(result.minLength).toBeDefined();
    });

    it('should return an error object if the value is above the specified range', () => {
        const validator = amountRangeValidator(0, 100);
        const control = new FormControl(150);
        const result = validator(control);
        expect(result.maxLength).toBeDefined();
    });
});
