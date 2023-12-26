import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'search' })
export class SearchPipe implements PipeTransform {
  transform(value: { name: string }[], term: string): object[] {
    if (!value) {
      return [];
    }
    return value.filter(x => x.name.toLowerCase().includes(term.toLowerCase()));
  }
}
