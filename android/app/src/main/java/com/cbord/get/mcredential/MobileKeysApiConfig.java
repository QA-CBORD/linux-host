package com.cbord.get.mcredential;

import android.app.Application;
import android.util.Log;

import com.assaabloy.mobilekeys.api.MobileKeysApi;
import com.cbord.get.BuildConfig;
import com.hid.origo.api.OrigoApiConfiguration;
import com.hid.origo.api.OrigoMobileKeysApi;
import com.hid.origo.api.OrigoMobileKeysCallback;
import com.hid.origo.api.OrigoMobileKeysException;
import com.hid.origo.api.OrigoReaderConnectionInfoType;
import com.hid.origo.api.ble.OrigoOpeningResult;
import com.hid.origo.api.ble.OrigoOpeningStatus;
import com.hid.origo.api.ble.OrigoOpeningTrigger;
import com.hid.origo.api.ble.OrigoOpeningType;
import com.hid.origo.api.ble.OrigoReader;
import com.hid.origo.api.ble.OrigoReaderConnectionCallback;
import com.hid.origo.api.ble.OrigoReaderConnectionListener;
import com.hid.origo.api.ble.OrigoScanConfiguration;
import com.hid.origo.api.ble.OrigoTapOpeningTrigger;
import com.hid.origo.api.hce.OrigoHceConnectionCallback;
import com.hid.origo.api.hce.OrigoHceConnectionListener;
import com.hid.origo.api.hce.OrigoNfcConfiguration;

/**
 * Application class handling the initialization of the Mobile Keys API
 */

public class MobileKeysApiConfig extends Application implements OrigoReaderConnectionListener, OrigoHceConnectionListener {

    private OrigoMobileKeysApi mobileKeysApi;
    private static final int LOCK_SERVICE_CODE = 2;
    private static final String APPLICATION_ID = "com.cbord.get";
    private static final String INITIALIZATION_SUCCESS = "success";
    private boolean mobileKeysApiInitialized = false;

    private void configureOrigoMobileKeysApi(TransactionCompleteCallback callback) {
        try {

            OrigoApiConfiguration origoApiConfiguration = new OrigoApiConfiguration.Builder()
                    .setApplicationId(BuildConfig.AAMK_APP_ID)
                    .setApplicationDescription(BuildConfig.AAMK_APP_ID_DESCRIPTION)
                    .setNfcParameters(new OrigoNfcConfiguration.Builder()
                            .unsafe_setAttemptNfcWithScreenOff(true)
                            .build())
                    .build();

            OrigoScanConfiguration origoScanConfiguration = new OrigoScanConfiguration.Builder(
                    new OrigoOpeningTrigger[]{new OrigoTapOpeningTrigger(this)
                    }, LOCK_SERVICE_CODE)
                    .setAllowBackgroundScanning(false)
                    .build();

            mobileKeysApi = OrigoMobileKeysApi.getInstance();

            if (Boolean.FALSE.equals(mobileKeysApi.isInitialized()))
                mobileKeysApi.initialize(this, origoApiConfiguration, origoScanConfiguration, APPLICATION_ID);
            mobileKeysApiInitialized = true;
            callback.onCompleted(INITIALIZATION_SUCCESS);
        } catch (Exception ex) {
            callback.onCompleted(ex.getMessage());
        }
    }

    private void registerEventListeners() {
        OrigoReaderConnectionCallback readerConnectionCallback = new OrigoReaderConnectionCallback(getApplicationContext());
        readerConnectionCallback.registerReceiver(this);
        OrigoHceConnectionCallback hceConnectionCallback = new OrigoHceConnectionCallback(getApplicationContext());
        hceConnectionCallback.registerReceiver(this);
    }

    public void initializeMobileKeysApi(TransactionCompleteCallback callback) {
        if (mobileKeysApiInitialized) {
            callback.onCompleted(INITIALIZATION_SUCCESS);
        } else {
            configureOrigoMobileKeysApi(transactionResult -> {
                if (INITIALIZATION_SUCCESS.equals(transactionResult)) {
                    mobileKeysApi.getMobileKeys().applicationStartup(new OrigoMobileKeysCallback() {
                        public void handleMobileKeysTransactionCompleted() {
                            callback.onCompleted(INITIALIZATION_SUCCESS);
                            registerEventListeners();
                        }

                        public void handleMobileKeysTransactionFailed(OrigoMobileKeysException e) {
                            callback.onCompleted(e.getMessage());
                        }
                    });
                } else {
                    callback.onCompleted(transactionResult);
                }
            });
        }
    }


    public OrigoMobileKeysApi getMobileKeysApi() {
        return mobileKeysApi;
    }


    @Override
    public void onCreate() {
        super.onCreate();
        initializeMobileKeysApi(transactionResult -> {
        });
    }

    @Override
    public void onReaderConnectionOpened(OrigoReader origoReader, OrigoOpeningType origoOpeningType) {
    }

    @Override
    public void onReaderConnectionClosed(OrigoReader origoReader, OrigoOpeningResult origoOpeningResult) {
    }

    @Override
    public void onReaderConnectionFailed(OrigoReader origoReader, OrigoOpeningType origoOpeningType, OrigoOpeningStatus origoOpeningStatus) {
    }

    @Override
    public void onHceSessionOpened() {
    }

    @Override
    public void onHceSessionClosed(int i) {
    }

    @Override
    public void onHceSessionInfo(OrigoReaderConnectionInfoType origoReaderConnectionInfoType) {
    }
}
