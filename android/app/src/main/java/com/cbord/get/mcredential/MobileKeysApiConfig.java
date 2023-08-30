package com.cbord.get.mcredential;

import android.app.Application;
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
import com.hid.origo.logger.OrigoLogger;
import org.slf4j.Logger;

/**
 * Application class handling the initialization of the Mobile Keys API
 */

public class MobileKeysApiConfig extends Application implements OrigoReaderConnectionListener, OrigoHceConnectionListener {

    private OrigoMobileKeysApi mobileKeysApi;
    private static final int LOCK_SERVICE_CODE = 2;
    private static final String APPLICATION_ID = "com.cbord.get";
    private static final String INITIALIZATION_SUCCESS = "success";
    private boolean mobileKeysApiInitialized = false;
    private Logger LOGGER = OrigoLogger.getLoggerFactory().getLogger(MobileKeysApiConfig.class.getSimpleName());

    private void configureOrigoMobileKeysApi(TransactionCompleteCallback callback) {
        try {

            OrigoApiConfiguration origoApiConfiguration = new OrigoApiConfiguration.Builder()
                    .setApplicationId(BuildConfig.AAMK_APP_ID)
                    .setApplicationDescription(BuildConfig.AAMK_APP_ID_DESCRIPTION)
                    .setNfcParameters(new OrigoNfcConfiguration.Builder()
                            .unsafeSetAttemptNfcWithScreenOff(true)
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
                            LOGGER.debug("handleMobileKeysTransactionCompleted");
                            callback.onCompleted(INITIALIZATION_SUCCESS);
                            registerEventListeners();
                        }

                        public void handleMobileKeysTransactionFailed(OrigoMobileKeysException mobileKeysException) {
                            LOGGER.error("handleMobileKeysTransactionFailed failed: " + mobileKeysException.getErrorCode(), mobileKeysException);
                            callback.onCompleted(mobileKeysException.getMessage());
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
        // LOGGER.debug("onReaderConnectionOpened: " + origoReader, origoOpeningType);
    }

    @Override
    public void onReaderConnectionClosed(OrigoReader origoReader, OrigoOpeningResult origoOpeningResult) {
        // LOGGER.debug("onReaderConnectionClosed: " + origoReader, origoOpeningResult);
    }

    @Override
    public void onReaderConnectionFailed(OrigoReader origoReader, OrigoOpeningType origoOpeningType, OrigoOpeningStatus origoOpeningStatus) {
        LOGGER.error("onReaderConnectionFailed failed: " + origoReader.getName() + " reader: " + origoOpeningType.name() + " status: " + origoOpeningStatus);
    }

    @Override
    public void onHceSessionOpened() {
       // LOGGER.debug("onHceSessionOpened");
    }

    @Override
    public void onHceSessionClosed(int i) {
       // LOGGER.debug("onHceSessionClosed");
    }

    @Override
    public void onHceSessionInfo(OrigoReaderConnectionInfoType origoReaderConnectionInfoType) {
       // LOGGER.debug("onHceSessionInfo: " + origoReaderConnectionInfoType);
    }
}
