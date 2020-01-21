import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'st-add-to-favorite',
  templateUrl: './add-to-favorite.component.html',
  styleUrls: ['./add-to-favorite.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddToFavoriteComponent implements OnChanges {
  private readonly iconUrlPrefix: string = '/assets/icon/add-to-favorite';

  @Input() active: boolean = false;

  @Output() added: EventEmitter<void> = new EventEmitter<void>();

  iconUrl: string = `${this.iconUrlPrefix}.svg`;

  ngOnChanges(changes: SimpleChanges): void {
    const { active }: SimpleChanges = changes;

    if (active && active.previousValue !== active.currentValue) {
      this.updateIconUrl(active.currentValue);
    }
  }

  addToFavorite(): void {
    this.active = !this.active;

    this.updateIconUrl(this.active);
    this.added.emit();
  }

  private updateIconUrl(active: boolean): void {
    const iconUrlPostfix: string = active ? '-active' : '';

    this.active = active;
    this.iconUrl = `${this.iconUrlPrefix}${iconUrlPostfix}.svg`;
  }
}
