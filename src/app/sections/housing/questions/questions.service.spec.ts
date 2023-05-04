import { TestBed } from '@angular/core/testing';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { AddressFields, PatronAddress } from '../addresses/address.model';
import { Attribute } from '../attributes/attributes.model';
import { QuestionsService } from './questions.service';
import {
  QuestionAddressTypeGroup,
  QuestionAssetTypeDetails,
  QuestionBase,
  QuestionCheckboxGroup,
  QuestionCheckboxGroupValue,
  QuestionFormControl,
  QuestionReorder,
  QuestionTextarea,
  QuestionTextbox,
} from './types';
import { QuestionBlockquote } from './types/question-blockquote';

describe('QuestionsService', () => {
  let service: QuestionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
    });
    service = TestBed.inject(QuestionsService);
  });
  describe('toFormGroup', () => {
    let questions: QuestionBase[];
    let storedQuestions: any;
    let iteratee: jest.Mock<
      (group: object, question: QuestionFormControl, questionName: string, storedValue: string) => void
    >;

    beforeEach(() => {
      questions = [
        new QuestionFormControl({ name: 'name', label: 'Name', required: true }),
        new QuestionCheckboxGroup({
          name: 'hobbies',
          label: 'Hobbies',
          values: [
            { label: 'Reading', value: 'Reading', selected: false },
            { label: 'Traveling', value: 'Traveling', selected: false },
          ],
        }),
        new QuestionReorder({
          name: 'colors',
          label: 'Colors',
          values: [
            { label: 'Blue', value: 'Blue', selected: true },
            { label: 'Red', value: 'Red', selected: true },
          ],
        }),
      ];
      storedQuestions = {
        name: 'Jane Smith',
        hobbies: { label: 'Traveling', value: 'Traveling', selected: true },
        colors: [
          { label: 'Blue', value: 'Blue', selected: true },
          { label: 'Red', value: 'Red', selected: true },
        ],
      };
      iteratee = jest.fn();
    });

    it('should create a FormGroup', () => {
      const formGroup = service.toFormGroup(questions, storedQuestions, iteratee);
      expect(formGroup instanceof FormGroup).toBe(true);
    });

    it('should call the iteratee function for each question with a name', () => {
      service.toFormGroup(questions, storedQuestions, iteratee);
      expect(iteratee).toHaveBeenCalledTimes(3);
    });

    it('should skip questions without a name', () => {
      questions.push(new QuestionBase({ label: 'Age', type: 'number' }));
      const formGroup = service.toFormGroup(questions, storedQuestions, iteratee);
      expect(iteratee).toHaveBeenCalledTimes(3);
      expect(formGroup.controls['Age']).toBeUndefined();
    });
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getQuestions', () => {
    it('should return an empty array for an empty JSON string', () => {
      const json = '';
      const questions: QuestionBase[] = service.getQuestions(json);
      expect(questions).toEqual([]);
    });

    it('should return an array of QuestionBase objects for valid JSON string', () => {
      const json = `[
        { "type": "header", "label": "Header 1" },
        { "type": "text", "label": "Text 1", "name": "text1" },
        { "type": "textarea", "label": "Textarea 1", "name": "textarea1" }
      ]`;
      const questions: QuestionBase[] = service.getQuestions(json);
      expect(questions.length).toBe(3);
      expect(questions[0].label).toBe('Header 1');
      expect(questions[1].label).toBe('Text 1');
      expect(questions[2].label).toBe('Textarea 1');
    });

    it('should return an empty array if JSON parsing fails', () => {
      const json = 'invalid json';
      const questions: QuestionBase[] = service.getQuestions(json);
      expect(questions).toEqual([]);
    });
  });

  describe('splitByPages', () => {
    it('should split questions by blockquotes', () => {
      const questions = [
        new QuestionTextbox({ type: 'text', label: 'Input 1', attribute: null }),
        new QuestionBlockquote({ subtype: 'Quote 1' }),
        new QuestionBlockquote({ subtype: 'blockquote', attribute: null, label: 'New Page', type: 'paragraph' }),
        new QuestionTextbox({ type: 'text', label: 'Input 2', attribute: null }),
        new QuestionTextbox({ type: 'text', label: 'Input 3', attribute: null }),
        new QuestionBlockquote({ subtype: 'blockquote', attribute: null, label: 'New Page', type: 'paragraph' }),
        new QuestionTextarea({ type: 'textarea', label: 'Textarea 1', attribute: null }),
      ];

      const result = service.splitByPages(questions);

      expect(result).toEqual([
        [new QuestionTextbox({ name: 'text-0', type: 'text', label: 'Input 1', attribute: null })],
        [],
        [
          new QuestionTextbox({ type: 'text', name: 'text-1', label: 'Input 2', attribute: null }),
          new QuestionTextbox({ type: 'text', name: 'text-2', label: 'Input 3', attribute: null }),
        ],
        [new QuestionTextarea({ type: 'textarea', label: 'Textarea 1', attribute: null, name: 'textarea-0' })],
      ]);
    });

    it('should split an empty array into an array with one empty page', () => {
      const questions: QuestionBase[] = [];

      const result = service.splitByPages(questions);

      expect(result).toEqual([[]]);
    });

    it('should split an array with only one question into an array with one page containing that question', () => {
      const questions = [new QuestionBase({ type: 'text', label: 'Input 1', attribute: null })];

      const result = service.splitByPages(questions);

      expect(result).toEqual([[new QuestionBase({ type: 'text', label: 'Input 1', attribute: null })]]);
    });
  });

  describe('toQuestionCheckboxControl', () => {
    const checkboxquestion: QuestionCheckboxGroup = {
      name: '1',
      label: 'Select your favorite colors',
      values: [
        { value: '1', label: 'Red', selected: true },
        { value: '2', label: 'Green', selected: false },
        { value: '3', label: 'Blue', selected: true },
      ],
      required: false,
      consumerKey: 0,
      preferenceKey: 0,
      facilityKey: 0,
      type: '',
      attribute: '',
    };

    it('should return an empty FormArray when no stored value is provided', () => {
      const formArray = service.toQuestionCheckboxControl(null, checkboxquestion);
      expect(formArray).toBeInstanceOf(FormArray);
      expect(formArray.controls.length).toBe(3);
      expect(formArray.value).toEqual([true, false, true]);
    });

    it('should return a FormArray with controls matching the stored values', () => {
      const storedValue: QuestionCheckboxGroupValue[] = [
        { value: '1', label: 'Red', selected: false },
        { value: '2', label: 'Green', selected: true },
        { value: '3', label: 'Vlue', selected: true },
      ];

      const formArray = service.toQuestionCheckboxControl(storedValue, checkboxquestion);
      expect(formArray).toBeInstanceOf(FormArray);
      expect(formArray.controls.length).toBe(3);
      expect(formArray.value).toEqual([false, true, true]);
    });

    it('should return a FormArray with required validator when question is required', () => {
      const requiredQuestion: QuestionCheckboxGroup = { ...checkboxquestion, required: true };
      const formArray = service.toQuestionCheckboxControl(null, requiredQuestion);
      const firstControl = formArray.controls[0] as FormControl;
      expect(firstControl.validator).toBeTruthy();
    });
  });
  describe('toQuestionAssetTypeDetailsGroup', () => {
    const mockQuestion: QuestionAssetTypeDetails = {
      assetTypes: [
        [
          { assetTypeKey: 12, label: '$USD', value: 'dollars', selected: false, isCurrency: true },
          { assetTypeKey: 11, label: '$DOP', value: 'dominican pesos', selected: false, isCurrency: true },
        ],
        [{ assetTypeKey: 10, label: '$COP', value: 'colombian pesos', selected: false, isCurrency: true }],
      ],
      name: '',
      required: false,
      consumerKey: 0,
      preferenceKey: 0,
      facilityKey: 0,
      type: '',
      label: '',
      attribute: '',
    };

    it('should return a FormGroup', () => {
      const result = service.toQuestionAssetTypeDetailsGroup(null, mockQuestion);
      expect(result instanceof FormGroup).toBeTruthy();
    });

    it('should create a FormArray for each AssetTypeDetailValue array', () => {
      const result = service.toQuestionAssetTypeDetailsGroup(null, mockQuestion);
      expect(Object.keys(result.controls)).toEqual(['aaa-0', 'aaa-1']);
      expect(result.get('aaa-0') instanceof FormArray).toBeTruthy();
      expect(result.get('aaa-1') instanceof FormArray).toBeTruthy();
    });

    it('should create a FormControl for each AssetTypeDetailValue', () => {
      const result = service.toQuestionAssetTypeDetailsGroup(null, mockQuestion);
      const formArray0 = result.get('aaa-0') as FormArray;
      const formArray1 = result.get('aaa-1') as FormArray;
      expect(formArray0.length).toBe(2);
      expect(formArray1.length).toBe(1);
      expect(formArray0.controls[0] instanceof FormControl).toBeTruthy();
      expect(formArray0.controls[1] instanceof FormControl).toBeTruthy();
      expect(formArray1.controls[0] instanceof FormControl).toBeTruthy();
    });

    it('should set the initial value of each FormControl to the AssetTypeDetailValue value', () => {
      const storedValue = [[{ value: 'initial1' }, { value: 'initial2' }], [{ value: 'initial3' }]];
      const result = service.toQuestionAssetTypeDetailsGroup(storedValue, mockQuestion);
      const formArray0 = result.get('aaa-0') as FormArray;
      const formArray1 = result.get('aaa-1') as FormArray;
      expect(formArray0.controls[0].value).toBe('initial1');
      expect(formArray0.controls[1].value).toBe('initial2');
      expect(formArray1.controls[0].value).toBe('initial3');
    });
  });
  describe('getAttributeValue', () => {
    const mockQuestion: QuestionFormControl = {
      name: 'second',
      required: true,
      consumerKey: 104,
      preferenceKey: 101,
      facilityKey: 10,
      type: 'text',
      label: 'Second',
      attribute: 'two',
    };

    const mockAttributes: Attribute[] = [
      { attributeConsumerKey: 10, value: 'other-value', endDate: '08-24-2023', effectiveDate: '04-24-2023' },
      { attributeConsumerKey: 104, value: 'question-value', endDate: '08-24-2023', effectiveDate: '04-24-2023' },
    ];

    it('should return an empty string if no attributes are provided', () => {
      const result = service.getAttributeValue(mockQuestion, null);
      expect(result).toBe('');
    });

    it('should return an empty string if no matching attribute is found', () => {
      const result = service.getAttributeValue(
        {
          name: 'second',
          required: true,
          consumerKey: 5,
          preferenceKey: null,
          facilityKey: null,
          type: null,
          label: null,
          attribute: null,
        },
        mockAttributes
      );
      expect(result).toBe('');
    });

    it('should return the value of the matching attribute', () => {
      const result = service.getAttributeValue(mockQuestion, mockAttributes);
      expect(result).toBe('question-value');
    });

    it('should return the dateAccepted value if no matching attribute is found and dateAccepted is provided', () => {
      const result = service.getAttributeValue(
        {
          name: 'second',
          required: true,
          consumerKey: 5,
          preferenceKey: null,
          facilityKey: null,
          type: null,
          label: null,
          attribute: null,
        },
        [],
        '2022-01-01'
      );
      expect(result).toBe('2022-01-01');
    });

    it('should return an empty string if dateAccepted is provided but is not a valid date', () => {
      const result = service.getAttributeValue(mockQuestion, null, 'null');
      expect(result).toBe('');
    });

    it('should return the dateAccepted value if it is provided and is a valid date', () => {
      const result = service.getAttributeValue(mockQuestion, null, '2022-01-01');
      expect(result).toBe('2022-01-01');
    });
  });

  describe('getAddressValue', () => {
    const mockQuestion: QuestionFormControl = {
      name: 'addrLn1',
      required: true,
      consumerKey: 104,
      preferenceKey: 101,
      facilityKey: 10,
      type: 'text',
      label: 'Address',
      attribute: AddressFields.ADDRESS_LINE_1,
    };

    const mockAddresses: PatronAddress[] = [
      {
        addrTypeKey: 104,
        addrName: 'Mock Address',
        addrLn1: '123 Mock St',
        addrLn2: '2ND FLOOR',
        city: 'Mock City',
        state: 'Mock State',
        country: 'Mock Country',
        zip: '12345',
        addrPhone: '555-555-5555',
        email: 'mock@example.com',
        addressKey: 104,
        patronId: 104,
      },
    ];

    it('should return an empty string if no matching address is found', () => {
      const result = service.getAddressValue([], mockQuestion);
      expect(result).toBe('');
    });

    it('should return the value of the specified attribute if a matching address is found', () => {
      const result = service.getAddressValue(mockAddresses, mockQuestion);
      expect(result).toBe('123 Mock St');
    });

    it('should return an empty string if the specified attribute is empty or null', () => {
      const result = service.getAddressValue(
        [
          {
            addrTypeKey: null,
            addrName: null,
            addrLn1: null,
            addrLn2: '',
            city: '',
            state: '',
            country: null,
            zip: '',
            addrPhone: null,
            email: '',
            addressKey: null,
            patronId: null,
          },
        ],
        mockQuestion
      );
      expect(result).toBe('');
    });
  });
  describe('addDataTypeValidator', () => {
    const mockQuestion: QuestionTextbox = {
      dataType: 'numeric',
      subtype: '',
      name: '',
      required: false,
      consumerKey: 0,
      preferenceKey: 0,
      facilityKey: 0,
      type: '',
      label: '',
      attribute: '',
    };

    it('should add a validator for the specified data type to the validators array', () => {
      const mockValidators = [];
      service.addDataTypeValidator(mockQuestion, mockValidators);

      expect(mockValidators.length).toBe(1);
      expect(mockValidators[0]).toBeInstanceOf(Function);
    });

    it('should not add a validator if the specified data type is not supported', () => {
      const mockValidators = [];
      service.addDataTypeValidator(
        {
          dataType: 'unsupported-type',
          subtype: '',
          name: '',
          required: false,
          consumerKey: 0,
          preferenceKey: 0,
          facilityKey: 0,
          type: '',
          label: '',
          attribute: '',
        },
        mockValidators
      );

      expect(mockValidators.length).toBe(0);
    });
  });
  describe('mapToAddressTypeGroup', () => {
    let question: QuestionAddressTypeGroup;

    beforeEach(() => {
      // Initialize the test data
      question = {
        type: 'addressTypeGroup',
        label: 'Address Type Group',
        required: true,
        addressTypeId: 105,
        readonly: false,
        values: [
          { label: 'Address Line 1', selected: true, value: 'St Mock 105' },
          { label: 'Address Line 2', selected: true, value: '' },
          { label: 'City', selected: false, value: 'Main' },
          { label: 'State', selected: true, value: 'Miami' },
          { label: 'Zip Code', selected: false, value: '10545' },
        ],
        inline: true,
        name: '',
        other: false,
        consumerKey: 104,
        dataType: ['text'],
        source: '105',
        attribute: '',
      };
    });

   

    it('should return an array containing the original question when passed a non-QuestionAddressTypeGroup instance', () => {
      // Initialize the test data
      const nonAddressTypeGroupQuestion = new QuestionTextbox({
        type: 'textbox',
        name: 'email',
        label: 'Email',
        required: true,
        subtype: 'email',
        dataType: 'String',
        source: 'self-reported',
      });

      // Call the function and check the return value
      const result = service.mapToAddressTypeGroup(nonAddressTypeGroupQuestion);

      // Assertions
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(1);
      expect(result[0]).toBe(nonAddressTypeGroupQuestion);
    });
  });
  describe('getRequiredValidator', () => {
    it('should return an empty array when question.required is false', () => {
      const question: QuestionFormControl = {
        required: false,
        name: '',
        consumerKey: 0,
        preferenceKey: 0,
        facilityKey: 0,
        type: '',
        label: '',
        attribute: ''
      };
      const validators: ValidatorFn[] = service.getRequiredValidator(question);

      expect(validators).toEqual([]);
    });

    it('should return an array with Validators.required when question.required is true', () => {
      const question: QuestionFormControl = {
        required: true,
        name: '',
        consumerKey: 0,
        preferenceKey: 0,
        facilityKey: 0,
        type: '',
        label: '',
        attribute: ''
      };
      const validators: ValidatorFn[] = service.getRequiredValidator(question);

      expect(validators).toEqual([Validators.required]);
    });
  });
});
