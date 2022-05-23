import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'st-search-filter-section',
  templateUrl: './search-filter-section.component.html',
  styleUrls: ['./search-filter-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFilterSectionComponent {
  @Input() title: string;

  @Input() subtitle: string;

  @Input() toggled = false;

  toggle(): void {
    this.toggled = !this.toggled;
  }
}
