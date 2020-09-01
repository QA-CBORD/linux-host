import { PATRON_NAVIGATION } from '../../../app.global';

export interface TileWrapperConfig {
    id: string;
    title: string;
    navigate: PATRON_NAVIGATION | string;
    isEnable?: boolean;
    iconName?: string;
    iconPath?: string;
    buttonConfig: ButtonConfig
    navigateBack?: PATRON_NAVIGATION | string;
}

export interface ButtonConfig {
    show: boolean;
    title?: string;
    navigate?: PATRON_NAVIGATION | string;
}
