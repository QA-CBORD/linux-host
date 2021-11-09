import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ModalsService } from '@core/service/modals/modals.service';
import { Barcode, ScanCodeComponent } from '@sections/check-in/components/scan-code/scan-code.component';
import { CartService } from '@sections/ordering';
import { MerchantSettings } from '@sections/ordering/ordering.config';
import { ItemManualEntryComponent } from '@sections/ordering/pages/item-manual-entry/item-manual-entry.component';
import { ContentStringCategory } from '@shared/model/content-strings/content-strings-api';
import { CommonService } from '@shared/services/common.service';
import { GlobalNavService } from '@shared/ui-components/st-global-navigation/services/global-nav.service';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { MerchantSettingInfo } from '..';

@Component({
  selector: 'st-menu-item-finder',
  templateUrl: './menu-item-finder.component.html',
  styleUrls: ['./menu-item-finder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuItemFinderComponent implements OnInit {
  barcodeOptions$: Observable<any[]>;
  barCodeCs: any;
  @Output() itemScanned = new EventEmitter<string>();

  constructor(
    private readonly cartService: CartService,
    private readonly modalController: ModalsService,
    private readonly commonService: CommonService,
    private readonly globalNav: GlobalNavService,
  ) {}

  async ngOnInit() {
    this.commonService
      .loadContentString(ContentStringCategory.scanCode)
      .pipe(take(1))
      .subscribe(ContentStrings => {
        this.barCodeCs = ContentStrings;
      });
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
                  title: this.barCodeCs.title,
                  prompt: this.barCodeCs.message,
                  textBtn: this.barCodeCs.textBtn,
                },
              });
              modal.onDidDismiss().then(async ({ data }: any) => {
                if (data.scanCodeResult) {
                  this.cartService.getMenuItemByCode(data.scanCodeResult).subscribe(async menuItem => {
                    if (menuItem) {
                      const { id: menuItemId } = menuItem;
                      this.itemScanned.next(menuItemId);
                    }
                  });
                } else if (data.manualEntry) {
                  await this.openManualEntry();
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
              await this.openManualEntry();
            },
          });
        }
        return res;
      })
    );
  }

  private async openManualEntry() {
    const modal = await this.modalController.create({
      component: ItemManualEntryComponent,
    });

    modal.onDidDismiss().then(async ({ data }: any) => {
      if (data) {
        const { menuItemId } = data;
        this.itemScanned.next(menuItemId);
      }
    });

    modal.onWillDismiss().then(() => {
      this.globalNav.hideNavBar();
    });
    await modal.present();
  }
}
