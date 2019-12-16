import { NAVIGATE } from '../../../app.global';
import { LOCAL_ROUTING } from '@sections/accounts/accounts.config';

export interface TileWrapperConfig {
    id: string;
    title: string;
    navigate: NAVIGATE;
    isEnable?: boolean;
    iconName?: string;
    iconPath?: string;
    buttonConfig: {
        show: boolean;
        title?: string;
        navigate?: string[] | NAVIGATE;
    }
}