import { ChargeScheduleValue } from '@sections/housing/charge-schedules/charge-schedules.model';
import { QuestionDate } from './question-date';
import { QuestionFormControl } from './question-form-control';
import { QuestionDropdownOptions, QuestionDropdown, QuestionDropdownValue } from './question-dropdown';
import { QuestionFacilityAttributes } from './question-facility-attributes';
import { QuestionAddressTypeGroup } from './question-address-type-group';
import { QuestionBlockquote } from './question-blockquote';
import {
  QuestionChargeScheduleBase,
  QuestionChargeScheduleBaseOptions,
  QuestionChargeSchedule,
} from './question-charge-schedule';
import { QuestionCheckboxGroup } from './question-checkbox-group';
import { QuestionContractDetails } from './question-contract-details';
import { PatronPreference } from '@sections/housing/applications/applications.model';
import { AssetTypeDetailValue } from '@sections/housing/non-assignments/non-assignments.model';
import { QuestionTypes } from 'src/app/app.global';
import { QuestionDateSigned } from './question-date-signed';
import { QuestionHeader } from './question-header';
import { QuestionImageWorkOrder } from './question-image-work-order';
import { QuestionAssetTypeDetailsOptions, QuestionAssetTypeDetails, QuestionAssetTypeDetailsBaseOptions, QuestionAssetTypeDetailsBase } from './question-non-assignment-details';
import { QuestionParagraph } from './question-paragraph';
import { QuestionRadioGroup } from './question-radio-group';
import { QuestionReorder, QuestionReorderValue } from './question-reorder';
import { QuestionRoommatePreference, QuestionActionButton } from './question-roommate-preference';
import { QuestionTextarea } from './question-textarea';
import { QuestionTextbox } from './question-textbox';
import { QuestionWaitingListRequest } from './question-waiting-list-request';

describe('QuestionAddressTypeGroup', () => {

  it('should set the correct values when options are defined', () => {
    const options = {
      type: 'address-group',
      name: 'address-type-group',
      values: [
        { label: 'Home', value: 'home', selected: true },
        { label: 'Work', value: 'work', selected: false },
      ],
      readonly: true,
      consumerKey: 123,
      inline: true,
      other: false,
      required: true,
      source: 'source',
      addressTypeId: 1,
      dataType: ['string'],
    };

    const question = new QuestionAddressTypeGroup(options);

    expect(question.type).toEqual(options.type);
    expect(question.name).toEqual(options.name);
    expect(question.values).toEqual(options.values);
    expect(question.readonly).toEqual(options.readonly);
    expect(question.consumerKey).toEqual(options.consumerKey);
    expect(question.inline).toEqual(options.inline);
    expect(question.other).toEqual(options.other);
    expect(question.required).toEqual(options.required);
    expect(question.source).toEqual(options.source);
    expect(question.addressTypeId).toEqual(options.addressTypeId);
    expect(question.dataType).toEqual(options.dataType);
  });
});
describe('QuestionBlockquote', () => {
  it('should create a new instance of QuestionBlockquote', () => {
    const options = {
      subtype: 'blockquote',
      label: 'Quote',
      attribute: 'quote',
    };
    const blockquote = new QuestionBlockquote(options);

    expect(blockquote).toBeInstanceOf(QuestionBlockquote);
    expect(blockquote.subtype).toEqual(options.subtype);
    expect(blockquote.label).toEqual(options.label);
    expect(blockquote.attribute).toEqual(options.attribute);
  });

  it('should create a new instance of QuestionBlockquote without options', () => {
    const blockquote = new QuestionBlockquote({ subtype: 'blockquote' });

    expect(blockquote).toBeInstanceOf(QuestionBlockquote);
    expect(blockquote.subtype).toEqual('blockquote');
    expect(blockquote.label).toEqual('');
    expect(blockquote.attribute).toEqual(null);
  });
});
describe('QuestionChargeScheduleBase', () => {
  let question: QuestionChargeScheduleBase;
  let options: QuestionChargeScheduleBaseOptions;
  beforeEach(() => {
    options = {
      required: true,
      inline: true,
      name: 'Charge Schedule',
      other: false,
      values: [
        { label: 'Value 1', value: '100', type: '' },
        { label: 'Value 2', value: '200', type: '' },
      ],
      consumerKey: 123,
      chargeSchedule: true,
      label: 'Charge Schedule',
      attribute: 'charge_schedule',
    };
    question = new QuestionChargeScheduleBase(options);
  });
  it('should create a new instance of QuestionChargeScheduleBase', () => {
    expect(question).toBeInstanceOf(QuestionChargeScheduleBase);
    expect(question.required).toEqual(options.required);
    expect(question.inline).toEqual(options.inline);
    expect(question.name).toEqual(options.name);
    expect(question.other).toEqual(options.other);
    expect(question.values).toHaveLength(options.values.length);
    expect(question.consumerKey).toEqual(options.consumerKey);
    expect(question.chargeSchedule).toEqual(options.chargeSchedule);
    expect(question.label).toEqual(options.label);
    expect(question.attribute).toEqual(options.attribute);
  });

  it('should create a new instance of QuestionChargeScheduleBase without options', () => {
    const question = new QuestionChargeScheduleBase({} as QuestionChargeScheduleBaseOptions);

    expect(question).toBeInstanceOf(QuestionChargeScheduleBase);
    expect(question.required).toEqual(false);
    expect(question.inline).toEqual(false);
    expect(question.name).toBeUndefined();
    expect(question.other).toEqual(false);
    expect(question.values).toHaveLength(0);
    expect(question.consumerKey).toBeUndefined();
    expect(question.chargeSchedule).toEqual(false);
    expect(question.label).toEqual('');
    expect(question.attribute).toEqual(null);
  });
});

