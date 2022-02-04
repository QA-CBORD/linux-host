import { Component, forwardRef, Input} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StHierarcheTreeDialogComponent } from '../st-hierarchy-tree-dialog/st-hierarchy-tree-dialog.component';
import { NamedIdentity, LookUpItem } from '../../../sections/housing/work-orders/work-orders.model';
import { ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'st-hierarchy-tree',
  templateUrl: './st-hierarchy-tree.component.html',
  styleUrls: ['./st-hierarchy-tree.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StHierarcheTreeComponent), // tslint:disable-line:no-forward-ref
      multi: true
    }
  ]

})
export class StHierarcheTreeComponent implements ControlValueAccessor  {
  public selectedItem: NamedIdentity;
  @Input() public lookups: LookUpItem[];
  @Input() public allowParent: boolean;

  constructor(public modalCtrl: ModalController) {
    this.selectedItem = null;
  }

  public writeValue(value: NamedIdentity) {
    this.selectedItem = value;
  }

  public propagateChange = (_: any) => { }; // tslint:disable-line:no-empty

  public registerOnChange(fn) {
    this.propagateChange = fn;
  }

  public registerOnTouched() { } // tslint:disable-line:no-empty

  public async open() {
    const multiLevelSelectDialogComponent = await this.modalCtrl.create({
      component: StHierarcheTreeDialogComponent,
      componentProps:{
        lookups: this.lookups,
        allowParent: true,
        selectedItemId: this.selectedItem ? this.selectedItem.id : null,
      },
      
 
    });
    this.modalCtrl.dismiss((selectedItem: NamedIdentity) => {
      if (selectedItem) {
        this.selectedItem = selectedItem;
        this.propagateChange(this.selectedItem);
      }
    });
    multiLevelSelectDialogComponent.present();
  }

  public reset($event) {
    $event.stopPropagation();
    this.selectedItem = null;
    this.propagateChange(this.selectedItem);
  }

}