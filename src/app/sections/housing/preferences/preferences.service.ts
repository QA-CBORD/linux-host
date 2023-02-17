import { Injectable } from '@angular/core';

import { QuestionsEntries } from '../questions/questions-storage.service';

import { PatronPreference } from '../applications/applications.model';
import { QuestionReorder, QuestionBase, QuestionReorderValue } from '../questions/types';

@Injectable({
  providedIn: 'root',
})
export class PreferencesService {
  getPreferences(
    patronPreferences: PatronPreference[],
    parsedJson: QuestionReorder[],
    questions: QuestionsEntries
  ): PatronPreference[] {
    const facilityPicker: QuestionReorder = parsedJson.filter(
      (control: QuestionBase) => control && (control as QuestionReorder).facilityPicker
    )[0];

    if (patronPreferences != null && !facilityPicker) {
      return patronPreferences.filter((preference: PatronPreference) => preference.facilityKey);
    }

    const facilities: QuestionReorderValue[] = facilityPicker.values
      ? facilityPicker.values.filter((facility: QuestionReorderValue) => facility.selected)
      : [];
    const foundQuestion = questions[facilityPicker.name];

    return patronPreferences
      .slice(0, facilityPicker.prefRank)
      .map((preference: PatronPreference) => {
        const rank: number = preference.rank - 1;
        const foundFacility: QuestionReorderValue = foundQuestion ? foundQuestion[rank] : facilities[rank];

        if (!foundFacility) {
          return preference;
        }

        const facilityKey: number = foundFacility.facilityKey;

        return new PatronPreference({ ...preference, facilityKey });
      })
      .filter((preference: PatronPreference) => preference.facilityKey);
  }
}
