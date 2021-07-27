import { Injectable } from "@angular/core";
import { ContentStringCategory } from "@shared/model/content-strings/content-strings-api";
import { CommonService } from "@shared/services/common.service";
import { Observable } from "rxjs";
import { CheckingContentCsModel } from "../contents-strings/checkin-content-string.model";

@Injectable({ providedIn: 'root'})
export class CheckingServiceFacade {
    constructor(private readonly commonService: CommonService) {}


    /**
     * solo se llama al cargar el primer componente del flow de checking
     * @returns 
     */
    loadAllContentString () :Observable<CheckingContentCsModel> {
        return this.commonService.loadContentString(ContentStringCategory.checkin);
    }

  /**
   * llamar desde cualquier component del flow de checking
   * @returns 
   */
    getContent(): CheckingContentCsModel {
        return this.commonService.getString(ContentStringCategory.checkin);
    }





}