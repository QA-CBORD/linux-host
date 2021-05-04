export class CheckInOut {
    name: string;
    availableStartDate: string;
    availableEndDate: string;
    key: number;
  
    constructor(options: any) {
      if (options == null || typeof options !== 'object') {
        options = {};
      }
  
      this.name = String(options.name);
      this.availableStartDate = String(options.availableStartDate);
      this.availableEndDate = String(options.availableEndDate);
      this.key = Number(options.key);
    }
  }