describe('QuestionChargeScheduleBase', () => {
  it('should create instance of QuestionChargeScheduleBase with given options', () => {
    const options = {
      required: true,
      inline: false,
      name: 'test',
      other: true,
      values: [new ChargeScheduleValue({ label: 'test', value: 'test', type: '' })],
      consumerKey: 1,
      chargeSchedule: true,
    };
    const question = new QuestionChargeScheduleBase(options);
    expect(question.required).toEqual(true);
    expect(question.name).toEqual('test');
    expect(question.other).toEqual(true);
    expect(question.values.length).toEqual(1);
    expect(question.consumerKey).toEqual(1);
    expect(question.chargeSchedule).toEqual(true);
  });

  it('should create instance of QuestionChargeScheduleBase with default options if no options are provided', () => {
    const question = new QuestionChargeScheduleBase(null);
    expect(question.required).toEqual(false);
    expect(question.inline).toEqual(false);
    expect(question.name).toBeUndefined();
    expect(question.other).toEqual(false);
    expect(question.values.length).toEqual(0);
    expect(question.consumerKey).toBeUndefined();
    expect(question.chargeSchedule).toEqual(false);
  });
});

describe('QuestionChargeSchedule', () => {
  it('should create instance of QuestionChargeSchedule with given options', () => {
    const options = {
      chargeSchedulesGroup: [
        [new ChargeScheduleValue({ label: 'test1', value: 'test1', type: '' })],
        [new ChargeScheduleValue({ label: 'test2', value: 'test2', type: '' })],
      ],
    };
    const question = new QuestionChargeSchedule(options);
    expect(question.type).toEqual('charge-schedules');
    expect(question.chargeSchedulesGroup.length).toEqual(2);
  });

  it('should create instance of QuestionChargeSchedule with default options if no options are provided', () => {
    const question = new QuestionChargeSchedule(null);
    expect(question.type).toEqual('charge-schedules');
    expect(question.chargeSchedulesGroup.length).toEqual(0);
  });
});

describe('QuestionCheckboxGroup', () => {
  it('should create instance of QuestionCheckboxGroup with given options', () => {
    const options = {
      name: 'test',
      values: [
        { label: 'test1', value: 'test1', selected: true },
        { label: 'test2', value: 'test2', selected: false },
      ],
    };
    const question = new QuestionCheckboxGroup(options);
    expect(question.name).toEqual('test');
    expect(question.values.length).toEqual(2);
  });
});

