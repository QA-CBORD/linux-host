import * as Globals from './../../app/app.global';



export interface ExceptionPayload {
    displayOptions: Globals.Exception.DisplayOptions,
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

export interface ExceptionCallback {
    positiveButtonHandler: () => any,
    negativeButtonHandler?: () => any,
    indifferentButtonHandler?: () => any
}