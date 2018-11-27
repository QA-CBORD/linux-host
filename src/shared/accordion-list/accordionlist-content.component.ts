
// Angular
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core'; // tslint:disable-line
import { Observable } from "rxjs/Observable";

// Ionic
import { Platform, Events } from 'ionic-angular';

// Models
import { AccordionListOptionModel } from './models/accordionlist-option-model';
import { AccordionListSettings } from './models/accordionlist-settings';
import { AccordionListRedirectEvent, AccordionListRedirectEventData } from './models/accordionlist-redirect-events';

class InnerAccordionListOptionModel {
    id: number;
    iconName: string;
    displayName: string;
    displayDescription?: string;
    badge?: Observable<any>;
    badgeColor?: string;

    targetOption: AccordionListOptionModel;

    parent: InnerAccordionListOptionModel;

    selected: boolean;

    expanded: boolean;
    subItemsCount: number;
    subOptions: Array<InnerAccordionListOptionModel>;

    private static counter = 1;
    public static fromMenuOptionModel(option: AccordionListOptionModel, parent?: InnerAccordionListOptionModel): InnerAccordionListOptionModel {

        let accordionListOptionModel = new InnerAccordionListOptionModel();

        accordionListOptionModel.id = this.counter++;
        accordionListOptionModel.iconName = option.iconName;
        accordionListOptionModel.displayName = option.displayName;
        accordionListOptionModel.displayDescription = option.displayDescription;
        accordionListOptionModel.badge = option.badge;
        accordionListOptionModel.badgeColor = option.badgeColor;
        accordionListOptionModel.targetOption = option;
        accordionListOptionModel.parent = parent || null;

        accordionListOptionModel.selected = option.selected;

        if (option.subItems) {
            accordionListOptionModel.expanded = false;
            accordionListOptionModel.subItemsCount = option.subItems.length;
            accordionListOptionModel.subOptions = [];

            option.subItems.forEach(subItem => {

                let innerSubItem = InnerAccordionListOptionModel.fromMenuOptionModel(subItem, accordionListOptionModel);
                accordionListOptionModel.subOptions.push(innerSubItem);

                // Select the parent if any
                // child option is selected
                if (subItem.selected) {
                    innerSubItem.parent.selected = true;
                    innerSubItem.parent.expanded = true;
                }

            });
        }

        return accordionListOptionModel;
    }
}

