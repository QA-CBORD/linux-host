import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { LOCAL_ROUTING } from '../../ordering.config';
import { NAVIGATE } from '../../../../app.global';
import { ItemDetailComponent } from '../item-detail/item-detail.component';
import { ModalController } from '@ionic/angular';
import { MobileAccessPage } from '@pages/mobile-access';

@Component({
  selector: 'st-menu-ordering',
  templateUrl: './menu-ordering.component.html',
  styleUrls: ['./menu-ordering.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuOrderingComponent {

  localRouting = LOCAL_ROUTING;

  constructor(
    private readonly router: Router,
    public modalController: ModalController
    ) { }

  goToPage(pageRoute: string) {
    this.router.navigate([NAVIGATE.ordering, pageRoute], { skipLocationChange: true });
  }
  async presentModal() {
    const modal = await this.modalController.create({
      component: ItemDetailComponent
    });
    return await modal.present();
  }
}
