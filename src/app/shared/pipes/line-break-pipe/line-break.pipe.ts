import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lineBreak',
  pure: false,
})
export class LineBreakPipe implements PipeTransform {
  transform(value: string): string {
    return value && value.replace(/(?:\r\n|\r|\n)/g, '<br/>');
  }
}
