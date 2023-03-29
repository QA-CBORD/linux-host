import { pause } from "tests/helpers";
import addFundsPage from "tests/pageobjects/add-funds.page";
import { AWAIT_TIME } from "../constants";


describe('Confirm deposit funds', ()=>{

    beforeEach(async () => {
        await pause(AWAIT_TIME);
    });
    
    it('should press deposit button', async ()=>{
        await pause(AWAIT_TIME);
        const DepositButton = await addFundsPage.DepositButton;
        await pause(AWAIT_TIME);
        await DepositButton.click();
        await pause(AWAIT_TIME);
    });

    it('should display confirmation deposit modal', async ()=>{
        const ConfirmDepositModalTitle = await addFundsPage.ConfirmDepositModalTitle
        await pause(AWAIT_TIME);
        await expect((await $(ConfirmDepositModalTitle.selector))).toBeDisplayed();
    });

    it('should scroll down', async ()=>{
        await pause(5000);
        const TargetScroll = await addFundsPage.TargetScroll;
        await pause(AWAIT_TIME);
        await expect((await $(TargetScroll.selector))).toBeDisplayed();
    
        driver.executeScript("arguments[0].scrollIntoView(true);", [TargetScroll]);

    });
    it('should press confirm deposit button', async ()=>{
        await pause(AWAIT_TIME);
        const ConfirmDepositButton = await addFundsPage.ConfirmDepositButton;
        await pause(AWAIT_TIME);
        await ConfirmDepositButton.click();
        await pause(AWAIT_TIME);
    });

    it('should display confirmation text', async ()=>{
        const ConfirmationDepositDone = await addFundsPage.ConfirmationDepositDone
        await pause(AWAIT_TIME);
        await expect((await $(ConfirmationDepositDone.selector))).toBeDisplayed();
    });

    it('should press Done button when finish', async ()=>{
        await pause(AWAIT_TIME);
        const DoneButton = await addFundsPage.DoneButton;
        await pause(AWAIT_TIME);
        await DoneButton.click();
        await pause(AWAIT_TIME);
    });
})