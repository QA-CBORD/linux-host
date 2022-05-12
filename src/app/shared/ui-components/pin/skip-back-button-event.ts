
import { App } from "@capacitor/app";
import { PluginListenerHandle } from "@capacitor/core";

export abstract class SkipBackButtonEvent {

    private canNavigateAway: boolean = true;

    private pluginListenerHandle: PluginListenerHandle

    constructor() {
        this.subscribe2BackButtonEvent();
    }

    protected async subscribe2BackButtonEvent() {
        this.pluginListenerHandle = await App.addListener('backButton', (e) => {
            console.log('backButton evebt: does not work. ', e.canGoBack);
            this.canNavigateAway = e.canGoBack;
        });



        // document.addEventListener('ionBackButton', (ev) => {
        //     this.canNavigateAway = false;
        //     console.log("ionBackButton: ", ev);
        // });
    }


    protected removeBackButtonEventSubscription() {
        console.log("removin subscription: removeBackButtonEventSubscription",);
        try {
            this.pluginListenerHandle?.remove();
            // document.removeEventListener('ionBackButton', (e) => {
            //     console.log("removeBackButtonEventSubscription: ", e);
            // });
        } catch (error) {
            console.log("removeBackButtonEventSubscription error", error);
        }
    }


    public canDeactivate(): boolean {
        const canDeactivate = this.canNavigateAway;
        this.canNavigateAway = true;
        return canDeactivate;
    }

    protected ionViewDidLeave() {
        this.removeBackButtonEventSubscription();
    }
}