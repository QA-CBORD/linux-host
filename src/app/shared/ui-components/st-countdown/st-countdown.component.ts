import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { map, takeWhile, tap } from 'rxjs/operators';

@Component({
  selector: 'st-countdown',
  templateUrl: './st-countdown.component.html',
  styleUrls: ['./st-countdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StCountdownComponent implements OnInit {
  @Input() seconds = 3;
  @Output() onTimeout: EventEmitter<boolean> = new EventEmitter<boolean>();
  countdown$: Observable<number>;

  get animation(): { [key: string]: string } {
    return { 'animation-duration': `${this.seconds}s` };
  }

  ngOnInit() {
    this.initCounter();
  }

  private initCounter() {
    this.countdown$ = timer(this.seconds, 1000).pipe(
      map(seconds => this.seconds - seconds),
      tap(seconds => !seconds && this.onTimeout.emit(true)),
      takeWhile(seconds => Boolean(seconds + 1))
    );
  }
}
