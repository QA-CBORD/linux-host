import { Component, forwardRef, Input, OnInit, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StHierarcheTreeDialogComponent } from '../st-hierarchy-tree-dialog/st-hierarchy-tree-dialog.component';
import { NamedIdentity, LookUpItem } from '../../../sections/housing/work-orders/work-orders.model';
import { ViewEncapsulation } from '@angular/core';
import { WorkOrderStateService } from '../../../sections/housing/work-orders/work-order-state.service';
import { Subscription } from 'rxjs';
import { ContractListStateService } from '@sections/housing/contract-list/contract-list-state.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'st-hierarchy-tree',
  templateUrl: './st-hierarchy-tree.component.html',
  styleUrls: ['./st-hierarchy-tree.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class StHierarcheTreeComponent implements OnDestroy, OnInit  {
  public selectedItem: NamedIdentity;
  private _subscription: Subscription = new Subscription();
  @Input() public lookups: LookUpItem[];
  @Input() public allowParent: boolean;
  @Input() public isDisable: boolean;
  @Input() public label: string;
  @Input() parentGroup: FormGroup;
  valueTitle: any;
  constructor(
    public modalCtrl: ModalController,
    public _workOrderStateService: WorkOrderStateService,
    public _contractListStateService: ContractListStateService
    ) {
    this.selectedItem = null;
  }
  async ngOnInit() {
    await this._workOrderStateService.getSelectedFacility$().subscribe(res => {
      this.valueTitle = res
    });
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe()
    this._workOrderStateService.clearSelectedFacility()
  }


  public async open() {
    const multiLevelSelectDialogComponent = await this.modalCtrl.create({
      component: StHierarcheTreeDialogComponent,
      componentProps:{
        lookups: this.lookups,
        allowParent: true,
        selectedItemId: this.selectedItem ? this.selectedItem.id : null,
      },
    });
    multiLevelSelectDialogComponent.present();
  }

}