import * as uuid from 'uuid';
jest.mock('uuid');
import { UuidGeneratorService } from './uuid-generator.service';

describe(UuidGeneratorService, () => {
  let service: UuidGeneratorService;

  beforeEach(() => {
    service = new UuidGeneratorService();
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should generate a valid uuid ', () => {
    const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
    jest.spyOn(uuid, 'v4').mockReturnValue('e5c33823-a8ea-4a02-a32c-bcf718cc8c57');
    expect(regexExp.test(service.newUUID())).toBeTruthy();
  });
});
