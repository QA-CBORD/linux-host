package com.cbord.get.mcredential;

import android.util.Log;
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

    private void submitInvitationCode(String invitationCode)
    {
        Log.d(TAG, "Endpoint setup started with invitationCode: " + invitationCode);
        mobileKeysApiFacade.getMobileKeys().endpointSetup(this, invitationCode);
    }


    public void doSetup(String invitationCode){
        this.submitInvitationCode(invitationCode);
    }


    @Override
    public void handleMobileKeysTransactionCompleted() {
        mobileKeysApiFacade.onEndpointSetUpComplete();
    }

    @Override
    public void handleMobileKeysTransactionFailed(OrigoMobileKeysException e) {
        ((OrigoMobileKeysCallback)this.mobileKeysApiFacade).handleMobileKeysTransactionFailed(e);
    }
}
