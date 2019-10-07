export function generateQuestions(): any[] {
  return [
    { type: 'header', subtype: 'h1', label: 'CBORD University New Student Application', attribute: null },
    {
      type: 'paragraph',
      subtype: 'p',
      label:
        'We are so excited you have chosen to live on campus at CBORD University! Please fill out the following application and submit it to reserve a space on campus.',
      attribute: null,
    },
    { type: 'text', label: 'Preferred Name', name: 'text-1568315394169', subtype: 'text', attribute: 'Name' },
    {
      type: 'text',
      label: 'University Student ID Number',
      name: 'text-1568315396303',
      subtype: 'text',
      attribute: 'ID Number',
    },
    { type: 'date', label: 'Date of birth', name: 'date-1568315399895', attribute: 'Date of birth' },
    {
      type: 'text',
      label: 'Cell Phone Number',
      name: 'textarea-1568315408199',
      subtype: 'textarea',
      attribute: 'Phone Number',
    },
    {
      type: 'select',
      label: 'Year:',
      className: 'form-control',
      name: 'select-1559676230181',
      required: 'false',
      order: '3',
      values: [
        {
          label: 'Freshman',
          value: '1',
        },
        {
          label: 'Sophomore',
          value: '2',
        },
        {
          label: 'Junior',
          value: '3',
        },
        {
          label: 'Senior',
          value: '4',
        },
      ],
    },
    {
      type: 'radio-group',
      required: true,
      label: 'Gender',
      name: 'radio-group-1568315413042',
      values: [
        { label: 'Female', value: 'Female', selected: false },
        { label: 'Male', value: 'Male', selected: false },
        { label: 'Transgender Female', value: 'Transgender Female', selected: false },
        { label: 'Transgender Male', value: 'Transgender Male', selected: false },
        { label: 'Non-binary', value: 'Non-binary', selected: false },
      ],
      attribute: 'Gender',
    },
    { type: 'paragraph', subtype: 'blockquote', label: 'New Page', attribute: null },

    { type: 'text', label: 'Email Address', name: 'text-1568315409856', subtype: 'text', attribute: 'Email' },
    {
      type: 'checkbox-group',
      label: 'Starting Semester',
      name: 'checkbox-group-1568315414321',
      values: [
        { label: 'Fall 2020', value: 'Fall 2020', selected: false },
        { label: 'Spring 2021', value: 'Spring 2021', selected: false },
      ],
      attribute: 'Starting Semester',
    },
    { type: 'text', label: 'Graduation Year', name: 'text-1568315415312', subtype: 'text', attribute: 'Year' },

    { type: 'paragraph', subtype: 'blockquote', label: 'New Page', attribute: null },

    { type: 'textarea', label: 'Feedback', name: 'textarea-1568315409856', subtype: 'textarea', attribute: 'Feedback' },
  ];
}
