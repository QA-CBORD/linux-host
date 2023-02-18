import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ModalsService } from '@core/service/modals/modals.service';
import { ToastService } from '@core/service/toast/toast.service';
import { ScanCodeComponent } from '@sections/check-in/components/scan-code/scan-code.component';
import { CartService } from '@sections/ordering';
import { MerchantSettings } from '@sections/ordering/ordering.config';
import { ItemManualEntryComponent } from '@sections/ordering/pages/item-manual-entry/item-manual-entry.component';
import { BarcodeOptionModel } from '@sections/ordering/shared/models/barcode-option.model';
import { ContentStringCategory } from '@shared/model/content-strings/content-strings-api';
import { CommonService } from '@shared/services/common.service';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { MerchantSettingInfo } from '..';

interface ItemFindData {
  scanCodeResult: string;
  manualEntry: string;
}
@Component({
  selector: 'st-menu-item-finder',
  templateUrl: './menu-item-finder.component.html',
  styleUrls: ['./menu-item-finder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuItemFinderComponent implements OnInit {
  barcodeOptions$: Observable<BarcodeOptionModel[]>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  barCodeCs: any;
  @Output() itemScanned = new EventEmitter<string>();

  constructor(
    private readonly cartService: CartService,
    private readonly modalController: ModalsService,
    private readonly commonService: CommonService,
    private readonly toastService: ToastService
  ) {}

  async ngOnInit() {
    this.scanCodeCs();
    this.barcodeOptions$ = this.cartService.merchant$.pipe(
      filter(merchant => !!merchant),
      map(merchant => {
        const res: BarcodeOptionModel[] = [];
        const scanBarcodeEnabled: MerchantSettingInfo = merchant.settings.map[MerchantSettings.scanBarcodeEnabled];
        if (scanBarcodeEnabled && JSON.parse(scanBarcodeEnabled.value)) {
          res.push({
            label: 'Scan Barcode or QR Code',
            icon: 'barcode-read',
            action: async () => {
              await this.openScanCode();
            },
          });
        }
        return res;
      })
    );
  }

  private getMenuItem(data: ItemFindData) {
    this.cartService
      .getMenuItemByCode(data.scanCodeResult)
      .pipe(take(1))
      .subscribe(async menuItem => {
        if (menuItem && menuItem.id) {
          this.itemScanned.next(menuItem.id);
        } else {
          await this.toastService.showToast({ message: 'Item not found, please check the code and try again.' });
        }
      });
  }

  private scanCodeCs() {
    this.commonService
      .loadContentString(ContentStringCategory.scanAndGo)
      .pipe(take(1))
      .subscribe(ContentStrings => {
        this.barCodeCs = ContentStrings;
      });
  }

  private async openManualEntry() {
    const modal = await this.modalController.create({
      component: ItemManualEntryComponent,
    });

    modal.onDidDismiss().then(async ({ data }) => {
      if (data && data.menuItemId) {
        this.itemScanned.next(data.menuItemId);
      }
    });
    await modal.present();
  }
 
  private async openScanCode() {
    const modal = await this.createScanCodeModal();
    modal.onDidDismiss().then(async ({ data }) => {
      await this.handleResult(data);
    });
    await modal.present();
  }

  private async createScanCodeModal() {
    return await this.modalController.create({
      component: ScanCodeComponent,
      cssClass: 'scan-modal',
      backdropDismiss: false,
      componentProps: {
        title: this.barCodeCs.title,
        prompt: this.barCodeCs.prompt,
        textBtn: this.barCodeCs.textBtn,
      },
    });
  }

  private async handleResult(data: ItemFindData) {
    if (data) {
      if (data.scanCodeResult) {
        this.getMenuItem(data);
      } else if (data.manualEntry) {
        await this.openManualEntry();
      }
    }
  }
}
