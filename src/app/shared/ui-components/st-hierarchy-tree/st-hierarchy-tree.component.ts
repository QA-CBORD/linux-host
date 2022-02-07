import { Component, forwardRef, Input, OnInit, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StHierarcheTreeDialogComponent } from '../st-hierarchy-tree-dialog/st-hierarchy-tree-dialog.component';
import { NamedIdentity, LookUpItem } from '../../../sections/housing/work-orders/work-orders.model';
import { ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { WorkOrderStateService } from '../../../sections/housing/work-orders/work-order-state.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'st-hierarchy-tree',
  templateUrl: './st-hierarchy-tree.component.html',
  styleUrls: ['./st-hierarchy-tree.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class StHierarcheTreeComponent implements OnInit, OnDestroy  {
  public selectedItem: NamedIdentity;
  private _subscription: Subscription = new Subscription();
  @Input() public lookups: LookUpItem[];
  @Input() public allowParent: boolean;

  constructor(
    public modalCtrl: ModalController,
    public _workOrderStateService: WorkOrderStateService,
    ) {
    this.selectedItem = null;
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe()
    this._workOrderStateService.clearSelectedFacility()
  }

  ngOnInit(): void {
    this._subscription.add(
    this._workOrderStateService.getSelectedFacility$().subscribe(res=> this.selectedItem = res? res : {facilityFullName:'Select Please'}))
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