describe('QuestionContractDetails', () => {
  test('should create a new instance with default values', () => {
    const question = new QuestionContractDetails({});

    expect(question).toBeDefined();
    expect(question.type).toBe('text');
    expect(question.name).toBe('text-0');
    expect(question.subtype).toBe('text');
    expect(question.source).toBeUndefined();
    expect(question.contractId).toBeUndefined();
  });

  test('should create a new instance with custom values', () => {
    const options = {
      type: 'textarea',
      name: 'my-textarea',
      subtype: 'other',
      source: 'source-1',
      contractId: '123',
    };

    const question = new QuestionContractDetails(options);

    expect(question).toBeDefined();
    expect(question.type).toBe('textarea');
    expect(question.name).toBe('my-textarea');
    expect(question.subtype).toBe('other');
    expect(question.source).toBe('source-1');
    expect(question.contractId).toBe('123');
  });

  test('should create a new instance with default values if options parameter is null', () => {
    const question = new QuestionContractDetails(null);

    expect(question).toBeDefined();
    expect(question.type).toBe('text');
    expect(question.name).toBe('text-1');
    expect(question.subtype).toBe('text');
    expect(question.source).toBeUndefined();
    expect(question.contractId).toBeUndefined();
  });

  test('should create a new instance with default values if options parameter is undefined', () => {
    const question = new QuestionContractDetails(undefined);

    expect(question).toBeDefined();
    expect(question.type).toBe('text');
    expect(question.name).toBe('text-2');
    expect(question.subtype).toBe('text');
    expect(question.source).toBeUndefined();
    expect(question.contractId).toBeUndefined();
  });
});

describe('QuestionDateSigned', () => {
  let question: QuestionDateSigned;

  beforeEach(() => {
    const options = {
      name: 'date-signed',
      label: 'Date signed',
      source: 'contract',
      contractId: '123',
      subtype: 'date',
    };

    question = new QuestionDateSigned(options);
  });

  it('should create', () => {
    expect(question).toBeTruthy();
  });

  it('should set the correct type', () => {
    expect(question.type).toEqual(QuestionTypes.DATE_SIGNED);
  });

  it('should inherit properties from QuestionFormControl', () => {
    expect(question.name).toEqual('date-signed');
    expect(question.label).toEqual('Date signed');
    expect(question.source).toEqual('contract');
  });
});
describe('QuestionDate', () => {
  it('should create a new instance with default options', () => {
    const question = new QuestionDate();

    expect(question).toBeInstanceOf(QuestionDate);
    expect(question).toBeInstanceOf(QuestionFormControl);
    expect(question.name).toBe('date-0');
    expect(question.type).toEqual('');
  });

  it('should create a new instance with custom options', () => {
    const options = {
      name: 'custom-date-name',
      type: 'custom-date-type',
    };

    const question = new QuestionDate(options);

    expect(question).toBeInstanceOf(QuestionDate);
    expect(question).toBeInstanceOf(QuestionFormControl);
    expect(question.name).toBe(options.name);
    expect(question.type).toBe(options.type);
  });
});
describe('QuestionDropdown', () => {
  let options: QuestionDropdownOptions;
  let dropdown: QuestionDropdown;

  beforeEach(() => {
    options = {
      name: 'dropdown',
      values: [
        { label: 'Option 1', value: '1',selected: false  },
        { label: 'Option 2', value: '2', selected: true },
        { label: 'Option 3', value: '3',selected: false  },
      ],
    };
    dropdown = new QuestionDropdown(options);
  });

  it('should create', () => {
    expect(dropdown).toBeTruthy();
  });

  it('should set values from options', () => {
    expect(dropdown.values).toEqual(options.values);
  });

  it('should set name from options', () => {
    expect(dropdown.name).toBe(options.name);
  });

  it('should set default name if not provided', () => {
    dropdown = new QuestionDropdown();
    expect(dropdown.name).toBe('select-0');
  });

  it('should set default values if not provided', () => {
    dropdown = new QuestionDropdown();
    expect(dropdown.values).toEqual([]);
  });

  it('should update selected value', () => {
    const { values } = dropdown;
    dropdown.values = [values[0],{...values[1], selected:false}, {...values[2], selected:true}];
    expect(dropdown.values[0].selected).toBeFalsy();
    expect(dropdown.values[1].selected).toBeFalsy();
    expect(dropdown.values[2].selected).toBeTruthy();
  });

  it('should get selected value', () => {
    const selectedValue: QuestionDropdownValue = dropdown.values.find(x => x.selected);
    expect(selectedValue).toEqual({ label: 'Option 2', value: '2', selected: true });
  });
});

