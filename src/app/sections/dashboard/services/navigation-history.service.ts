import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class NavigationTrackerService {
  private tracker: string[] = [];
  private subscription: Subscription = null;

  constructor(private router: Router, private location: Location) {}

  startTrackingNavigation() {
    debugger;
    //if (this.subscription != null) return;
    this.subscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        alert("Event: " + event.urlAfterRedirects)
        this.tracker.push(event.urlAfterRedirects);
      }
    });
  }

  clearTrack() {
    this.tracker = [];
  }

  stopTrackingNavigation() {
    this.subscription.unsubscribe();
    //this.subscription = null;
    this.clearTrack();
  }

  getCurrentUrl(): string {
    if (this.tracker.length > 0) {
      return this.tracker[this.tracker.length - 1];
    }
    return '';
  }

  trackBackNavigation() {
    this.tracker.pop();
    if (this.tracker.length > 0) {
      this.location.back();
      alert("trackBackNavigation "+ this.tracker[this.tracker.length - 1])
    }
  }
}
