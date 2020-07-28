import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LOCAL_ROUTING, SETTINGS_CONFIG } from '@sections/settings/settings.config';
import { PATRON_NAVIGATION } from '../../app.global';
import { SessionFacadeService } from '@core/facades/session/session.facade.service';

@Component({
  selector: 'st-settings',
  templateUrl: './settings.html',
  styleUrls: ['./settings.scss'],
})
export class SettingsPage implements OnInit {
  constructor(private router: Router, private readonly sessionFacadeService: SessionFacadeService) {}

  ngOnInit() {}

  //couldnt get photo upload route to work correctly, still trying to fix
  navigateToPhotoUpload() {
    this.router.navigate([PATRON_NAVIGATION.settings, LOCAL_ROUTING.photoUpload]);
  }

  logout() {
    this.sessionFacadeService.logoutUser();
  }

  sections = SETTINGS_CONFIG;
}