describe('QuestionFacilityAttributes', () => {
  it('should create instance of QuestionFacilityAttributes class', () => {
    const options = {
      subtype: 'subtype',
      source: 'source',
      contractId: 'contractId',
      values: [{ key: 'value' }],
    };
    const questionFacilityAttributes = new QuestionFacilityAttributes(options);
    expect(questionFacilityAttributes).toBeInstanceOf(QuestionFacilityAttributes);
    expect(questionFacilityAttributes.subtype).toBe(options.subtype);
    expect(questionFacilityAttributes.source).toBe(options.source);
    expect(questionFacilityAttributes.contractId).toBe(options.contractId);
    expect(questionFacilityAttributes.values).toBe(options.values);
  });

  it('should set default name if name is not provided', () => {
    const options = {
      subtype: 'subtype',
      source: 'source',
      contractId: 'contractId',
      values: [{ key: 'value' }],
    };
    const questionFacilityAttributes = new QuestionFacilityAttributes(options);
    expect(questionFacilityAttributes.name).toBeDefined();
    expect(typeof questionFacilityAttributes.name).toBe('string');
    expect(questionFacilityAttributes.name).toContain('text');
  });

  it('should set default values if values are not provided', () => {
    const options = {
      subtype: 'subtype',
      source: 'source',
      contractId: 'contractId',
    };
    const questionFacilityAttributes = new QuestionFacilityAttributes(options);
    expect(questionFacilityAttributes.values).toBeDefined();
    expect(Array.isArray(questionFacilityAttributes.values)).toBe(true);
    expect(questionFacilityAttributes.values.length).toBe(0);
  });

  it('should set default subtype if subtype is not provided', () => {
    const options = {
      source: 'source',
      contractId: 'contractId',
      values: [{ key: 'value' }],
    };
    const questionFacilityAttributes = new QuestionFacilityAttributes(options);
    expect(questionFacilityAttributes.subtype).toBeDefined();
    expect(typeof questionFacilityAttributes.subtype).toBe('string');
    expect(questionFacilityAttributes.subtype).toContain('text');
  });

  it('should set default source if source is not provided', () => {
    const options = {
      subtype: 'subtype',
      contractId: 'contractId',
      values: [{ key: 'value' }],
    };
    const questionFacilityAttributes = new QuestionFacilityAttributes(options);
    expect(questionFacilityAttributes.source).toBeDefined();
    expect(typeof questionFacilityAttributes.source).toBe('string');
    expect(questionFacilityAttributes.source).toContain('undefined');
  });

  it('should set default contractId if contractId is not provided', () => {
    const options = {
      subtype: 'subtype',
      source: 'source',
      values: [{ key: 'value' }],
    };
    const questionFacilityAttributes = new QuestionFacilityAttributes(options);
    expect(questionFacilityAttributes.contractId).toBeDefined();
    expect(typeof questionFacilityAttributes.contractId).toBe('string');
    expect(questionFacilityAttributes.contractId).toContain('undefined');
  });
});

describe('QuestionFormControl', () => {
  let options;
  let question;

  beforeEach(() => {
    options = {
      id: 'test',
      label: 'Test Label',
      name: 'testName',
      required: true,
      consumerKey: 1234,
      preferenceKey: 5678,
      facilityKey: 91011,
      dataType: 'text',
      source: 'testSource',
      readonly: false,
      workOrderFieldKey: 'testWorkOrderFieldKey',
      workOrderField: 'testWorkOrderField',
    };
    question = new QuestionFormControl(options);
  });

  it('should create a new instance of QuestionFormControl', () => {
    expect(question).toBeDefined();
  });

  it('should set properties from the options object', () => {
    expect(question.name).toEqual(options.name);
    expect(question.required).toEqual(options.required);
    expect(question.consumerKey).toEqual(options.consumerKey);
    expect(question.preferenceKey).toEqual(options.preferenceKey);
    expect(question.facilityKey).toEqual(options.facilityKey);
    expect(question.readonly).toEqual(options.readonly);
    expect(question.workOrderFieldKey).toEqual(options.workOrderFieldKey);
    expect(question.workOrderField).toEqual(options.workOrderField);
    expect(question.dataType).toEqual(options.dataType);
    expect(question.source).toEqual(options.source);
  });

  it('should set default values if options are not provided', () => {
    question = new QuestionFormControl();

    expect(question.name).toBeUndefined();
    expect(question.required).toBeFalsy();
    expect(question.consumerKey).toBeNull();
    expect(question.preferenceKey).toBeNull();
    expect(question.facilityKey).toBeNull();
    expect(question.readonly).toBeFalsy();
    expect(question.workOrderFieldKey).toBeUndefined();
    expect(question.workOrderField).toBeUndefined();
    expect(question.dataType).toBeUndefined();
    expect(question.source).toBeUndefined();
  });
});

