import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-work-orders',
  templateUrl: './work-orders.page.html',
  styleUrls: ['./work-orders.page.scss'],
})
export class WorkOrdersPage implements OnInit {

  workOrderId = null;
  constructor(private activatedroute: ActivatedRoute) { }

  ngOnInit() {
    this.workOrderId = this.activatedroute.snapshot.paramMap.get('workOrderId');
  }

}
