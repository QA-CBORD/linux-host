import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Renderer2 as Renderer,
  ElementRef,
  OnInit,
} from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

import { QuestionBase } from './types/question-base';
import { QuestionHeader } from './questions.model';

@Component({
  selector: 'st-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionComponent implements OnInit {
  constructor(private _changeDetector: ChangeDetectorRef, private _renderer: Renderer, private _el: ElementRef) {}

  @Input() question: QuestionBase;

  @Input() name: string;

  @Input() parentGroup: FormGroup;

  customActionSheetOptions: { [key: string]: string } = {
    cssClass: 'custom-deposit-actionSheet',
  };

  ngOnInit(): void {
    if (this.question.type === 'header') {
      this.createHeader(this.question as QuestionHeader);
    }
  }

  createHeader(question: QuestionHeader): void {
    const headerWeight: number = parseInt(question.subtype, 10);
    const header: HTMLHeadingElement = this._renderer.createElement(question.subtype);
    const text = this._renderer.createText(question.label);

    if (headerWeight > 1) {
      this._renderer.addClass(header, 'question__secondary-header ion-text-uppercase');
    } else {
      this._renderer.addClass(header, 'question__primary-header');
    }

    this._renderer.appendChild(header, text);
    this._renderer.appendChild(this._el.nativeElement, header);
  }

  check(): void {
    this._changeDetector.markForCheck();
  }

  touch(): void {
    const controls: { [key: string]: AbstractControl } = this.parentGroup.controls;

    Object.keys(controls).forEach((controlName: string) => {
      controls[controlName].markAsTouched();
      controls[controlName].markAsDirty();
    });

    this.check();
  }

  doReorder(reorderEvent: CustomEvent): void {
    reorderEvent.detail.complete();
  }
}
