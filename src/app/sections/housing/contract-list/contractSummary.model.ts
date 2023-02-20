export class ContractSummary {
    fullName: string;
    startDate: string;
    endDate: string;
    state: number;
    facilityKey: number;
  
    constructor(options) {
      if (options == null || typeof options !== 'object') {
        options = {};
      }
  
      this.fullName = String(options.fullName);
      this.startDate = String(options.startDate);
      this.endDate = String(options.endDate);
      this.state = Number(options.state);
      this.facilityKey = Number(options.facilityKey)
    }
  }