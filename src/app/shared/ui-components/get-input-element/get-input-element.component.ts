import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { formField } from 'src/app/non-authorized/pages/registration/models/registration.shared.model';

@Component({
  selector: 'st-get-input',
  templateUrl: './get-input-element.component.html',
  styleUrls: ['./get-input-element.component.scss'],
})
export class GetInputElement implements OnInit {
  @Input() inputLable: string;

  @Input() assetIcon: string;

  @Input() bgColor: string;

  @Input() model: formField;

  iconSource$: Observable<string>;

  constructor() {}

  ngOnInit() {
    if (this.assetIcon) {
      this.iconSource$ = of(`/assets/icon/${this.assetIcon}.svg`);
    }
  }
}
