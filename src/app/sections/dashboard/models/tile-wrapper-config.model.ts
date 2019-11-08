import { NAVIGATE } from '../../../app.global';

export interface TileWrapperConfig {
    id: string;
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