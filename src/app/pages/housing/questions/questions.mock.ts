export function generateQuestions(): any[] {
  return [
    { type: 'header', subtype: 'h1', label: 'Heading 1', attribute: null },
    {
      type: 'paragraph',
      subtype: 'p',
      label: 'Fill out the form to the bestest of your abilitestest.&nbsp;',
      attribute: null,
    },
    { type: 'header', subtype: 'h2', label: 'Personal Info', attribute: null },
    { type: 'text', label: 'Name', name: 'text-1568748841830', subtype: 'text', attribute: 'Name' },
    { type: 'text', label: 'ID Number', name: 'text-1568748852914', subtype: 'text', attribute: 'ID Number' },
    { type: 'text', label: 'Email', name: 'text-1568748852251', subtype: 'text', attribute: 'Email' },
    { type: 'date', label: 'Date of birth', name: 'date-1568748899067', attribute: 'Date of birth' },
    { type: 'header', subtype: 'h2', label: 'Optional Info', attribute: null },
    { type: 'paragraph', subtype: 'p', label: 'This information is completely optional.', attribute: null },
    {
      type: 'checkbox-group',
      label: 'Gender',
      name: 'checkbox-group-1568748935545',
      values: [{ label: 'Option 1', value: 'option-1', selected: true }],
      attribute: 'Gender',
    },
    { type: 'text', label: 'Phone Number', name: 'text-1568748932732', subtype: 'text', attribute: 'Phone Number' },
  ];
}
