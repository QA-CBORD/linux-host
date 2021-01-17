package com.cbord.get.mcredential;

import android.app.Application;
import android.util.Log;

import com.cbord.get.BuildConfig;
import com.hid.origo.api.OrigoApiConfiguration;
import com.hid.origo.api.OrigoMobileKeysApi;
import com.hid.origo.api.ble.OrigoOpeningTrigger;
import com.hid.origo.api.ble.OrigoScanConfiguration;
import com.hid.origo.api.ble.OrigoTapOpeningTrigger;
import com.hid.origo.api.hce.OrigoNfcConfiguration;

/**
 * Application class handling the initialization of the Mobile Keys API
 */
public class MobileKeysApiConfig extends Application {
    private OrigoMobileKeysApi mobileKeysApi;
    private static final String TAG = MobileKeysApiConfig.class.getName();
    private static final int LOCK_SERVICE_CODE = 2;
    private static final int TRANSACTIONS_BACKOFF = 2000;
    private static final String APPLICATION_ID = "com.cbord.get";
    private static final byte TRANSACTIONS = 2;

    private void configure(){
        try {
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
                    new OrigoOpeningTrigger[]{new OrigoTapOpeningTrigger(this)
                    }, LOCK_SERVICE_CODE)
                    .setAllowBackgroundScanning(true)
                    .build();
            mobileKeysApi = OrigoMobileKeysApi.getInstance();
            if(Boolean.FALSE.equals(mobileKeysApi.isInitialized())) {
                mobileKeysApi.initialize(this, origoApiConfiguration, origoScanConfiguration, APPLICATION_ID);
            }
          } catch (IllegalStateException ex){
            Log.d(TAG, ex.getMessage());
        }
    }

    public OrigoMobileKeysApi configureMobileKeysApi(){
        if(this.mobileKeysApi == null){
            this.configure();
        }
        return this.mobileKeysApi;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        configureMobileKeysApi();
    }
}
