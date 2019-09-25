export class ReorderQuestionOptions {
    name: string;
    preference: string;
    constructor(label: string, pref: string) {
        this.name = label;
        this.preference = pref;
    }
}

export class ReorderQuestion {
    controlType =  'reorder';
    options: ReorderQuestionOptions[] = [];
    showFacilityList: boolean;
    preferenceCount: number

    constructor(reorderOptions) {
        this.showFacilityList = reorderOptions.showFacilityList === '1' ? true : false;
        this.preferenceCount = reorderOptions.preferenceCount;
        for (let i = 0; i < reorderOptions.values.length; i++) {
            this.options.push (new ReorderQuestionOptions (
                reorderOptions.values[i].name,
                reorderOptions.values[i].preference));
        }
    }
}