@Component({
    selector: 'accordionlist-content',
    templateUrl: 'accordionlist-content.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccordionListContentComponent {

    // Main inputs
    public listSettings: AccordionListSettings;
    public listOptions: Array<AccordionListOptionModel>;

    // Private properties
    private selectedOption: InnerAccordionListOptionModel;

    public collapsableItems: Array<InnerAccordionListOptionModel> = [];

    @Input('options')
    set options(value: Array<AccordionListOptionModel>) {
        if (value) {
            // Keep a reference to the options
            // sent to this component
            this.listOptions = value;
            this.collapsableItems = new Array<InnerAccordionListOptionModel>();

            // Map the options to our internal models
            this.listOptions.forEach(option => {
                let innerListOption = InnerAccordionListOptionModel.fromMenuOptionModel(option);
                this.collapsableItems.push(innerListOption);

                // Check if there's any option marked as selected
                if (option.selected) {
                    this.selectedOption = innerListOption;
                } else if (innerListOption.subItemsCount) {
                    innerListOption.subOptions.forEach(subItem => {
                        if (subItem.selected) {
                            this.selectedOption = subItem;
                        }
                    });
                }
            });
        }
    }

    @Input('settings')
    set settings(value: AccordionListSettings) {
        if (value) {
            this.listSettings = value;
            this.mergeSettings();
        }
    }

    // Outputs: return the selected option to the caller
    @Output() selectOption = new EventEmitter<any>();

    constructor(private platform: Platform,
        private eventsCtrl: Events,
        private cdRef: ChangeDetectorRef) {

        // Handle the redirect event
        this.eventsCtrl.subscribe(AccordionListRedirectEvent, (data: AccordionListRedirectEventData) => {
            this.updateSelectedOption(data);
        });

    }

    ngOnDestroy() {
        this.eventsCtrl.unsubscribe(AccordionListRedirectEvent);
    }

    // ---------------------------------------------------
    // PUBLIC methods
    // ---------------------------------------------------

    // Send the selected option to the caller component
    public select(option: InnerAccordionListOptionModel): void {
        if (this.listSettings.showSelectedOption) {
            this.setSelectedOption(option);
        }

        // Return the selected option (not our inner option)
        this.selectOption.emit(option.targetOption);
    }

    // Toggle the sub options of the selected item
    public toggleItemOptions(targetOption: InnerAccordionListOptionModel): void {

        if (!targetOption) return;

        // If the accordion mode is set to true, we need
        // to collapse all the other menu options
        if (this.listSettings.accordionMode) {
            this.collapsableItems.forEach(option => {
                if (option.id !== targetOption.id) {
                    option.expanded = false;
                }
            });
        }

        // Toggle the selected option
        targetOption.expanded = !targetOption.expanded;
    }

    // Reset the entire menu
    public collapseAllOptions(): void {
        this.collapsableItems.forEach(option => {
            if (!option.selected) {
                option.expanded = false;
            }

            if (option.subItemsCount) {
                option.subOptions.forEach(subItem => {
                    if (subItem.selected) {
                        // Expand the parent if any of
                        // its childs is selected
                        subItem.parent.expanded = true;
                    }
                });
            }
        });

        // Update the view since there wasn't
        // any user interaction with it
        this.cdRef.detectChanges();
    }

    // Get the proper indentation of each option
    public get subOptionIndentation(): string {
        if (this.platform.is('ios')) return this.listSettings.subOptionIndentation.ios;
        if (this.platform.is('windows')) return this.listSettings.subOptionIndentation.wp;
        return this.listSettings.subOptionIndentation.md;
    }

    // Get the proper height of each header
    public get headerHeight(): number {
        if (this.platform.is('ios')) return this.listSettings.headerHeight.ios;
        if (this.platform.is('windows')) return this.listSettings.headerHeight.wp;
        return this.listSettings.headerHeight.md;
    }

    // Get the proper height of each option
    public get itemHeight(): number {
        if (this.platform.is('ios')) return this.listSettings.itemHeight.ios;
        if (this.platform.is('windows')) return this.listSettings.itemHeight.wp;
        return this.listSettings.itemHeight.md;
    }

    // ---------------------------------------------------
    // PRIVATE methods
    // ---------------------------------------------------

    // Method that set the selected option and its parent
    private setSelectedOption(option: InnerAccordionListOptionModel) {
        if (!option.targetOption.component) return;

        // Clean the current selected option if any
        if (this.selectedOption) {
            this.selectedOption.selected = false;
            this.selectedOption.targetOption.selected = false;

            if (this.selectedOption.parent) {
                this.selectedOption.parent.selected = false;
                this.selectedOption.parent.expanded = false;
            }

            this.selectedOption = null;
        }

        // Set this option to be the selected
        option.selected = true;
        option.targetOption.selected = true;

        if (option.parent) {
            option.parent.selected = true;
            option.parent.expanded = true;
        }

        // Keep a reference to the selected option
        this.selectedOption = option;

        // Update the view if needed since we may have
        // expanded or collapsed some options
        this.cdRef.detectChanges();
    }

    // Update the selected option
    private updateSelectedOption(data: AccordionListRedirectEventData): void {

        if (!data.displayName) {
            return;
        }

        let targetOption;

        this.collapsableItems.forEach(option => {
            if (option.displayName.toLowerCase() === data.displayName.toLowerCase()) {
                targetOption = option;
            } else if (option.subItemsCount) {
                option.subOptions.forEach(subOption => {
                    if (subOption.displayName.toLowerCase() === data.displayName.toLowerCase()) {
                        targetOption = subOption;
                    }
                });
            }
        });

        if (targetOption) {
            this.setSelectedOption(targetOption);
        }
    }

    // Merge the settings received with the default settings
    private mergeSettings(): void {
        const defaultSettings: AccordionListSettings = {
            accordionMode: false,
            headerHeight: {
                ios: 50,
                md: 50,
                wp: 50
            },
            itemHeight: {
                ios: 50,
                md: 50,
                wp: 50
            },
            arrowIcon: 'ios-arrow-down',
            showSelectedOption: false,
            selectedOptionClass: 'selected-option',
            indentSubOptionsWithoutIcons: false,
            subOptionIndentation: {
                ios: '16px',
                md: '16px',
                wp: '16px'
            }
        }

        if (!this.listSettings) {
            // Use the default values
            this.listSettings = defaultSettings;
            return;
        }

        if (!this.listSettings.headerHeight) {
            this.listSettings.headerHeight = defaultSettings.headerHeight;
        } else {
            this.listSettings.headerHeight.ios = this.isDefinedAndPositive(this.listSettings.headerHeight.ios) ? this.listSettings.headerHeight.ios : defaultSettings.headerHeight.ios;
            this.listSettings.headerHeight.md = this.isDefinedAndPositive(this.listSettings.headerHeight.md) ? this.listSettings.headerHeight.md : defaultSettings.headerHeight.md;
            this.listSettings.headerHeight.wp = this.isDefinedAndPositive(this.listSettings.headerHeight.wp) ? this.listSettings.headerHeight.wp : defaultSettings.headerHeight.wp;
        }

        if (!this.listSettings.itemHeight) {
            this.listSettings.itemHeight = defaultSettings.itemHeight;
        } else {
            this.listSettings.itemHeight.ios = this.isDefinedAndPositive(this.listSettings.itemHeight.ios) ? this.listSettings.itemHeight.ios : defaultSettings.itemHeight.ios;
            this.listSettings.itemHeight.md = this.isDefinedAndPositive(this.listSettings.itemHeight.md) ? this.listSettings.itemHeight.md : defaultSettings.itemHeight.md;
            this.listSettings.itemHeight.wp = this.isDefinedAndPositive(this.listSettings.itemHeight.wp) ? this.listSettings.itemHeight.wp : defaultSettings.itemHeight.wp;
        }

        this.listSettings.showSelectedOption = this.isDefined(this.listSettings.showSelectedOption) ? this.listSettings.showSelectedOption : defaultSettings.showSelectedOption;
        this.listSettings.accordionMode = this.isDefined(this.listSettings.accordionMode) ? this.listSettings.accordionMode : defaultSettings.accordionMode;
        this.listSettings.arrowIcon = this.isDefined(this.listSettings.arrowIcon) ? this.listSettings.arrowIcon : defaultSettings.arrowIcon;
        this.listSettings.selectedOptionClass = this.isDefined(this.listSettings.selectedOptionClass) ? this.listSettings.selectedOptionClass : defaultSettings.selectedOptionClass;
        this.listSettings.subOptionIndentation = this.isDefined(this.listSettings.subOptionIndentation) ? this.listSettings.subOptionIndentation : defaultSettings.subOptionIndentation;

        this.listSettings.indentSubOptionsWithoutIcons = this.isDefined(this.listSettings.indentSubOptionsWithoutIcons) ? this.listSettings.indentSubOptionsWithoutIcons : defaultSettings.indentSubOptionsWithoutIcons;


        if (!this.listSettings.subOptionIndentation) {
            this.listSettings.subOptionIndentation = defaultSettings.subOptionIndentation;
        } else {
            this.listSettings.subOptionIndentation.ios = this.isDefined(this.listSettings.subOptionIndentation.ios) ? this.listSettings.subOptionIndentation.ios : defaultSettings.subOptionIndentation.ios;
            this.listSettings.subOptionIndentation.md = this.isDefined(this.listSettings.subOptionIndentation.md) ? this.listSettings.subOptionIndentation.md : defaultSettings.subOptionIndentation.md;
            this.listSettings.subOptionIndentation.wp = this.isDefined(this.listSettings.subOptionIndentation.wp) ? this.listSettings.subOptionIndentation.wp : defaultSettings.subOptionIndentation.wp;
        }
    }

    private isDefined(property: any): boolean {
        return property !== null && property !== undefined;
    }

    private isDefinedAndPositive(property: any): boolean {
        return this.isDefined(property) && !isNaN(property) && property > 0;
    }
}