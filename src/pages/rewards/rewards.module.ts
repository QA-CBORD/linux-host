import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RewardsPage } from './rewards';
import { AccordionListContentComponent } from '../../shared/accordion-list/accordionlist-content.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    RewardsPage,
    AccordionListContentComponent,
  ],
  imports: [
    IonicPageModule.forChild(RewardsPage),
    TranslateModule.forChild(),


  ],
  
})
export class RewardsProgressPageModule { }
