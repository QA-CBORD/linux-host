export class QuestionDropdownOptions {
    label: string;
    value: string;
    selected: boolean;

    constructor(label: string, value: string, selected: boolean) {
        this.label = label;
        this.value = value;
        this.selected = selected;
    }
}

export class QuestionDropdown {
    controlType =  'dropdown';
    options: QuestionDropdownOptions[] = [];

    constructor(dropdownOptions) {
        for (let i = 0; i < dropdownOptions.values.length; i++) {
            this.options.push(new QuestionDropdownOptions(
                dropdownOptions.values[i].label,
                dropdownOptions.values[i].value,
                dropdownOptions.values[i].selected === undefined ? false : true));
        }
        // this.options.push(dropdownOptions.values.flatMap(
        //     opt => new DropDownQuestionOptions(
        //         opt.label,
        //         opt.value,
        //         opt.selected === undefined ? false : opt.selected)));
    }
}
