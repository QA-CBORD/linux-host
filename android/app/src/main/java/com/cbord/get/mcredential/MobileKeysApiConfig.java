package com.cbord.get.mcredential;

import android.app.Application;
import android.content.Context;
import android.util.Log;

import com.cbord.get.BuildConfig;
import com.hid.origo.OrigoKeysApiFactory;
import com.hid.origo.api.OrigoApiConfiguration;
import com.hid.origo.api.OrigoMobileKeys;
import com.hid.origo.api.OrigoMobileKeysApi;
import com.hid.origo.api.OrigoReaderConnectionController;
import com.hid.origo.api.ble.OrigoOpeningTrigger;
import com.hid.origo.api.ble.OrigoScanConfiguration;
import com.hid.origo.api.ble.OrigoTapOpeningTrigger;
import com.hid.origo.api.hce.OrigoAttemptNfcPredicate;
import com.hid.origo.api.hce.OrigoNfcConfiguration;

/**
 * Application class handling the initialization of the Mobile Keys API
 */
public class MobileKeysApiConfig extends Application {
    private OrigoMobileKeysApi mobileKeysApi;

    private static final int LOCK_SERVICE_CODE = 2; // default
    private static final int TRANSACTIONS_BACKOFF = 2000; // default
    private static final String APPLICATION_ID = "com.cbord.get";
    private static final byte TRANSACTIONS = 1; // default

    private void configure() throws IllegalStateException{
        OrigoApiConfiguration origoApiConfiguration = new OrigoApiConfiguration.Builder()
                .setApplicationId(BuildConfig.AAMK_APP_ID)
                .setApplicationDescription(BuildConfig.AAMK_APP_ID_DESCRIPTION)
                .setNfcParameters(new OrigoNfcConfiguration.Builder()
                        .unsafe_setAttemptNfcWithScreenOff(true)
                        .setNumberOfNfcTransactionsNeeded(TRANSACTIONS)
                        .setTransactionBackOff(TRANSACTIONS_BACKOFF)
                        .build())
                .build();
        OrigoScanConfiguration origoScanConfiguration = new OrigoScanConfiguration.Builder(
                new OrigoOpeningTrigger[] { new OrigoTapOpeningTrigger(this)
                }, LOCK_SERVICE_CODE)
                .setAllowBackgroundScanning(true)
                .build();
        mobileKeysApi = OrigoMobileKeysApi.getInstance();
        mobileKeysApi.initialize(this, origoApiConfiguration, origoScanConfiguration, APPLICATION_ID);
    }

    public OrigoMobileKeysApi configureMobileKeysApi() throws IllegalStateException{
        if(this.mobileKeysApi == null){
            this.configure();
        }
        return this.mobileKeysApi;
    }

}
