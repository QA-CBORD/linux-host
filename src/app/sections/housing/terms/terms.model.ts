export class Term {
  key: number;
  termStartDateTime: string;
  termEndDateTime: string;
  termName: string;

  constructor(options: any) {
    if (options == null || typeof options !== 'object') {
      options = {};
    }

    this.key = Number(options.key);
    this.termStartDateTime = String(options.termStartDateTime);
    this.termEndDateTime = String(options.termEndDateTime);
    this.termName = String(options.termName);
  }
}
