import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StHierarcheTreeDialogComponent } from '../st-hierarchy-tree-dialog/st-hierarchy-tree-dialog.component';
import { NamedIdentity, LookUpItem } from '../../../sections/housing/work-orders/work-orders.model';
import { WorkOrderStateService } from '../../../sections/housing/work-orders/work-order-state.service';
import { Subscription } from 'rxjs';
import { ContractListStateService } from '@sections/housing/contract-list/contract-list-state.service';
import { FormGroup, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'st-hierarchy-tree',
  templateUrl: './st-hierarchy-tree.component.html',
  styleUrls: ['./st-hierarchy-tree.component.scss'],
})
export class StHierarcheTreeComponent implements OnInit ,OnDestroy  {
  public selectedItem: NamedIdentity;
  private _subscription: Subscription = new Subscription();
  @Input() public lookups: LookUpItem[];
  @Input() public allowParent: boolean;
  @Input() public isDisable: boolean;
  @Input() public label: string;
  form: FormGroup;
  constructor(
    public modalCtrl: ModalController,
    public _workOrderStateService: WorkOrderStateService,
    public _contractListStateService: ContractListStateService
    ) {
    this.selectedItem = null;
  }

  ngOnInit(): void {
    this._subscription.add(
      this._workOrderStateService.getSelectedFacility$().subscribe(res => {
        if( res?.name ){
          this.form = new FormGroup({
            facilityName: new FormControl(res.name)
         });
        }
      })
    )
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