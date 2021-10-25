import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ModalsService } from '@core/service/modals/modals.service';
import { CartService } from '@sections/ordering';
import { MerchantSettings } from '@sections/ordering/ordering.config';
import { ItemManualEntryComponent } from '@sections/ordering/pages/item-manual-entry/item-manual-entry.component';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MerchantSettingInfo } from '..';

@Component({
  selector: 'st-menu-item-finder',
  templateUrl: './menu-item-finder.component.html',
  styleUrls: ['./menu-item-finder.component.scss'], changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuItemFinderComponent implements OnInit {
  barcodeOptions$: Observable<any[]>;
  @Output() itemScanned = new EventEmitter<string>();

  constructor(private readonly cartService: CartService, private readonly modalController: ModalsService) {}

  ngOnInit() {
    this.barcodeOptions$ = this.cartService.merchant$.pipe(
      filter(merchant => !!merchant),
      map(merchant => {
        const res = [];
        const manualBarcodeEnabled: MerchantSettingInfo = merchant.settings.map[MerchantSettings.manualBarcodeEnabled];
        if (manualBarcodeEnabled && manualBarcodeEnabled.value) {
          res.push({
            label: 'Enter barcode manually',
            action: async () => {
              const modal = await this.modalController.create({
                component: ItemManualEntryComponent,
              });

              modal.onDidDismiss().then(({ data }: any) => {
                if (data) {
                  const { menuItemId } = data;
                  this.itemScanned.next(menuItemId);
                }
              });
              await modal.present();
            },
          });
        }
        return res;
      })
    );
  }
}