import { defaultPreloginCs } from '@shared/model/content-strings/default-strings';
import { PreloginCsModel } from './prelogin-content-strings.model';

describe('PreloginCsModel', () => {
  let model: any;

  beforeEach(() => {
    const nullableContent = {
      getConfig: () => ({
        ...defaultPreloginCs,
      }),
    } as any;

    model = new PreloginCsModel(nullableContent);
  });

  it('should return the correct continueAsGuest', () => {
    expect(model.continueAsGuest).toBe(defaultPreloginCs.continue_as_guest);
  });

  it('should return the correct continueAsNonGuest', () => {
    expect(model.continueAsNonGuest).toBe(defaultPreloginCs.continue_as_nonguest.split('|')[0]);
  });

  it('should return the correct instructions', () => {
    expect(model.instructions).toBe(defaultPreloginCs.pre_login_instruction);
  });

  it('should modify continue_as_nonguest for acute care', () => {
    model.params = { acuteCare: true };
    model.configure();
    expect(model.continueAsNonGuest).toBe(defaultPreloginCs.continue_as_nonguest.split('|')[0]);
  });
});
