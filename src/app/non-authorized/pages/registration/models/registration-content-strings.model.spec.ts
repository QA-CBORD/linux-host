import { RegistrationCsModel } from './registration-content-strings.model';

describe('RegistrationCsModel', () => {
    let registrationCsModel: RegistrationCsModel;

    beforeEach(() => {
        registrationCsModel = new RegistrationCsModel(( { getConfig: () => ({}) } as any));
    });

    it('should return the correct title', () => {
        expect(registrationCsModel.title).toBe('Create an account'); 
    });

    it('should return the correct phone', () => {
        expect(registrationCsModel.phone).toBe('Phone'); 
    });

    it('should return the correct submit button text', () => {
        expect(registrationCsModel.submitBtnTxt).toBe('Create Account'); 
    });

    it('should return the default generic message for unknown error code', () => {
        const errorCode = 'unknown';
        const defaultErrorMessage = 'Registration failed. Please try again later';
        expect(registrationCsModel.fromCodeOrDefaultErrortext(errorCode)).toBe(defaultErrorMessage);
    });

    it('should return the correct error message for a specific error code', () => {
        const errorCode = 'specific';
        const expectedErrorMessage = 'Registration failed. Please try again later';
        expect(registrationCsModel.fromCodeOrDefaultErrortext(errorCode)).toBe(expectedErrorMessage);
    });

    it('should return null for an unknown error code', () => {
        const errorCode = 'unknown';
        expect(registrationCsModel.textFromErrorCode(errorCode)).toBeUndefined();
    });

    it('should return null for an unknown error code for a specific error code', () => {
        const errorCode = 'specific';
        expect(registrationCsModel.textFromErrorCode(errorCode)).toBeUndefined();
    });

    it('should return the correct first name', () => {
        expect(registrationCsModel.firstName).toBe('First Name'); 
    });

    it('should return the correct last name', () => {
        expect(registrationCsModel.lastName).toBe('Last Name'); 
    });

    it('should return the correct user name', () => {
        expect(registrationCsModel.userName).toBe('Email'); 
    });

    it('should return the correct password', () => {
        expect(registrationCsModel.password).toBe('Password'); 
    });

    it('should return the correct confirm password', () => {
        expect(registrationCsModel.confirmPassword).toBeUndefined(); 
    });

    it('should return the correct dismiss button text', () => {
        expect(registrationCsModel.dismissBtnText).toBe('Dismiss'); 
    });

    it('should return the correct resend email', () => {
        expect(registrationCsModel.resendEmail).toBe('Resend Email'); 
    });

    it('should return the correct success title', () => {
        expect(registrationCsModel.successTitle).toBe('Verify Email'); 
    });

    it('should return the correct success message', () => {
        expect(registrationCsModel.successMessage).toBe('We have sent you a verification email. Tap the link inside that to verify your email and login'); 
    });
});
