package com.cbord.get;

import android.content.Context;

import com.hid.origo.OrigoKeysApiFactory;
import com.hid.origo.api.OrigoApiConfiguration;
import com.hid.origo.api.OrigoMobileKeys;
import com.hid.origo.api.OrigoMobileKeysApi;
import com.hid.origo.api.OrigoReaderConnectionController;
import com.hid.origo.api.ble.OrigoOpeningTrigger;
import com.hid.origo.api.ble.OrigoScanConfiguration;
import com.hid.origo.api.ble.OrigoTapOpeningTrigger;
import com.hid.origo.api.hce.OrigoNfcConfiguration;

public class OrigoConfig implements OrigoKeysApiFactory {

    private final int LOCK_SERVICE_CODE = 2, TRANSACTIONS_BACKOFF = 2000;
    private final String APPLICATION_ID = "A0000004400001010001"; // TODO: "This is the real aid" - seos_hce_service.xml
    private final byte TRANSACTIONS = 2;
    private OrigoMobileKeysApi mobileKeysFactory;
    private Context context;

    public OrigoConfig(Context context) {
        this.context = context;
    }

    void initializeOrigo() {
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
                new OrigoOpeningTrigger[] { new OrigoTapOpeningTrigger(this.context)
                }, LOCK_SERVICE_CODE)
                .setAllowBackgroundScanning(true)
                .build();

        mobileKeysFactory = OrigoMobileKeysApi.getInstance();
        mobileKeysFactory.initialize(this.context, origoApiConfiguration, origoScanConfiguration, APPLICATION_ID);
        if (!mobileKeysFactory.isInitialized()) {
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