describe('QuestionHeader', () => {
  it('should create instance with default values', () => {
    const question = new QuestionHeader();
    expect(question.subtype).toBe('h3');
    expect(question.type).toBe('');
  });

  it('should create instance with provided options', () => {
    const question = new QuestionHeader({ subtype: 'h2', label: 'Test Header' });
    expect(question.subtype).toBe('h2');
    expect(question.label).toBe('Test Header');
  });
});

describe('QuestionImageWorkOrder', () => {
  it('should create', () => {
    const question = new QuestionImageWorkOrder();
    expect(question).toBeTruthy();
  });

  it('should have default values', () => {
    const question = new QuestionImageWorkOrder();
    expect(question.type).toBe('IMAGE');
    expect(question.subtype).toBe('IMAGE');
    expect(question.name).toBe('IMAGE-1');
  });

  it('should use provided options', () => {
    const options = {
      type: 'OTHER',
      subtype: 'OTHER',
      name: 'my-name',
    };
    const question = new QuestionImageWorkOrder(options);
    expect(question.type).toBe('OTHER');
    expect(question.subtype).toBe('OTHER');
    expect(question.name).toBe('my-name');
  });
});
describe('QuestionAssetTypeDetails', () => {
  let options: QuestionAssetTypeDetailsOptions;

  beforeEach(() => {
    options = {
      name: 'Test Question',
      assetTypes: [
        [new AssetTypeDetailValue({ label: 'Type 1', value: 'Value 1', assetTypeKey: 9879 })],
        [new AssetTypeDetailValue({ label: 'Type 2', value: 'Value 2', assetTypeKey: 9654 })],
      ],
    };
  });

  it('should create', () => {
    const question = new QuestionAssetTypeDetails(options);
    expect(question).toBeTruthy();
    expect(question.type).toEqual('asset-types-group');
    expect(question.assetTypes.length).toEqual(2);
    expect(question.assetTypes[0][0].label).toEqual('Type 1');
  });
});

describe('QuestionAssetTypeDetailsBase', () => {
  let options: QuestionAssetTypeDetailsBaseOptions;

  beforeEach(() => {
    options = {
      name: 'Test Question',
      values: [
        new AssetTypeDetailValue({ label: 'Type 1', value: 'Value 1', assetTypeKey: 1545 }),
        new AssetTypeDetailValue({ label: 'Type 2', value: 'Value 2', assetTypeKey: 98789 }),
      ],
      required: true,
      inline: false,
      other: true,
      consumerKey: 123,
      readonly: true,
      customName: 'Custom Name',
      customMeals: 'Custom Meals',
      customDining: 'Custom Dining',
      customCost: 'Custom Cost',
    };
  });

  it('should create', () => {
    const question = new QuestionAssetTypeDetailsBase(options);
    expect(question).toBeTruthy();
    expect(question.type).toEqual('asset-types-group');
    expect(question.values.length).toEqual(2);
    expect(question.values[0].label).toEqual('Type 1');
    expect(question.required).toEqual(true);
    expect(question.inline).toEqual(false);
    expect(question.other).toEqual(true);
    expect(question.consumerKey).toEqual(123);
    expect(question.readonly).toEqual(true);
    expect(question.customName).toEqual('Custom Name');
    expect(question.customMeals).toEqual('Custom Meals');
    expect(question.customDining).toEqual('Custom Dining');
    expect(question.customCost).toEqual('Custom Cost');
  });
});


