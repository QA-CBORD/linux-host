import { Component, OnInit } from '@angular/core';
import { GuestFacadeService } from '../services/guest.facade.service';
import { MessageChannel } from '@shared/model/shared-api';
import { GuestDashboardSection } from '../model/dashboard.item.model';
import { SafeResourceUrl } from '@angular/platform-browser';
import { CommonService } from '@shared/services/common.service';

@Component({
  selector: 'st-guest-dashboard',
  templateUrl: './guest-dashboard.component.html',
  styleUrls: ['./guest-dashboard.component.scss'],
})
export class GuestDashboard implements OnInit {

  sections: GuestDashboardSection[] = [];
  institutionName$: Promise<string>;
  institutionPhoto$: Promise<SafeResourceUrl>;
  userName$: Promise<string>

  constructor(private readonly guestFacadeService: GuestFacadeService, 
    private readonly commonService: CommonService) {}

  ngOnInit() {
    this.sections = MessageChannel.get<GuestDashboardSection[]>();
    this.loadInfo();
  }

  private async loadInfo(): Promise<void>{
    this.institutionPhoto$ = this.commonService.getInstitutionPhoto();
    this.userName$ = this.commonService.getUserName();
    this.institutionName$ = this.commonService.getInstitutionName();
  }

  onclick(section: GuestDashboardSection){
     section.onclick(this.guestFacadeService);
  }
}
