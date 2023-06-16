import { PATRON_NAVIGATION } from '../../../app.global';



export enum APP_PROFILES {
    patron = 'patron',
    guest = 'guest',
    housing = 'housing'
  }

export interface TileWrapperConfig {
    id: string;
    title: string;
    navigate: PATRON_NAVIGATION | string;
    isEnable?: boolean;
    iconName?: string;
    iconPath?: string;
    buttonConfig: ButtonConfig
    navigateBack?: PATRON_NAVIGATION | string;
    supportProfiles?: APP_PROFILES[],
    stopNavigation?: boolean;
    stopNavigationMessage?: string;
}

export interface ButtonConfig {
    show: boolean;
    title?: string;
    navigate?: PATRON_NAVIGATION | string;
}
