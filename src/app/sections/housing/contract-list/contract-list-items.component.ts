import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ContractSummary } from '@sections/housing/contract-list/contractSummary.model';
import { ContractListStateService } from '@sections/housing/contract-list/contract-list-state.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '@core/service/toast/toast.service';

@Component({
  selector: 'st-contract-list-items',
  templateUrl: './contract-list-items.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./contract-list-items.component.scss'],
})
export class ContractListItemsComponent implements OnInit, AfterViewInit {
  @ViewChild('container') divContainer: ElementRef;
  @Input() contractSummaries: ContractSummary[]

  ngOnInit() {
  }
 ngAfterViewInit() {
    //helps load ionList that doesnt load unless an event is fired
   if(this.contractSummaries.length > 0)
    this.divContainer.nativeElement.click();
 }

  constructor(public roomsStateService: ContractListStateService,
              private _router: Router,
              private _activeRoute: ActivatedRoute,
              private _toastService: ToastService) {
  }
}
