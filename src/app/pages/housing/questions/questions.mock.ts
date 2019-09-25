export function generateQuestions(): any[] {
  return [
    {
      type: 'header',
      subtype: 'h1',
      label: 'CBORD University New Student Application',
      attribute: null,
    },
    {
      type: 'paragraph',
      subtype: 'p',
      label:
        'We are so excited you have chosen to live on campus at CBORD University!&nbsp; Please fill out the following application and submit it to reserve a space on campus.&nbsp; If you have any questions, please notify us at 555-555-5555.',
      attribute: null,
    },
    {
      type: 'text',
      label: 'Preferred Name',
      name: 'text-1568315394169',
      subtype: 'text',
      attribute: 'Name',
    },
    {
      type: 'text',
      label: 'University Student ID Number',
      name: 'text-1568315396303',
      subtype: 'text',
      attribute: 'ID Number',
    },
    {
      type: 'date',
      label: 'Date of birth',
      name: 'date-1568315399895',
      attribute: 'Date of birth',
    },
    {
      type: 'textarea',
      label: 'Cell Phone Number',
      name: 'textarea-1568315408199',
      subtype: 'textarea',
      attribute: 'Phone Number',
    },
    {
      type: 'text',
      label: 'Secondary Email Address',
      name: 'text-1568315409856',
      subtype: 'text',
      attribute: 'Email',
    },
    {
      type: 'paragraph',
      subtype: 'blockquote',
      label: 'New Page',
      attribute: null,
    },
    {
      type: 'checkbox-group',
      required: true,
      label: 'Gender',
      name: 'checkbox-group-1568315413042',
      values: [
        {
          label: 'Female',
          value: 'Female',
          selected: true,
        },
        {
          label: 'Male',
          value: 'Male',
          selected: true,
        },
        {
          label: 'Transgender Female',
          value: 'Transgender Female',
          selected: true,
        },
        {
          label: 'Transgender Male',
          value: 'Transgender Male',
          selected: true,
        },
        {
          label: 'Non-binary',
          value: 'Non-binary',
          selected: true,
        },
      ],
      attribute: 'Gender',
    },
    {
      type: 'checkbox-group',
      label: 'Move In Semester',
      name: 'checkbox-group-1568315414321',
      values: [
        {
          label: 'Fall 2020',
          value: 'Fall 2020',
          selected: true,
        },
        {
          label: 'Spring 2021',
          value: 'Spring 2021',
          selected: true,
        },
      ],
      attribute: 'Starting Semester',
    },
    {
      type: 'text',
      label: 'Graduation Year',
      name: 'text-1568315415312',
      subtype: 'text',
      attribute: 'Year',
    },
  ];
}
