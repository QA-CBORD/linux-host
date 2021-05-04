import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CheckInOut } from '@sections/housing/check-in-out/check-in-out.model';
import { CheckInOutStateService} from '@sections/housing/check-in-out/check-in-out-state.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '@core/service/toast/toast.service';

@Component({
  selector: 'st-check-in-out-items',
  templateUrl: './check-in-out-items.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./check-in-out-items.component.scss'],
})
export class CheckInOutItemsComponent implements OnInit, AfterViewInit {
  @ViewChild('container') divContainer: ElementRef;
  @Input() contractSummaries: CheckInOut[]
  ngOnInit() {
  }
 ngAfterViewInit() {
    //helps load ionList that doesnt load unless an event is fired
   if(this.contractSummaries.length > 0)
    this.divContainer.nativeElement.click();
 }
  constructor(public checkInOutStateService: CheckInOut,
              private _router: Router,
              private _activeRoute: ActivatedRoute,
              private _toastService: ToastService) {
  }
}