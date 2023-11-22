import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'st-badge',
  template: `<span class="badge-container"><ng-content></ng-content></span>`,
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./badge.component.scss'],
})
export class StBadgeComponent {}
