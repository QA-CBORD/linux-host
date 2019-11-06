import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';

import { zip } from 'rxjs';
import { map, take, switchMap, tap } from 'rxjs/operators';

import { InstitutionService } from 'src/app/core/service/institution/institution.service';
import { UserService } from 'src/app/core/service/user-service/user.service';
import { ConfigurationService } from 'src/app/core/service/configuration/configuration.service';

import { Institution } from 'src/app/core/model/institution';
import { Settings } from 'src/app/app.global';
import { AccessCardService } from '../../services/access-card.service';

@Component({
  selector: 'st-access-card',
  templateUrl: './access-card.component.html',
  styleUrls: ['./access-card.component.scss'],
})
export class AccessCardComponent implements OnInit {
 
  institutionInfo: Institution;
  institutionPhotoUrl: string = '';
  userName: string = '';
  userPhoto: string = '';
  getMyCardEnabled: boolean = false;
  mobileAccessEnabled: boolean = false;
  applePayEnabled: boolean = false;

  constructor(private readonly accessCardService: AccessCardService, private readonly sanitizer: DomSanitizer) {}

  /// Use the access card service to retrieve all data

  ngOnInit() {}
}
