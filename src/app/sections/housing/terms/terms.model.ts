export class Term {
  termId: number;
  termStartDate: string;
  termEndDate: string;
  termName: string;

  constructor(options: any) {
    if (options == null || typeof options !== 'object') {
      options = {};
    }

    this.termId = Number(options.termId);
    this.termStartDate = String(options.termStartDate);
    this.termEndDate = String(options.termEndDate);
    this.termName = String(options.termName);
  }
}
