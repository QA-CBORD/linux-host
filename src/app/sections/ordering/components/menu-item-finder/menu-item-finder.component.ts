import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ModalsService } from '@core/service/modals/modals.service';
import { Barcode, ScanCodeComponent } from '@sections/check-in/components/scan-code/scan-code.component';
import { CartService } from '@sections/ordering';
import { MerchantSettings } from '@sections/ordering/ordering.config';
import { ItemManualEntryComponent } from '@sections/ordering/pages/item-manual-entry/item-manual-entry.component';
import { GlobalNavService } from '@shared/ui-components/st-global-navigation/services/global-nav.service';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MerchantSettingInfo } from '..';
import { Location } from '@angular/common';

@Component({
  selector: 'st-menu-item-finder',
  templateUrl: './menu-item-finder.component.html',
  styleUrls: ['./menu-item-finder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuItemFinderComponent implements OnInit {
  barcodeOptions$: Observable<any[]>;
  @Output() itemScanned = new EventEmitter<string>();

  constructor(
    private readonly cartService: CartService,
    private readonly modalController: ModalsService,
    private readonly globalNav: GlobalNavService,
    private location: Location
  ) {}

  async ngOnInit() {
    this.barcodeOptions$ = this.cartService.merchant$.pipe(
      filter(merchant => !!merchant),
      map(merchant => {
        const res = [];
        const scanBarcodeEnabled: MerchantSettingInfo = merchant.settings.map[MerchantSettings.scanBarcodeEnabled];
        const manualBarcodeEnabled: MerchantSettingInfo = merchant.settings.map[MerchantSettings.manualBarcodeEnabled];
        if (scanBarcodeEnabled && JSON.parse(scanBarcodeEnabled.value)) {
          res.push({
            label: 'Scan Barcode or QR Code',
            icon: 'barcode-read',
            action: async () => {
              const modal = await this.modalController.create({
                component: ScanCodeComponent,
                cssClass: 'scan-modal',
                backdropDismiss: false,
                componentProps: {
                  formats: [Barcode.QRCode, Barcode.EAN_13],
                  title: 'Barcode',
                  message: 'This a text',
                  buttonText: 'Manual Entry',
                },
              });
              modal.onDidDismiss().then(({ data }: any) => {
                if (data) {
                  this.cartService.getMenuItemByCode(data.scanCodeResult).subscribe(async menuItem => {
                    if (menuItem) {
                      const { id: menuItemId } = menuItem;
                      this.itemScanned.next(menuItemId);
                    }
                  });
                }
              });
              await modal.present();
            },
          });
        }
        if (manualBarcodeEnabled && JSON.parse(manualBarcodeEnabled.value)) {
          res.push({
            label: 'Enter barcode manually',
            icon: 'barcode-manual',
            action: async () => {
              const modal = await this.modalController.create({
                component: ItemManualEntryComponent,
              });

              modal.onDidDismiss().then(async ({ data }: any) => {
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

  ionViewWillEnter() {
    this.globalNav.hideNavBar();
  }
}
