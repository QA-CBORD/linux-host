import { Injectable } from "@angular/core";
import { CommonService } from "@shared/services/common.service";
import { RetryHandler } from "./model/retry-handler";


@Injectable({
    providedIn: 'root'
})
export class ConnectivityServiceFacade {
  
    constructor(private readonly commonServiceFacade: CommonService){

    }



    async showDialog(retryHandler: RetryHandler): Promise<boolean> {
  
        return true;
    }

}