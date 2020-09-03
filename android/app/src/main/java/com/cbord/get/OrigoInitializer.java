package com.cbord.get;

import android.app.Application;

import com.hid.origo.OrigoKeysApiFactory;
import com.hid.origo.api.OrigoApiConfiguration;
import com.hid.origo.api.OrigoMobileKeys;
import com.hid.origo.api.OrigoMobileKeysApi;
import com.hid.origo.api.OrigoReaderConnectionController;
import com.hid.origo.api.ble.OrigoOpeningTrigger;
import com.hid.origo.api.ble.OrigoScanConfiguration;
import com.hid.origo.api.ble.OrigoSeamlessOpeningTrigger;
import com.hid.origo.api.ble.OrigoTapOpeningTrigger;
import com.hid.origo.api.ble.OrigoTwistAndGoOpeningTrigger;
import com.hid.origo.api.hce.OrigoNfcConfiguration;

public class OrigoInitializer extends Application implements OrigoKeysApiFactory {

    private static final int LOCK_SERVICE_CODE = 2;
    public static final String APPLICATION_ID = "Example";
    private static final byte TRANSACTIONS_NO = 2;
    private static final int TRANSACTIONS_BACKOFF = 2000;

    private OrigoMobileKeysApi mobileKeysFactory;

    @Override
    public OrigoMobileKeys getMobileKeys() {
        return null;
    }

    @Override
    public OrigoReaderConnectionController getReaderConnectionController() {
        return null;
    }

    @Override
    public OrigoScanConfiguration getOrigoScanConfiguration() {
        return null;
    }

    void initializeOrigo() {
        OrigoScanConfiguration origoScanConfiguration = new OrigoScanConfiguration.Builder(
                new OrigoOpeningTrigger[]{new OrigoTapOpeningTrigger(this),
                        new OrigoTwistAndGoOpeningTrigger(this),
                        new OrigoSeamlessOpeningTrigger()}, LOCK_SERVICE_CODE)
                .setAllowBackgroundScanning(true)
                .build();

        OrigoApiConfiguration origoApiConfiguration = new OrigoApiConfiguration.Builder()
                .setApplicationId(BuildConfig.AAMK_APP_ID)
                .setApplicationDescription(BuildConfig.AAMK_APP_ID_DESCRIPTION)
                .setNfcParameters(new OrigoNfcConfiguration.Builder()
                        .unsafe_setAttemptNfcWithScreenOff(true)
                        .setNumberOfNfcTransactionsNeeded(TRANSACTIONS_NO)
                        .setTransactionBackOff(TRANSACTIONS_BACKOFF)
                        .build())
                .build();

        mobileKeysFactory = OrigoMobileKeysApi.getInstance();
        mobileKeysFactory.initialize(this, origoApiConfiguration, origoScanConfiguration, APPLICATION_ID);
        if(!mobileKeysFactory.isInitialized()) {
            throw new IllegalStateException();
        }
    }
}