describe('QuestionParagraph', () => {
  it('should create a question with default subtype "p"', () => {
    const question = new QuestionParagraph();
    expect(question.subtype).toBe('p');
  });

  it('should create a question with custom subtype', () => {
    const question = new QuestionParagraph({ subtype: 'custom' });
    expect(question.subtype).toBe('custom');
  });
});

  describe('constructor', () => {
    it('should set default name if not provided', () => {
      const question = new QuestionRadioGroup();
      expect(question.name).toMatch(/^radio-group-\d+$/);
    });

    it('should set provided name', () => {
      const question = new QuestionRadioGroup({ name: 'my-radio-group' });
      expect(question.name).toBe('my-radio-group');
    });

    it('should set default values if not provided', () => {
      const question = new QuestionRadioGroup();
      expect(question.values).toEqual([]);
    });

    it('should set provided values', () => {
      const values = [
        { label: 'Yes', value: 'yes', selected: false },
        { label: 'No', value: 'no', selected: true },
      ];
      const question = new QuestionRadioGroup({ values });
      expect(question.values).toEqual(values);
    });
  });

describe('QuestionReorder', () => {
  describe('constructor', () => {

    it('should set provided values if options are provided', () => {
      const options = {
        inline: true,
        facilityPicker: true,
        values: [
          { label: 'Value 1', value: 'value1', selected: true },
          { label: 'Value 2', value: 'value2', selected: false },
        ],
        prefRank: 1,
        PrefKeys: [
          {
            defaultRank: 1,
            preferenceKey: 123,
            active: true,
            name: 'Preference 1',
            preferenceType: 'Type 1',
          },
        ],
      };

      const questionReorder = new QuestionReorder(options);

      expect(questionReorder.type).toEqual('facility-picker');
      expect(questionReorder.inline).toEqual(true);
      expect(questionReorder.facilityPicker).toEqual(true);
      expect(questionReorder.values).toEqual(options.values);
      expect(questionReorder.prefRank).toEqual(1);
      expect(questionReorder.PrefKeys).toEqual(options.PrefKeys);
    });
  });

  describe('sort', () => {
    const preferences: PatronPreference[] = [
      { facilityKey: 2, preferenceKey: 123, rank: 1 },
      { facilityKey: 1, preferenceKey: 456, rank: 2 },
      { facilityKey: 3, preferenceKey: 789, rank: 3 },
    ];

    it('should return -1 if the current value has a lower preference than the next value', () => {
      const current: QuestionReorderValue = {
        label: 'Value 1',
        value: 'value1',
        selected: true,
        facilityKey: 1,
      };

      const next: QuestionReorderValue = {
        label: 'Value 2',
        value: 'value2',
        selected: false,
        facilityKey: 2,
      };

      const result = QuestionReorder.sort(preferences, current, next, 0);

      expect(result).toEqual(1);
    });

    it('should return 1 if the current value has a higher preference than the next value', () => {
      const current: QuestionReorderValue = {
        label: 'Value 1',
        value: 'value1',
        selected: true,
        facilityKey: 2,
      };

      const next: QuestionReorderValue = {
        label: 'Value 2',
        value: 'value2',
        selected: false,
        facilityKey: 1,
      };

      const result = QuestionReorder.sort(preferences, current, next, 0);

      expect(result).toEqual(-1);
    });
  });
});

describe('QuestionRoommatePreference', () => {
  it('should create a new instance with correct values', () => {
    const options = {
      roommateSelection: true,
      values: [{ label: 'Value 1', value: '1' }],
      prefRank: 2,
      searchOptions: 'search',
      showOptions: 'show',
    };

    const question = new QuestionRoommatePreference(options);

    expect(question.type).toEqual('text');
    expect(question.name).toContain('text');
    expect(question.source).toBeUndefined();
    expect(question.roommateSelection).toEqual(true);
    expect(question.values).toEqual(options.values);
    expect(question.prefRank).toEqual(2);
    expect(question.searchOptions).toEqual('search');
    expect(question.showOptions).toEqual('show');
  });
});

