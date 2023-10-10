import { pause } from '../../helpers';
import configurationPage from '../../pageobjects/configuration.page';
import UpdatePhotoPage from '../../pageobjects/settings/update-photo.page';
import { AWAIT_TIME } from '../constants';

describe('Report card as lost', () => {
  beforeEach(async () => {
    await pause(AWAIT_TIME);
  });

  it('Should validate that the update photo button is displayed', async () => {
    await pause(AWAIT_TIME);
    const UpdatePhotoOption = await configurationPage.UpdatePhoto;
    await pause(AWAIT_TIME);
    await expect(await $(UpdatePhotoOption.selector)).toBeDisplayed();

    UpdatePhotoOption.click();
  });

  it('Should validate update photo page is displayed', async () => {
    await pause(AWAIT_TIME);
    const Title = await UpdatePhotoPage.Title;
    await pause(AWAIT_TIME);
    const TitleElement = await $(Title.selector);
    await expect(TitleElement).toBeDisplayed();
  });
});
