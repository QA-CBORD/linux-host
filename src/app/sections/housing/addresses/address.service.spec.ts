import { TestBed } from "@angular/core/testing";
import { QuestionsEntries } from "../questions/questions-storage.service";
import { PatronAddressService } from "./address.service";

describe("PatronAddressService", () => {
  let service: PatronAddressService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [PatronAddressService] });
    service = TestBed.inject(PatronAddressService);
  });

  it("can load instance", () => {
    expect(service).toBeTruthy();
  });
});