describe('QuestionActionButton', () => {
  it('should create a new instance with correct values', () => {
    const options = {
      buttonText: 'Click me',
      metadata: { id: 1 },
      action: jest.fn(),
    };

    const question = new QuestionActionButton(options);

    expect(question.type).toEqual('action-button');
    expect(question.name).toContain('text');
    expect(question.source).toBeUndefined();
    expect(question.buttonText).toEqual('Click me');
    expect(question.metadata).toEqual({ id: 1 });
    expect(typeof question.action).toEqual('function');
  });

  it('should call the action function when button is clicked', () => {
    const options = {
      buttonText: 'Click me',
      action: jest.fn(),
    };

    const question = new QuestionActionButton(options);

    // simulate button click
    question.action();

    expect(question.action).toHaveBeenCalled();
  });
});

describe('QuestionTextarea', () => {
  describe('constructor', () => {
    it('should create a new QuestionTextarea instance with default options', () => {
      const questionTextarea = new QuestionTextarea();
      expect(questionTextarea.type).toEqual('textarea');
      expect(questionTextarea.subtype).toEqual('textarea');
      expect(questionTextarea.name).toMatch(/^textarea-\d+$/);
    });

    it('should create a new QuestionTextarea instance with custom options', () => {
      const options = {
        label: 'Description',
        required: true,
        name: 'description'
      };
      const questionTextarea = new QuestionTextarea(options);
      expect(questionTextarea.type).toEqual('textarea');
      expect(questionTextarea.subtype).toEqual('textarea');
      expect(questionTextarea.label).toEqual('Description');
      expect(questionTextarea.required).toEqual(true);
      expect(questionTextarea.name).toEqual('description');
    });
  });
});
describe('QuestionReorder', () => {
  it('should create an instance', () => {
    const questionReorder = new QuestionReorder();
    expect(questionReorder).toBeTruthy();
  });
});

describe('QuestionRoommatePreference', () => {
  it('should create an instance', () => {
    const questionRoommatePreference = new QuestionRoommatePreference({
      roommateSelection: true,
      values: [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' }
      ],
      searchOptions: 'Search',
      showOptions: 'Show options'
    });
    expect(questionRoommatePreference).toBeTruthy();
  });
});

describe('QuestionActionButton', () => {
  it('should create an instance', () => {
    const questionActionButton = new QuestionActionButton({
      buttonText: 'Click me!',
      action: () => console.log('Button clicked!')
    });
    expect(questionActionButton).toBeTruthy();
  });
});

describe('QuestionTextarea', () => {
  it('should create an instance', () => {
    const questionTextarea = new QuestionTextarea();
    expect(questionTextarea).toBeTruthy();
  });
});

describe('QuestionTextbox', () => {
  it('should create an instance', () => {
    const questionTextbox = new QuestionTextbox();
    expect(questionTextbox).toBeTruthy();
  });
});

describe('QuestionWaitingListRequest', () => {
  it('should create an instance with default options', () => {
    const question = new QuestionWaitingListRequest({});

    expect(question.type).toBe('text');
    expect(question.name).toMatch(/^text-\d+$/);
    expect(question.source).toBeUndefined();
    expect(question.attributeSelection).toBeFalsy();
    expect(question.facilitySelection).toBeFalsy();
  });

  it('should create an instance with custom options', () => {
    const question = new QuestionWaitingListRequest({
      type: 'waiting-list-request',
      name: 'my-question',
      source: 'my-source',
      attributeSelection: true,
      facilitySelection: false,
    });

    expect(question.type).toBe('waiting-list-request');
    expect(question.name).toBe('my-question');
    expect(question.source).toBe('my-source');
    expect(question.attributeSelection).toBe(true);
    expect(question.facilitySelection).toBe(false);
  });

  it('should default to boolean values for attributeSelection and facilitySelection', () => {
    const question1 = new QuestionWaitingListRequest({});
    const question2 = new QuestionWaitingListRequest({ attributeSelection: false });
    const question3 = new QuestionWaitingListRequest({ facilitySelection: true });

    expect(question1.attributeSelection).toBe(false);
    expect(question1.facilitySelection).toBe(false);
    expect(question2.attributeSelection).toBe(false);
    expect(question2.facilitySelection).toBe(false);
    expect(question3.attributeSelection).toBe(false);
    expect(question3.facilitySelection).toBe(true);
  });
});
