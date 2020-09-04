package com.cbord.get;

import android.content.Context;
import android.util.Log;

import com.hid.origo.OrigoKeysApiFacade;
import com.hid.origo.OrigoKeysApiFactory;
import com.hid.origo.api.OrigoMobileKeys;
import com.hid.origo.api.OrigoMobileKeysCallback;
import com.hid.origo.api.OrigoMobileKeysException;
import com.hid.origo.api.OrigoReaderConnectionController;
import com.hid.origo.api.OrigoReaderConnectionInfoType;
import com.hid.origo.api.ble.OrigoOpeningResult;
import com.hid.origo.api.ble.OrigoOpeningStatus;
import com.hid.origo.api.ble.OrigoOpeningType;
import com.hid.origo.api.ble.OrigoReader;
import com.hid.origo.api.ble.OrigoReaderConnectionCallback;
import com.hid.origo.api.ble.OrigoReaderConnectionListener;
import com.hid.origo.api.ble.OrigoScanConfiguration;
import com.hid.origo.api.hce.OrigoHceConnectionCallback;
import com.hid.origo.api.hce.OrigoHceConnectionListener;

public class OrigoStartup implements OrigoMobileKeysCallback, OrigoKeysApiFacade, OrigoReaderConnectionListener, OrigoHceConnectionListener {

    private OrigoMobileKeys mobileKeys;
    private OrigoKeysApiFacade mobileKeysApiFacade;
    private OrigoKeysApiFactory mobileKeysApiFactory;
    private OrigoEndpointSetup endpointSetup;
    private OrigoKeys origoKeys;

    public OrigoStartup(Context context, OrigoKeysApiFactory setup) {

        this.mobileKeysApiFacade = this;
        this.mobileKeysApiFactory = setup;
        mobileKeys = mobileKeysApiFactory.getMobileKeys();
        endpointSetup = new OrigoEndpointSetup(this);
        origoKeys = new OrigoKeys(this, context);

        OrigoReaderConnectionCallback readerConnectionCallback = new OrigoReaderConnectionCallback(context);
        readerConnectionCallback.registerReceiver(this);

        OrigoHceConnectionCallback hceConnectionCallback = new OrigoHceConnectionCallback(context);
        hceConnectionCallback.registerReceiver(this);
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

    void mobileKeysStartup() {
        OrigoMobileKeys mobileKeys = mobileKeysApiFacade.getMobileKeys();
        mobileKeys.applicationStartup(this);
    }

    @Override
    public void handleMobileKeysTransactionCompleted() {
        Log.d("TAG", "Application startup success");
        mobileKeysApiFacade.onStartUpComplete();
    }

    @Override
    public void handleMobileKeysTransactionFailed(OrigoMobileKeysException mobileKeysException) {
        Log.e("TAG", "Application startup failed: " + mobileKeysException.getErrorCode(), mobileKeysException);
        if (shouldRetry(mobileKeysException)) {
            mobileKeysStartup();
        }
    }

    @Override
    public void onStartUpComplete() {
        Log.d("TAG", "Application onStartUpComplete()");
        showEndpointSetupFragmentIfNotSetup();
    }

    @Override
    public void onEndpointSetUpComplete() {
        Log.e("TAG", "Application onEndpointSetUpComplete()");
        origoKeys.onResume();
    }

    @Override
    public void endpointNotPersonalized() {
        endpointSetup.onStart();
    }

    @Override
    public boolean isEndpointSetUpComplete() {
        boolean isEndpointSetup = false;
        try
        {
            isEndpointSetup = mobileKeys.isEndpointSetupComplete();
        }
        catch (OrigoMobileKeysException e)
        {
            Log.e("TAG", "isEndpointSetUpComplete() error", e);
        }
        return isEndpointSetup;
    }

    @Override
    public OrigoMobileKeys getMobileKeys() {
        return mobileKeysApiFactory.getMobileKeys();
    }

    @Override
    public OrigoReaderConnectionController getReaderConnectionController() {
        return mobileKeysApiFactory.getReaderConnectionController();
    }

    @Override
    public OrigoScanConfiguration getOrigoScanConfiguration() {
        return mobileKeysApiFactory.getOrigoScanConfiguration();
    }

    private void showEndpointSetupFragmentIfNotSetup() {
        try {
            if (mobileKeys.isEndpointSetupComplete()) {
                onEndpointSetUpComplete();
            }
            else {
                endpointSetup.onStart(); // TODO: verify proper way to trigger endpoint setup
            }
        }
        catch (OrigoMobileKeysException exception)
        {
            Log.e("TAG", "Application startup failed", exception);
            if(shouldRetry(exception)) {
                onStartUpComplete();
            }
        }
    }

    @Override
    public void onReaderConnectionOpened(OrigoReader origoReader, OrigoOpeningType origoOpeningType) {
        // Callback method when a reader session is started.
    }

    @Override
    public void onReaderConnectionClosed(OrigoReader origoReader, OrigoOpeningResult origoOpeningResult) {
        // Callback method when a reader session has finished.
    }

    @Override
    public void onReaderConnectionFailed(OrigoReader origoReader, OrigoOpeningType origoOpeningType, OrigoOpeningStatus origoOpeningStatus) {
        // Callback when a connection could not be initialized.
    }

    @Override
    public void onHceSessionOpened() {
        // Callback to the implementing service when a HCE session with a reader has been initialized.

    }

    @Override
    public void onHceSessionClosed(int var1) {
        // Callback to the implementing service when a HCE session with a reader has been closed.

    }

    @Override
    public void onHceSessionInfo(OrigoReaderConnectionInfoType readerConnectionInfoType) {
        // Callback when a potentially interesting event happens on the connection, that is not sessionOpened or sessionClosed.
    }
}
