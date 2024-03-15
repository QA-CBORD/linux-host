import { DepositCsModel, DepositSuccessCs, ConfirmDepositCs } from './deposit-page.content.string';

describe('DepositCsModel', () => {
    let depositCsModel: DepositCsModel = new DepositCsModel( { getConfig: () => ({}) } as any);

    it('should create an instance', () => {
        expect(depositCsModel).toBeTruthy();
    });

    it('should return the correct instance of DepositSuccessCs', () => {
        const depositSuccessCs = depositCsModel.depositSuccessCs;
        expect(depositSuccessCs instanceof DepositSuccessCs).toBe(true);
    });

    it('should return the correct instance of ConfirmDepositCs', () => {
        const confirmDepositCs = depositCsModel.confirmDepositCs;
        expect(confirmDepositCs instanceof ConfirmDepositCs).toBe(true);
    });

    it('should return the correct label for selecting a payment method', () => {
        const lblSelectPaymentMethod = depositCsModel.lblSelectPaymentMethod;
        expect(lblSelectPaymentMethod).toBe('Payment Method');
    });

    it('should return the correct label for selecting a new credit card', () => { 
        const lblSelectPaymentMethod = depositCsModel.newCreditCardText;
        expect(lblSelectPaymentMethod).toBe('Add a Credit Card');
    });
    
    it('should return the correct label for the card security code', () => {
        const lblCardSecurityCode = depositCsModel.lblCardSecurityCode;
        expect(lblCardSecurityCode).toBe('Card Security Code');
    });

    it('should return the correct error message for the card security code', () => {
        const cardSecurityCodeError = depositCsModel.cardSecurityCodeError;
        expect(cardSecurityCodeError).toBe('Please enter a valid card security code.');
    });

    it('should return the correct label for selecting an account for deposit', () => {
        const lblSelectAccountForDeposit = depositCsModel.lblSelectAccountForDeposit;
        expect(lblSelectAccountForDeposit).toBe('To Account');
    });

    it('should return the correct label for selecting an amount for deposit', () => {
        const lblSelectAmountForDeposit = depositCsModel.lblSelectAmountForDeposit;
        expect(lblSelectAmountForDeposit).toBe('Amount to Deposit');
    });

    it('should return the correct error message for the maximum amount', () => {
        const maxAmountError = depositCsModel.maxAmountError;
        expect(maxAmountError).toBe('The maximum amount for a deposit is');
    });

    it('should return the correct error message for the minimum amount', () => {
        const minAmountError = depositCsModel.minAmountError;
        expect(minAmountError).toBe('The minimum amount for a deposit is');
    });

    it('should return the correct error message for the amount pattern', () => {
        const amountPatternError = depositCsModel.amountPatternError;
        expect(amountPatternError).toBe('Please enter a valid amount.');
    });

    it('should return the correct submit button text', () => {
        const submitButtonText = depositCsModel.submitButtonText;
        expect(submitButtonText).toBe('Deposit');
    });

    it('should return the correct select placeholder text', () => {
        const selectPlaceHolderText = depositCsModel.selectPlaceHolderText;
        expect(selectPlaceHolderText).toBe('Please Choose');
    });
});
   

