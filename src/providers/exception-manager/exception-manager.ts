import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';

import { PopupPayload, PopupCallback } from '../../models/exception/exception-interface';
import * as Globals from '../../app/app.global';


@Injectable()
export class ExceptionManager {

  constructor() {

  }


  //temporary for testing
  public static showException(events: Events, exceptionPayload: PopupPayload){
      events.publish(Globals.Events.EXCEPTION_POPUP_SHOW, exceptionPayload);
  }

  // parse exception for code to determine payload to deliver to page
  // pull strings from file to facilitate localization (?)
  public static mapCode(exceptionCode: string, callback: PopupCallback): PopupPayload {
    Globals.Events.SIDEMENU_UPDATE;
    return {
      displayOptions: Globals.Popup.DisplayOptions.ONE_BUTTON,
      messageInfo: {
        title: "Generic Title",
        message: "Generic Message",
        positiveButtonTitle: "OK",
        positiveButtonHandler: callback.positiveButtonHandler
      }
    }
  }


}
