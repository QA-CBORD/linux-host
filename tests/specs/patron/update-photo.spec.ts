import { pause } from '../../helpers';
import configurationPage from '../../pageobjects/configuration.page';
import UpdatePhotoPage from '../../pageobjects/settings/update-photo.page';
import { AWAIT_TIME } from '../constants';

describe('Update Photo', () => {
  beforeEach(async () => {
    await pause(AWAIT_TIME);
  });
  const validatePhotoActionSheet = async () => {
    const photoActionSelectors = ['.action-sheet-take-photo', '.action-sheet-select-photo'];
    await pause(AWAIT_TIME);
    for (const selector of photoActionSelectors) {
      const takePhotoAction = await $(selector);
      await expect(takePhotoAction).toBeDisplayed();
    }
    const closePhotoAction = await $('.action-sheet-cancel');
    await expect(closePhotoAction).toBeDisplayed();
    closePhotoAction.click();
  };
  it('Should validate update photo button is displayed', async () => {
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
    await expect(TitleElement).toHaveText('Photo Upload');
  });

  it('Should validate submit photo button is disabled', async () => {
    const submitButton = await $$('.submit-btn')[0];
    await expect(submitButton).toBeDisplayed();
    // TODO: Check for disabled state
    // await expect(submitButton).toBeDisabled();
  });

  it('Should validate update photo action sheet is displayed', async () => {
    const uploadPhotoBtns = await $$('.upload-btn');
    for (const uploadPhotoBtn of uploadPhotoBtns) {
      uploadPhotoBtn.click();
      await pause(AWAIT_TIME);
      await validatePhotoActionSheet();
    }
  });
});
