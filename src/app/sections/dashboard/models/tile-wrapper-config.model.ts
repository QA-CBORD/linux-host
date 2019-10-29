import { NAVIGATE } from '../../../app.global';

export interface TileWrapperConfig {
    title: string;
    navigate: NAVIGATE;
    iconName?: string;
    iconPath?: string;
    buttonConfig: {
        show: boolean;
        title?: string;
        navigate?: NAVIGATE;
    }
}