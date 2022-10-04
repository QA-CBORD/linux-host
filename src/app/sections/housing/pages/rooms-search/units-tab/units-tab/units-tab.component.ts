import { Component, Output, EventEmitter, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SegmentCustomEvent } from '@ionic/angular';
import { Tab } from '@sections/housing/pages/housing-dashboard/housing-tabs/housing-tabs.component';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { UnitsType } from '../../pages/buildings/buildings.page';
import { SelectedUnitsTab } from '../../rooms-search.page';

@Component({
  selector: 'st-units-tabs',
  templateUrl: './units-tab.component.html',
  styleUrls: ['./units-tab.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitsTabComponent {
  selectedTab: SelectedUnitsTab = SelectedUnitsTab.Buildings;
  subscriber: Subscription;
  @Output() onTabSelected: EventEmitter<SelectedUnitsTab> = new EventEmitter<SelectedUnitsTab>();
  tabs: Tab[] = [
    { label: 'Buildings', view: SelectedUnitsTab.Buildings },
    { label: 'Units', view: SelectedUnitsTab.Units },
  ];

  constructor(private router: Router, private readonly cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.subscriber = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        if (event.url.includes(UnitsType.Rooms)) {
          this.selectedTab = SelectedUnitsTab.Units;
        } else {
          this.selectedTab = SelectedUnitsTab.Buildings;
        }
        this.cdRef.detectChanges();
      });
  }

  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }

  select(event: SegmentCustomEvent) {
    const { detail } = event;
    this.onTabSelected.emit(+detail.value);
  }
}
