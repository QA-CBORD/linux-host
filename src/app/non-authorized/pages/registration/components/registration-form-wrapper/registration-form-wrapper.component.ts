import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'st-registration-form-wrapper',
  templateUrl: './registration-form-wrapper.component.html',
  styleUrls: ['./registration-form-wrapper.component.scss'],
})
export class RegistrationFormWrapperComponent implements OnInit {

  @Input() title: string;

  @Input() passwordRule: string;

  constructor() { }

  ngOnInit() {}

}
