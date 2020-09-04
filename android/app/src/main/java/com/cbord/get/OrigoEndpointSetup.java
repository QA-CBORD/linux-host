package com.cbord.get;

import android.util.Log;

import com.hid.origo.OrigoKeysApiFacade;
import com.hid.origo.api.OrigoMobileKeysCallback;
import com.hid.origo.api.OrigoMobileKeysException;

public class OrigoEndpointSetup implements OrigoMobileKeysCallback {

    private OrigoKeysApiFacade mobileKeysApiFacade;

    public OrigoEndpointSetup(OrigoStartup origoStartup) {
        this.mobileKeysApiFacade = (OrigoKeysApiFacade) origoStartup;
    }

    public void onStart() {
        // TODO: Set invitation code retrieved from Ionic
        submitInvitationCode("0000-0000-0000-0000");

        if (mobileKeysApiFacade.isEndpointSetUpComplete()) {
            mobileKeysApiFacade.onEndpointSetUpComplete();
        }
    }

    public static boolean shouldRetry(OrigoMobileKeysException exception) {
        boolean shouldRetry = false;
        switch (exception.getErrorCode()) {
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

    private void submitInvitationCode(String invitationCode) {
        Log.d("TAG", "Endpoint setup started");
        mobileKeysApiFacade.getMobileKeys().endpointSetup(this, invitationCode);
    }

    @Override
    public void handleMobileKeysTransactionCompleted() {
        mobileKeysApiFacade.onEndpointSetUpComplete();
    }

    @Override
    public void handleMobileKeysTransactionFailed(OrigoMobileKeysException origomobileKeysException) {
        Log.e("TAG", "Endpoint setup failed: " + origomobileKeysException.getErrorCode(), origomobileKeysException);
         if(shouldRetry(origomobileKeysException)) {
             onStart();
         }
    }
}
