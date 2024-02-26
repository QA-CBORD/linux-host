import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pronouns',
  standalone: true,
})
export class PronounsPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    value = value
      .split(',')
      .filter(Boolean)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(',');
    value = value.replace(/,/g, '/');
    return value;
  }
}
