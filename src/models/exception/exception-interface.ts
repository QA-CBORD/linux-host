import * as Globals from './../../app/app.global';


export interface ToastPayload {
    message: string,
    position: string,       // top, middle, bottom
    duration?: number,      // (millis) if null, toast will dismiss on close button click only
    buttonTitle?: string    // if null, no button will be shown.  Button will dismiss toast and call callback
    buttonCallback?: () => any
}

export interface PopupPayload {
    displayOptions: Globals.Popup.DisplayOptions,
    messageInfo: {
        title: string,
        message: string,
        positiveButtonTitle: string,
        positiveButtonHandler: () => any,
        negativeButtonTitle?: string,
        negativeButtonHandler?: () => any,
        indifferentButtonTitle?: string,
        indifferentButtonHandler?: () => any
    }
}

export interface PopupCallback {
    positiveButtonHandler: () => any,
    negativeButtonHandler?: () => any,
    indifferentButtonHandler?: () => any
}