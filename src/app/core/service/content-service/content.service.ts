import { Injectable } from '@angular/core';


import * as Globals from '../../../app.global';

import { BaseService, ServiceParameters } from '../base-service/base.service';
import { MContentStringInfo } from '../../model/content/content-string-info.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContentService extends BaseService {

  private serviceUrl = '/json/authentication';

  /**
   * Retrive single content string by name
   * @param stringName string enum name of content string
   */
  retrieveContentString(stringName: Globals.ContentString.EString): Observable<MContentStringInfo> {
    /// split string into domain, category, name
    const stringNameParts: string[] = stringName.toString().split('.');
    const postParams: ServiceParameters = {
      locale: null,
      domain: stringNameParts[0],
      category: stringNameParts[1],
      name: stringNameParts[2]
    };

    return this.httpRequestFull<any>(this.serviceUrl, 'retrieveString', true, true, postParams);
  }

  /**
   * Retreive a list of strings using the 'domain.category' for that list
   * @param stringListName 'domain.category' name of the list of strings to return
   */
  retrieveContentStringList(stringListName: Globals.ContentString.EList): Observable<MContentStringInfo[]> {
    /// split string into domain, category, name
    const stringNameParts: string[] = stringListName.toString().split('.');
    const postParams: ServiceParameters = {
      locale: null,
      domain: stringNameParts[0],
      category: stringNameParts[1]
    };

    return this.httpRequestFull<any>(this.serviceUrl, 'retrieveStringList', true, true, postParams);
  }


}
