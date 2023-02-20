import { Injectable } from "@angular/core";
import { EnvironmentFacadeService } from "@core/facades/environment/environment.facade.service";
import { HousingProxyService } from "../housing-proxy.service";
import { Response } from '@sections/housing/housing.model';
import { of, Observable } from "rxjs";
import { catchError, map } from 'rxjs/operators';
import { isSuccessful } from '@sections/housing/utils/is-successful';
import { Inspection } from './inspections-forms.model';
import { InspectionsStateService } from './inspections-forms-state.service';

@Injectable({
  providedIn: 'root',
})
export class InspectionService {
  private inspectiontUrl = `${this._environment.getHousingAPIURL()
    }/roomselectproxy/v.1.0/room-inspections-proxy`;

  constructor(
    private _environment: EnvironmentFacadeService,
    private _housingProxyService: HousingProxyService,
    private _inspectionStateService: InspectionsStateService,
    ) { }


  getFormDefinitionInspection() {
    return this._inspectionStateService.getInspectionDetailsForm().pipe(
      map((res=>{
        const body =JSON.parse(res.formDefinition.applicationFormJson) 
        return body.filter(value => value.inventoryConditions)[0];
      }))
    )
  
  }

  submitInspection(inspectionData: Inspection): Observable<boolean> {
    if(inspectionData.residentInspectionKey){
      return this._housingProxyService.putInspection(this.inspectiontUrl, inspectionData).pipe(
        map((response: Response) => {
          if (isSuccessful(response.status)) {
            return true;
          } else {
            throw new Error(response.status.message);
          }
        }
        ),
        catchError(() => of(false))
      );
    }

    return this._housingProxyService.post<Response>(this.inspectiontUrl, inspectionData).pipe(
      map((response: Response) => {
        if (isSuccessful(response.status)) {
          return true;
        } else {
          throw new Error(response.status.message);
        }
      }
      ),
      catchError(() => of(false))
    );
  }


}