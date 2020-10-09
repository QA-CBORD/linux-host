package com.cbord.get.mcredential;


import android.util.Log;
import com.hid.origo.api.OrigoMobileKeys;
import com.hid.origo.api.OrigoMobileKeysCallback;
import com.hid.origo.api.OrigoMobileKeysException;

public class OrigoMobileKeyStartup implements OrigoMobileKeysCallback {

    private static final String TAG = OrigoMobileKeyStartup.class.getName();

    private final HIDSDKManager hidMobileCredentialSetup;

    public OrigoMobileKeyStartup(final HIDSDKManager setup){
        this.hidMobileCredentialSetup = setup;
    }

    @Override
    public void handleMobileKeysTransactionCompleted() {
        hidMobileCredentialSetup.onStartUpComplete();
    }

    @Override
    public void handleMobileKeysTransactionFailed(OrigoMobileKeysException mobileKeysException) {
        hidMobileCredentialSetup.handleMobileKeysTransactionFailed(mobileKeysException);
    }

    /**
     * Tell the mobile keys SDK that the app has started
     */
    public void applicationStarted()
    {
        OrigoMobileKeys mobileKeys = hidMobileCredentialSetup.getMobileKeys();
        mobileKeys.applicationStartup(this);
    }
}
