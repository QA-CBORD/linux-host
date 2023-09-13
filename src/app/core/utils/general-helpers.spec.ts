import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { isFormInvalid } from './general-helpers';


describe('isFormInvalid', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
    });
  });

  it('should return true if any FormControl in the FormGroup is empty', () => {
    // Arrange
    const formGroup: FormGroup = new FormGroup({
      field1: new FormControl('Some Value'),
      field2: new FormControl('', Validators.required), // An empty field
      field3: new FormControl('Another Value'),
    });

    // Act
    const result = isFormInvalid(formGroup);

    // Assert
    expect(result).toBe(true);
  });

  it('should return false if all FormControls in the FormGroup are filled', () => {
    // Arrange
    const formGroup: FormGroup = new FormGroup({
      field1: new FormControl('Some Value', Validators.required),
      field2: new FormControl('Another Value', Validators.required),
    });

    // Act
    const result = isFormInvalid(formGroup);

    // Assert
    expect(result).toBe(false);
  });
});
