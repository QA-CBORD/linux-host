import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { take } from 'rxjs/operators';

@Component({
  selector: 'st-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit {
  @Input() readonly: boolean = false;
  @Input() time: any = [];
  @Input() address: any = [];
  @Input() ingredients: any = [];
  @Input() paymentMethod: any = [];
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

    this.subscribre()
  }

  private subscribre () {
    this.detailsForm.valueChanges
      .subscribe(data => {
        console.log(1);
        this.onFormChange.emit({ data, valid: this.detailsForm.valid })
      })
  }

  private getIngredients() {

    return this.fb.array([
      // ...arr.map((v) => this.fb.control(v))
      new FormControl('a'),
      new FormControl('b'),
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
