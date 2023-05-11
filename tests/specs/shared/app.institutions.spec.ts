import { pause } from '../../helpers';

import Institution from '../../pageobjects/institutions.page';
import { AWAIT_TIME } from '../constants';

describe('Institutions', () => {

    beforeEach(async () => {
        await pause(AWAIT_TIME);
    });

    it('Should look for odyssey institution', async () => {
        const searchInstitutionSearchInput  = await Institution.searchInstitutionSearchInput;

        await pause(AWAIT_TIME);

        searchInstitutionSearchInput.click();

        await pause(AWAIT_TIME);

        await searchInstitutionSearchInput.setValue('odyssey - preview with')

    });

    it('Should select the institution', async() =>{
        const institutionItem = await Institution.institutionItem;

        await pause(AWAIT_TIME);

        institutionItem.click();
    })
});
