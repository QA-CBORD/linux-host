import createpin from '../pageobjects/createnewpin.page';
 
 
 const setPin = async (pinButton: WebdriverIO.Element) => {
  for (let i = 0; i < 4; i++) {
    await pinButton.click();
  }
};
export const setPinWithNumber2 = async () => {
    const pinnumber = await createpin.pinButton2;
    setPin(pinnumber)
  };

export const setPinWithNumber3 = async () => {
    const pinnumber = await createpin.pinButton3;
    setPin(pinnumber)
  };
  export const setPinWithNumber1 = async () => {
    const pinnumber = await createpin.pinButton1;
    setPin(pinnumber)
  };
