import { pause } from '../helpers';

import Institution from '../pageobjects/institutions.page';

describe('Institutions', () => {

    beforeEach(async () => {
        await pause(500);
    });

    it('Should look for odyssey institution', async () => {
        const searchInstitutionSearchInput  = await Institution.searchInstitutionSearchInput;

        await pause(500);

        searchInstitutionSearchInput.click();

        await pause(1000);

        await searchInstitutionSearchInput.setValue('odyssey - preview with')

    });

    it('Should select the institution', async() =>{
        const institutionItem = await Institution.institutionItem;

        await pause(500);

        institutionItem.click();
    })
});
