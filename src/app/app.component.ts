import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, AlertController, MenuController, Events, SplitPane, Loading, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ArrayObservable } from 'rxjs/observable/ArrayObservable';
import { TranslateService } from "@ngx-translate/core";

import * as Globals from './app.global';
import { ExceptionPayload } from './../models/exception/exception-interface';

import { SideMenuContentComponent } from './../shared/side-menu-content/side-menu-content.component';
import { MenuOptionModel } from '../shared/side-menu-content/models/menu-option-model';
import { SideMenuSettings } from './../shared/side-menu-content/models/side-menu-settings';




@Component({
	templateUrl: 'app.html'
})
export class MyApp {

	@ViewChild(Nav) navCtrl: Nav;
	@ViewChild(SplitPane) splitPane: SplitPane;
	@ViewChild(SideMenuContentComponent) sideMenu: SideMenuContentComponent;

	private loader: Loading;
	bShowSplitPane: boolean = true;

	rootPage: string = 'home';

	// Options to show in the SideMenuComponent
	public options: Array<MenuOptionModel>;

	// Settings for the SideMenuComponent
	public sideMenuSettings: SideMenuSettings = {
		accordionMode: true,
		showSelectedOption: true,
		selectedOptionClass: 'active-side-menu-option',
		subOptionIndentation: {
			md: '56px',
			ios: '64px',
			wp: '56px'
		}
	};

	constructor(private platform: Platform,
		private statusBar: StatusBar,
		private splashScreen: SplashScreen,
		private alertCtrl: AlertController,
		private menuCtrl: MenuController,
		private events: Events,
		private loadCtrl: LoadingController,
		private translate: TranslateService
	) {
		translate.setDefaultLang('en');
		this.initializeApp();
	}


	initializeApp() {
		this.platform.ready().then(() => {
			this.statusBar.styleLightContent();
			this.splashScreen.hide();

			this.subscribeToEvents();
			// Initialize some options
			//this.initializeOptions();

		});

		// // Change the value for the batch every 5 seconds
		// setInterval(() => {
		// 	this.unreadCountObservable.next(Math.floor(Math.random() * 10));
		// }, 5000);

	}

	private subscribeToEvents() {
		this.events.subscribe(Globals.Events.SIDEPANE_ENABLE, bEnable => this.enabelSplitPane(bEnable));
		this.events.subscribe(Globals.Events.SIDEMENU_UPDATE, newOptions => this.updateMenuOptions(newOptions));
		this.events.subscribe(Globals.Events.LOADER_SHOW, loaderInfo => this.showLoader(loaderInfo));

		this.events.subscribe(Globals.Events.EXCEPTION_SHOW, exceptionPayload => this.presentException(exceptionPayload));

	}

	// not used but left here as an example for creating the side menue
	private initializeOptions(): void {
		this.options = new Array<MenuOptionModel>();
		this.options.push({
			//iconName: 'ribbon',
			displayName: 'GET Rewards',
			subItems: [
				{
					displayName: 'Progress',
					component: 'RewardsProgressPage'
				},
				{
					displayName: 'Points',
					component: 'RewardsPointsPage'
				},
				{
					displayName: 'History',
					badge: ArrayObservable.of('NEWs'),
					component: 'RewardsHistoryPage'
				}
			]
		});
	}

	private enabelSplitPane(bEnable: boolean) {
		this.splitPane.enabled = bEnable;
	}

	private updateMenuOptions(newOptions: Array<MenuOptionModel>) {
		this.options = newOptions;
	}

	public selectOption(option: MenuOptionModel): void {
		this.menuCtrl.close().then(() => {
			if (option.custom && option.custom.isLogin) {
				this.presentAlert('You\'ve clicked the login option!');
			} else if (option.custom && option.custom.isLogout) {
				this.presentAlert('You\'ve clicked the logout option!');
			} else if (option.custom && option.custom.isExternalLink) {
				let url = option.custom.externalUrl;
				window.open(url, '_blank');
			} else {
				// Redirect to the selected page
				this.navCtrl.setRoot(option.component || 'DetailsPage', { 'title': option.displayName });
			}
		});
	}

	public collapseMenuOptions(): void {
		this.sideMenu.collapseAllOptions();
	}

	presentException(exceptionPayload: ExceptionPayload) {
		switch (exceptionPayload.displayOptions) {
			case Globals.Exception.DisplayOptions.ONE_BUTTON:
				this.presentOneButtonAlert(exceptionPayload.messageInfo);
				break;
			case Globals.Exception.DisplayOptions.TWO_BUTTON:
				this.presentTwoButtonAlert(exceptionPayload.messageInfo);
				break;
			case Globals.Exception.DisplayOptions.THREE_BUTTON:
				this.presentThreeButtonAlert(exceptionPayload.messageInfo);
				break;
		}
	}

	public presentAlert(message: string): void {
		let alert = this.alertCtrl.create({
			title: 'Information',
			message: message,
			buttons: ['Ok']
		});
		alert.present();
	}

	public presentDismissAlert(errorDismissInfo): void {
		let alert = this.alertCtrl.create({
			title: errorDismissInfo.title,
			message: errorDismissInfo.message,
			buttons: [errorDismissInfo.buttonDismissTitle]
		});
		alert.present();
	}

	public presentOneButtonAlert(alertOneButtonInfo): void {

		let alert = this.alertCtrl.create({
			title: alertOneButtonInfo.title,
			message: alertOneButtonInfo.message,
			buttons: [
				{
					text: alertOneButtonInfo.positiveButtonTitle,
					handler: alertOneButtonInfo.positiveButtonHandler
				}
			]
		});
		alert.present();
	}

	public presentTwoButtonAlert(alertTwoButtonInfo): void {

		let alert = this.alertCtrl.create({
			title: alertTwoButtonInfo.title,
			message: alertTwoButtonInfo.message,
			buttons: [
				{
					text: alertTwoButtonInfo.negativeButtonTitle,
					role: 'cancel',
					handler: alertTwoButtonInfo.negativeButtonHandler
				},
				{

					text: alertTwoButtonInfo.positiveButtonTitle,
					handler: alertTwoButtonInfo.positiveButtonHandler

				}
			]
		});
		alert.present();
	}

	public presentThreeButtonAlert(alertThreeButtonInfo): void {

		let alert = this.alertCtrl.create({
			title: alertThreeButtonInfo.title,
			message: alertThreeButtonInfo.message,
			buttons: [
				{
					text: alertThreeButtonInfo.negativeButtonTitle,
					role: 'cancel',
					handler: alertThreeButtonInfo.negativeButtonHandler
				},
				{
					text: alertThreeButtonInfo.indifferentButtonTitle,
					handler: alertThreeButtonInfo.indifferentButtonHandler
				},
				{
					text: alertThreeButtonInfo.positiveButtonTitle,
					handler: alertThreeButtonInfo.positiveButtonHandler
				}
			]
		});
		alert.present();
	}

	private showLoader(loaderInfo: any) {
		if (loaderInfo.bShow) {
			if (!this.loader) {
				this.loader = this.loadCtrl.create(
					{
						content: loaderInfo.message,
						showBackdrop: false
					});
				this.loader.present();
			}
		} else {
			if (this.loader) {
				this.loader.dismiss();
				this.loader = null;
			}
		}
	}

}

