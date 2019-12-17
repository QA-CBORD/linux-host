import { NAVIGATE } from '../../../app.global';

export interface TileWrapperConfig {
    id: string;
    title: string;
    navigate: NAVIGATE;
    isEnable?: boolean;
    iconName?: string;
    iconPath?: string;
    buttonConfig: ButtonConfig
}

export interface ButtonConfig {
    show: boolean;
    title?: string;
    navigate?: NAVIGATE | string;
}
