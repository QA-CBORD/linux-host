import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

import { RewardsProgressPage } from '../pages/rewards-progress/rewards-progress';

@NgModule({
	declarations: [
		RewardsProgressPage,
	],
	imports: [
		IonicModule,
		TranslateModule.forChild(),
	],
	exports: [
		RewardsProgressPage,
	]
})
export class ComponentsModule { }
