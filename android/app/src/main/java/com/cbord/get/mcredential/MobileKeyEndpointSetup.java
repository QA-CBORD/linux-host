package com.cbord.get.mcredential;

import android.util.Log;

import com.cbord.get.HIDPlugin;
import com.hid.origo.OrigoKeysApiFacade;
import com.hid.origo.api.OrigoMobileKeysCallback;
import com.hid.origo.api.OrigoMobileKeysException;

/**
 * This class will handle the setup of the Mobile Key endpoint.
 */
public class MobileKeyEndpointSetup implements OrigoMobileKeysCallback {

    private static final String TAG = MobileKeyEndpointSetup.class.getName();

    private OrigoKeysApiFacade mobileKeysApiFacade;


    public MobileKeyEndpointSetup(final OrigoKeysApiFacade origoKeysApiFacade){
        this.mobileKeysApiFacade = origoKeysApiFacade;
    }

    private void submitInvitationCode()
    {
        String invitationCode = HIDPlugin.getActivationCode();
        Log.d(TAG, "Endpoint setup started with invitationCode: " + invitationCode);
        mobileKeysApiFacade.getMobileKeys().endpointSetup(this, invitationCode);
    }


    public void doSetup(){
        this.submitInvitationCode();
    }


    @Override
    public void handleMobileKeysTransactionCompleted() {
        ((OrigoMobileKeysCallback)this.mobileKeysApiFacade).handleMobileKeysTransactionCompleted();
    }

    @Override
    public void handleMobileKeysTransactionFailed(OrigoMobileKeysException e) {
        ((OrigoMobileKeysCallback)this.mobileKeysApiFacade).handleMobileKeysTransactionFailed(e);
    }
}
