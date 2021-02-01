import { Component, Input, OnInit } from '@angular/core';
import { PageSetting } from '../../models/registration.shared.model';

@Component({
  selector: 'st-registration-modal',
  templateUrl: './registration-modal.component.html',
  styleUrls: ['./registration-modal.component.scss'],
})
export class RegistrationModalComponent implements OnInit {
  @Input() settings: PageSetting = {};

  constructor() {}

  ngOnInit() {}
}
