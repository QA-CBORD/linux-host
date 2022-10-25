import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LOCAL_ROUTING } from '@sections/housing/housing.config';
import { PATRON_NAVIGATION } from 'src/app/app.global';

@Component({
  selector: 'st-roommate-search',
  templateUrl: './roommate-search.page.html',
  styleUrls: ['./roommate-search.page.scss'],
})
export class RoommateSearchPage implements OnInit {

  constructor(private _router: Router) {}

  ngOnInit() {
    this._router.navigate([
      `${PATRON_NAVIGATION.housing}/${LOCAL_ROUTING.roommates}/search`
    ], { skipLocationChange: true });  
  }
}
