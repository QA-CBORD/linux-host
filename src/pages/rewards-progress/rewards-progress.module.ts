import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RewardsProgressPage } from './rewards-progress';
import { AccordionListContentComponent } from '../../shared/accordion-list/accordionlist-content.component';

@NgModule({
  declarations: [
    RewardsProgressPage,
    AccordionListContentComponent
  ],
  imports: [
    IonicPageModule.forChild(RewardsProgressPage),
    
  ],
})
export class RewardsProgressPageModule {}
