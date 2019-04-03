import { Injectable } from '@angular/core';
import { Events } from '@ionic/angular';

import * as Globals from '../../../app.global';
import { ExceptionPayload } from '../../model/exception/exception-interface';


@Injectable({
  providedIn: 'root'
})
export class ExceptionProvider {

  constructor() { }

  /**
   * Create exception popup
   * @param events Event object
   * @param exceptionPayload Payload for exception popup
   */
  static showException(events: Events, exceptionPayload: ExceptionPayload) {
    events.publish(Globals.Events.EXCEPTION_SHOW, exceptionPayload);
  }

}
