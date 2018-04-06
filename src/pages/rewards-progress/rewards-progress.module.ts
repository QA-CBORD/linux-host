import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RewardsProgressPage } from './rewards-progress';
import { AccordionListContentComponent } from '../../shared/accordion-list/accordionlist-content.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    RewardsProgressPage,
    AccordionListContentComponent,
  ],
  imports: [
    IonicPageModule.forChild(RewardsProgressPage),
    TranslateModule.forChild(),


  ],
  
})
export class RewardsProgressPageModule { }
