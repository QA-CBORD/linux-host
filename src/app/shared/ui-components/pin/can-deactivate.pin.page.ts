import { Injectable } from "@angular/core";
import { CanDeactivate, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { SkipBackButtonEvent } from "./skip-back-button-event";

@Injectable({ providedIn: 'root' })
export class CanDeactivatePage implements CanDeactivate<SkipBackButtonEvent> {
    canDeactivate(component: SkipBackButtonEvent): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return new Promise((resolve) => {
            const canDeactivate = component.canDeactivate();
            console.log("canDeactivate: ", canDeactivate)
            return resolve(canDeactivate);
        });
    }

}