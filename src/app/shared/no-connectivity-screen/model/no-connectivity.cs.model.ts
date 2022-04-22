import { ContentStringModel, NullableContent } from "@shared/model/content-strings/content-string-models";
import { noConnectivityScreentDefaultStrings } from "@shared/model/content-strings/default-strings";

export class ConnectivityScreenCsModel extends ContentStringModel {
    constructor(contentWrapper: NullableContent) {
        super(contentWrapper.getConfig(), noConnectivityScreentDefaultStrings);
    }
}

export enum ConnectivityError {
    DEVICE_CONNECTION = 'DEVICE_CONNECTION',
    SERVER_CONNECTION = 'SERVER_CONNECTION'
}

export interface ConnectivityPageConfig {
    titleIcon: string,
    mainImg: string,
    getContent: (csModel: ConnectivityScreenCsModel) => any
}

type ConfigType = { -readonly [key in keyof typeof ConnectivityError]: ConnectivityPageConfig };

export const connectivityPageConfigurations: ConfigType = {
    [ConnectivityError.DEVICE_CONNECTION]: {
        titleIcon: '/assets/images/wifi-img.svg',
        mainImg: '/assets/images/Search_Connection_Undraw.svg',
        getContent: (csModel) => csModel.content
    },

    [ConnectivityError.SERVER_CONNECTION]: {
        titleIcon: '/assets/images/exclamation.svg',
        mainImg: '/assets/images/server-error.svg',
        getContent: (csModel) => {
            const content = csModel.content;
            return {
                description: content.description_server_error,
                title: content.title_server_error,
                try_again_btn: content.try_again_btn,
                scan_card_btn: content.scan_card_btn,
                retry: content.retry,
                connect_failed: content.connect_failed,
                scan_card_desc: content.scan_card_desc_server_error
            }
        }
    }
}