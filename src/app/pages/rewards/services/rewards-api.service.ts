import {Injectable} from '@angular/core';

import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

import {ContentService} from "../../../core/service/content-service/content.service";

import {MContentStringInfo} from "../../../core/model/content/content-string-info.interface";
import {ContentStringsParams} from "../../mobile-access/mobile-acces.config";


@Injectable()
export class RewardsApiService {

    private content;

    constructor(
        private readonly contentService: ContentService
    ) {
    }


    initContentStringsList(): Observable<MContentStringInfo[]> {
        return this.contentService.retrieveContentStringList(ContentStringsParams).pipe(
            tap(res => {
                this.content = res.reduce((init, elem) => ({ ...init, [elem.name]: elem.value }), {});
            })
        );
    }

    getContentValueByName(name: string): string | undefined {
        return this.content[name];
    }


}
