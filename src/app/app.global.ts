import { Injectable } from "@angular/core";
import { Environment } from "../app/environment";

export namespace Exception {
    export enum DisplayOptions {
        ONE_BUTTON,
        TWO_BUTTON,
        THREE_BUTTON
    }
}

@Injectable()
export class Events {

    public static readonly SIDEMENU_UPDATE = "data:navigationMenu:updated";
	public static readonly SIDEPANE_ENABLE = "state:navigationMenu:visibility";
	
	public static readonly EXCEPTION_SHOW = "state:exceptionShow:visibility";

	public static readonly LOADER_SHOW = "state:loader:visibility";

}
