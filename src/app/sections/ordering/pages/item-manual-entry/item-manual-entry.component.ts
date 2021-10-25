import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from '@sections/ordering';
import { LOCAL_ROUTING, ORDERING_SCAN_GO_CONTENT_STRINGS } from '@sections/ordering/ordering.config';
import { APP_ROUTES } from '@sections/section.config';
import { NavigationService } from '@shared/services/navigation.service';
import { GlobalNavService } from '@shared/ui-components/st-global-navigation/services/global-nav.service';
import { ToastService } from '@core/service/toast/toast.service';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import { Observable } from 'rxjs';
import { CONTENT_STRINGS_DOMAINS, CONTENT_STRINGS_CATEGORIES } from 'src/app/content-strings';
import { ModalController } from '@ionic/angular';

@Component({
  templateUrl: './item-manual-entry.component.html',
  styleUrls: ['./item-manual-entry.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemManualEntryComponent implements OnInit, OnDestroy {
  manualEntryForm: FormGroup;

  constructor(
    private readonly cartService: CartService,
    private readonly globalNav: GlobalNavService,
    private readonly cdRef: ChangeDetectorRef,
    private readonly toastService: ToastService,
    private readonly contentStringsFacadeService: ContentStringsFacadeService,
    private readonly modalController: ModalController,
    private readonly fb: FormBuilder
  ) {}

  ngOnDestroy(): void {
    this.globalNav.showNavBar();
  }

  ngOnInit() {
    this.manualEntryForm = this.fb.group({
      [this.controlsNames.code]: ['', [Validators.required]],
    });
    this.cdRef.detectChanges();
  }

  ionViewWillEnter() {
    this.globalNav.hideNavBar();
  }

  continue() {
    this.cartService.getMenuItemByCode(this.code.value).subscribe(async menuItem => {
      if (menuItem) {
        const { id: menuItemId } = menuItem;
        this.modalController.dismiss({ menuItemId });
      } else {
        await this.toastService.showToast({ message: 'Item not found, please check the code and try again.' });
      }
    });
  }

  get controlsNames() {
    return BARCODE_CONTROL_NAMES;
  }

  get code(): AbstractControl {
    return this.manualEntryForm.get(this.controlsNames.code);
  }
  // Content strings getters
  get instructions$(): Observable<string> {
    return this.contentStringsFacadeService.resolveContentStringValue$(
      CONTENT_STRINGS_DOMAINS.patronUi,
      CONTENT_STRINGS_CATEGORIES.ordering,
      ORDERING_SCAN_GO_CONTENT_STRINGS.manualEntryInstructions
    );
  }
}
export enum BARCODE_CONTROL_NAMES {
  code = 'code',
}
