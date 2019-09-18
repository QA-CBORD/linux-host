export class DropDownQuestionOptions {
    label: string;
    value: string;
    selected: boolean;
    constructor(label: string, value: string, selected: boolean) {
        this.label = label;
        this.value = value;
        this.selected = selected;
    }
}

export class DropdownQuestion {
    controlType =  'dropdown';
    options: DropDownQuestionOptions[] = [];

    constructor(dropdownOptions) {
        for (let i = 0; i < dropdownOptions.values.length; i++) {
            this.options.push(new DropDownQuestionOptions(
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
