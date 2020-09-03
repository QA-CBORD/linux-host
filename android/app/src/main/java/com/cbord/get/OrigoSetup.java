package com.cbord.get;

import android.app.Application;
import android.content.Context;

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

//To do: verify if we can extends from Application
public class OrigoSetup implements OrigoKeysApiFactory {

    private static final int LOCK_SERVICE_CODE = 2;
    public static final String APPLICATION_ID = "Example"; // To do: verify if this is the correct AID
    private static final byte TRANSACTIONS_NO = 2;
    private static final int TRANSACTIONS_BACKOFF = 2000;
    private Context context;
    private OrigoMobileKeysApi mobileKeysFactory;

    public OrigoSetup(Context context) {
        this.context = context;
    }

    void initializeOrigo() {

        OrigoApiConfiguration origoApiConfiguration = new OrigoApiConfiguration.Builder()
                .setApplicationId(BuildConfig.AAMK_APP_ID)
                .setApplicationDescription(BuildConfig.AAMK_APP_ID_DESCRIPTION)
                .setNfcParameters(new OrigoNfcConfiguration.Builder()
                        .unsafe_setAttemptNfcWithScreenOff(true)
                        .setNumberOfNfcTransactionsNeeded(TRANSACTIONS_NO)
                        .setTransactionBackOff(TRANSACTIONS_BACKOFF)
                        .build())
                .build();

        OrigoScanConfiguration origoScanConfiguration = new OrigoScanConfiguration.Builder(
                new OrigoOpeningTrigger[]{new OrigoTapOpeningTrigger(this.context)  // To do: is the context needed and correct?
                       }, LOCK_SERVICE_CODE)
                .setAllowBackgroundScanning(true)
                .build();

        mobileKeysFactory = OrigoMobileKeysApi.getInstance();
        mobileKeysFactory.initialize(this.context, origoApiConfiguration, origoScanConfiguration, APPLICATION_ID);
        if(!mobileKeysFactory.isInitialized()) {
            throw new IllegalStateException();
        }
    }

    @Override
    public OrigoMobileKeys getMobileKeys() {
        return mobileKeysFactory.getMobileKeys();
    }

    @Override
    public OrigoReaderConnectionController getReaderConnectionController() {
        return mobileKeysFactory.getOrigiReaderConnectionController();
    }

    @Override
    public OrigoScanConfiguration getOrigoScanConfiguration() {
        return getReaderConnectionController().getScanConfiguration();
    }
}
