import { Gestures, pause } from '../../helpers';
import dashboardPage from 'tests/pageobjects/dashboard.page';
import addFundsPage from 'tests/pageobjects/add-funds.page';
import { AWAIT_TIME } from '../constants';

describe('AddFundsFromDashboard', () => {

    beforeEach(async () => {
        await pause(AWAIT_TIME);
    });

    it('should display add funds button',async ()=>{
        const addFundsButton = await dashboardPage.AddFundsButton;
        await pause(AWAIT_TIME);
        await expect((await $(addFundsButton.selector))).toBeDisplayed();
    });

    it('should click add funds button',async ()=>{
        const addFundsButton = await dashboardPage.AddFundsButton;
        await pause(AWAIT_TIME);
        await addFundsButton.click();
        await pause(AWAIT_TIME);
    });

    it('should click payment method select', async ()=>{
        await pause(AWAIT_TIME);
        const SelectPaymentMethod = await addFundsPage.SelectPaymentMethod;
        await pause(AWAIT_TIME);
        await SelectPaymentMethod.click();
        await pause(AWAIT_TIME);
    });

    it('should select bill payment method', async ()=>{
        await pause(AWAIT_TIME);
        const BillPaymentMethodOption = await addFundsPage.BillPaymentMethodOption;
        await pause(AWAIT_TIME);
        await BillPaymentMethodOption.click();
        await pause(AWAIT_TIME);
    });

    it('should click to account select', async ()=>{
        await pause(AWAIT_TIME);
        const SelectToAccount = await addFundsPage.SelectToAccount;
        await pause(AWAIT_TIME);
        await SelectToAccount.click();
        await pause(AWAIT_TIME);
    });

    it('should select account', async ()=>{
        await pause(AWAIT_TIME);
        const AccountOptions = await addFundsPage.AccountOptions;
        await pause(AWAIT_TIME);
        await AccountOptions.click();
        await pause(AWAIT_TIME);
    });

    it('should select amount to deposit', async()=>{
        await pause(AWAIT_TIME);
        const SelectAmountToDeposit = await addFundsPage.SelectAmountToDeposit;
        await pause(AWAIT_TIME);
        await SelectAmountToDeposit.click();
        await pause(AWAIT_TIME);
    });

    it('should select 5 dollars amount', async ()=>{
        await pause(AWAIT_TIME);
        const FiveDollarsAmount = await addFundsPage.FiveDollarsAmount;
        await pause(AWAIT_TIME);
        await FiveDollarsAmount.click();
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

    it('should press confirm deposit button', async ()=>{
        await pause(5000);
        const TargetScroll = await addFundsPage.TargetScroll;
        await pause(AWAIT_TIME);
        await expect((await $(TargetScroll.selector))).toBeDisplayed();
    
        driver.executeScript("arguments[0].scrollIntoView(true);", [TargetScroll]);

    });
    it('should press confirm deposit button', async ()=>{

        await driver.executeAsyncScript("document.querySelector('.st-popover__content').scrollTop = document.querySelector('.st-popover__content').scrollHeight", []);

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
  });

