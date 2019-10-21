import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OrderItem } from '@pages/ordering';
import { ORDER_TYPE } from "@pages/ordering/ordering.config";

@Component({
  selector: 'st-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderDetailsComponent implements OnInit {
  @Input() address: string;
  @Input() readonly: boolean = true;
  @Input() time: any = [];
  @Input() type: ORDER_TYPE;
  @Input() ingredients: OrderItem[] = [];
  @Input() paymentMethod: any = [];
  @Input() tax: number;
  @Input() total: number;
  @Input() deliveryFee: number;
  @Input() pickupFee: number;
  @Input() subTotal: number;
  @Input() tip: number;
  @Input() accountName: string;
  @Output() onFormChange: EventEmitter<any> = new EventEmitter<any>();
  detailsForm: FormGroup;

  constructor(private readonly fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  get controlsNames() {
    return DETAILS_FORM_CONTROL_NAMES;
  }

  onRemove($event: MouseEvent) {
    console.log($event)
  }

  initForm() {
    this.detailsForm = this.fb.group(
      {
        [DETAILS_FORM_CONTROL_NAMES.time]: [''],
        [DETAILS_FORM_CONTROL_NAMES.address]: [''],
        [DETAILS_FORM_CONTROL_NAMES.ingredients]: this.getIngredients(),
        [DETAILS_FORM_CONTROL_NAMES.paymentMethod]: [''],
      },{updateOn: 'blur'}
    );
    console.log(this.detailsForm);
    this.subscribe()
  }

  private subscribe () {
    this.detailsForm.valueChanges
      .subscribe(data => {
        console.log(1);
        this.onFormChange.emit({ data, valid: this.detailsForm.valid })
      })
  }

  private getIngredients() {
    return this.fb.array([
      ...this.ingredients.map((v) => this.fb.control(v))
    ])
  }

  test() {
    console.log(this.detailsForm)
  }
}

export enum DETAILS_FORM_CONTROL_NAMES {
  time = 'address',
  address = 'address',
  ingredients = 'ingredients',
  paymentMethod = 'paymentMethod',
}
