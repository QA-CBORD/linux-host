import { Pipe, PipeTransform } from '@angular/core';
import { AccessibilityService } from '@shared/accessibility/services/accessibility.service';

@Pipe({ name: 'search' })
export class SearchPipe implements PipeTransform {
  constructor(private readonly a11yService: AccessibilityService) {}
  transform(value: { name: string }[], term: string): object[] {
    if (!value) {
      return [];
    }
    const newList = value.filter(x => x.name.toLowerCase().includes(term.toLowerCase()));
    this.a11yService.excuteSearchSpeech(newList);
    return newList;
  }
}
