import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'st-roommate-search',
  templateUrl: './roommate-search.page.html',
  styleUrls: ['./roommate-search.page.scss'],
})
export class RoommateSearchPage implements OnInit {

  constructor(private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this._router.navigate(['search'], {relativeTo: this._route});
  }
}
