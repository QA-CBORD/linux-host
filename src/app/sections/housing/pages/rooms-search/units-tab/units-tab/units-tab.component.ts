

import { Component, Output, EventEmitter, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Tab } from '@sections/housing/pages/housing-dashboard/housing-tabs/housing-tabs.component';
import { NavigationService } from '@shared/services/navigation.service';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { SelectedUnitsTab } from '../../rooms-search.page';

@Component({
  selector: 'st-units-tabs',
  templateUrl: './units-tab.component.html',
  styleUrls: ['./units-tab.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UnitsTabComponent {
  selectedTab: SelectedUnitsTab = SelectedUnitsTab.Buildings;
  previousValue: SelectedUnitsTab;
  subscriber: Subscription;
  @Output() onTabSelected: EventEmitter<SelectedUnitsTab> = new EventEmitter<SelectedUnitsTab>();
  tabs: Tab[] = [
    { label: 'Buildings', view: SelectedUnitsTab.Buildings },
    { label: 'Units', view: SelectedUnitsTab.Units },
  ];
  
  constructor(private router: Router, private navService: NavigationService,  private readonly cdRef: ChangeDetectorRef) {}
  
  ngOnInit() {
   this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
       console.log("selected tab: ", this.selectedTab)
        if (event.url.includes('units')) {
          if (this.selectedTab != SelectedUnitsTab.Units) {
            console.log("Set units task: ", this.selectedTab)
            this.selectedTab = SelectedUnitsTab.Units;
            this.cdRef.detectChanges();
          }
        } else {
          if (this.selectedTab != SelectedUnitsTab.Buildings) {
             console.log("Set buiding task: ", this.selectedTab)
              this.selectedTab = SelectedUnitsTab.Buildings;
              console.log("Set buiding task? ", this.selectedTab)
              this.cdRef.detectChanges();
          }
        }
    })
  }

  ngOnDestroy() {
   // this.subscriber.unsubscribe();
  }

  select(view: any) {
    const { detail } = view;
      this.onTabSelected.emit(detail.value);
  }
}