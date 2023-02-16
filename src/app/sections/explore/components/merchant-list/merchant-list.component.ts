import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MerchantInfo } from '@sections/ordering';

@Component({
  selector: 'st-merchant-list',
  templateUrl: './merchant-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MerchantListComponent {
  @Input() merchants: MerchantInfo[] = [];
  @Output() onMerchantClicked: EventEmitter<string> = new EventEmitter<string>();

  onClicked(id: string) {
    this.onMerchantClicked.emit(id);
  }
}
