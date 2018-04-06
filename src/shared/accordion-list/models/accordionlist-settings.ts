// SideMenuSettings interface
export interface AccordionListSettings {
    accordionMode?: boolean;
    arrowIcon?: string;

    headerHeight?: {
        ios?: number,
        md?: number,
        wp?: number
    };

    itemHeight?: {
        ios?: number,
        md?: number,
        wp?: number
    };

    showSelectedOption?: boolean;
    selectedOptionClass?: string;

    indentSubOptionsWithoutIcons?: boolean;

    subOptionIndentation?: {
        ios?: string,
        md?: string,
        wp?: string
    };
}