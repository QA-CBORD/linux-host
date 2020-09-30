package com.cbord.get.mcredential;


import android.util.Log;
import com.hid.origo.api.OrigoMobileKeys;
import com.hid.origo.api.OrigoMobileKeysCallback;
import com.hid.origo.api.OrigoMobileKeysException;

public class OrigoMobileKeyStartup implements OrigoMobileKeysCallback {

    private static final String TAG = OrigoMobileKeyStartup.class.getName();

    private final HIDMobileCredentialSetup hidMobileCredentialSetup;

    public OrigoMobileKeyStartup(final HIDMobileCredentialSetup setup){
        this.hidMobileCredentialSetup = setup;
    }

    @Override
    public void handleMobileKeysTransactionCompleted() {
        Log.d(TAG, "handleMobileKeysTransactionCompleted()");
        hidMobileCredentialSetup.onStartUpComplete();
    }

    @Override
    public void handleMobileKeysTransactionFailed(OrigoMobileKeysException mobileKeysException) {
        Log.e(TAG, "Application startup failed: " + mobileKeysException.getErrorCode(), mobileKeysException);
        // we want to be able to notify ionic that this transaction has failed, maybe it wants to try ?.
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


    public static boolean shouldRetry(OrigoMobileKeysException exception)
    {
        boolean shouldRetry = false;
        switch (exception.getErrorCode())
        {
            case INTERNAL_ERROR:
            case SERVER_UNREACHABLE:
            case SDK_BUSY:
                shouldRetry = true;
                break;
            case INVALID_INVITATION_CODE:
            case DEVICE_SETUP_FAILED:
            case SDK_INCOMPATIBLE:
            case DEVICE_NOT_ELIGIBLE:
            case ENDPOINT_NOT_SETUP:
            default:
                break;
        }
        return shouldRetry;
    }
}
