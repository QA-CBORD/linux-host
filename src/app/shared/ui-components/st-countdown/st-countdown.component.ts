import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { map, takeWhile, tap } from 'rxjs/operators';

@Component({
  selector: 'st-countdown',
  templateUrl: './st-countdown.component.html',
  styleUrls: ['./st-countdown.component.scss'],
})
export class CountdownComponent implements OnInit {
  @Input('seconds') seconds: number = 3;
  @Output('onTimeout') onTimeout: EventEmitter<boolean> = new EventEmitter<boolean>();
  private countdown$: Observable<number>;

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
