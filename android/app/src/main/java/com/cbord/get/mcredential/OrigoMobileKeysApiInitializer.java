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
import com.hid.origo.api.hce.OrigoNfcConfiguration;

/**
 * Application class handling the initialization of the Mobile Keys API
 */
public class OrigoMobileKeysApiInitializer extends Application {

    private final int LOCK_SERVICE_CODE = 2, TRANSACTIONS_BACKOFF = 2000;
    private final String APPLICATION_ID = "A0000004400001010001"; // TODO: "This is the real aid" - seos_hce_service.xml
    private final byte TRANSACTIONS = 2;
    private OrigoMobileKeysApi mobileKeysApi;

    public OrigoMobileKeysApiInitializer(){}

    private void initializeOrigo() {
        Log.d("OrigoMobi", "OrigoMobileKeysApiInitializer started");
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
                new OrigoOpeningTrigger[] { new OrigoTapOpeningTrigger(getApplicationContext())
                }, LOCK_SERVICE_CODE)
                .setAllowBackgroundScanning(true)
                .build();

        mobileKeysApi = OrigoMobileKeysApi.getInstance();
        mobileKeysApi.handleKeyRovokeEvent();
        mobileKeysApi.initialize(getApplicationContext(), origoApiConfiguration, origoScanConfiguration, APPLICATION_ID);
        Log.d("OrigoMobi", String.valueOf(mobileKeysApi.isInitialized()));
        if (!mobileKeysApi.isInitialized()) {
             throw new IllegalStateException();
        }
    }

    public OrigoMobileKeysApi initializeMobileKeysApi(){
        if(this.mobileKeysApi == null){
            this.initializeOrigo();
        }
        return this.mobileKeysApi;
    }

}
