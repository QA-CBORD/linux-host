package com.cbord.get.hidCredentials;

import android.Manifest;
import android.app.Application;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.core.content.ContextCompat;
import com.hid.origo.api.OrigoMobileKey;
import com.hid.origo.api.OrigoMobileKeys;
import com.hid.origo.api.OrigoMobileKeysApi;
import com.hid.origo.api.OrigoMobileKeysException;
import com.hid.origo.api.OrigoMobileKeysListener;
import com.hid.origo.api.OrigoMobileKeysProgressCallback;
import com.hid.origo.api.OrigoProgressEvent;
import com.hid.origo.api.OrigoReaderConnectionController;
import com.hid.origo.logger.OrigoLogger;
import com.hid.origo.provisioning.OrigoProvisioning;
import com.hid.origo.provisioning.data.response.OrigoEndpointSetupErrorResponse;
import com.hid.origo.provisioning.data.response.OrigoProvisionResponse;
import com.hid.origo.sso.listener.CreatePassRequestListener;
import com.hid.origo.sso.response.CreatePassResponse;
import com.hid.origo.wallet.listener.OrigoEndPointSetupCallback;
import com.hid.origo.wallet.listener.OrigoWalletCardStatusListener;
import com.hid.origo.wallet.listener.OrigoWalletHealthCallback;
import com.hid.origo.wallet.listener.OrigoWalletSetupCallback;

import org.slf4j.Logger;

import java.util.ArrayList;


public class HIDSDKManager {
    private static final String TAG = HIDSDKManager.class.getSimpleName();
    private static final String TRANSACTION_SUCCESS = "success";
    private static final String TRANSACTION_FAILED = "failed";
    private static final String TRANSACTION_FAILED_INVALID_KEY = "invalid key";
    private final String NO_KEY_INSTALLED = "NO_KEY_INSTALLED";
    private final String MOBILE_KEY_ALREADY_INSTALLED = "KEY_ALREADY_INSTALLED";
    private OrigoMobileKeys mobileKeys;
    private OrigoMobileKeysApi origoMobileKeysApi;
    private static HIDSDKManager instance;
    private Context applicationContext;
    private MobileKeysApiConfig mobileKeysApiConfig;

    private Logger LOGGER = OrigoLogger.getLoggerFactory().getLogger(HIDSDKManager.class.getSimpleName());

    private HIDSDKManager(Application application) throws IllegalStateException {
        initializeMobileKeysApi(application);
    }

    private HIDSDKManager(Application application, TransactionCompleteCallback cb) throws IllegalStateException {
        initializeMobileKeysApi(application, cb);
    }

    synchronized public static HIDSDKManager getInstance(Application application) throws IllegalStateException {
        if (instance == null)
            instance = new HIDSDKManager(application);
        return instance;
    }

    synchronized public static HIDSDKManager getInstance(Application application, TransactionCompleteCallback cb) throws IllegalStateException {
        if (instance == null) {
            instance = new HIDSDKManager(application, cb);
        }
        return instance;
    }

    public String getEndpointLastServerSync() {
        try {
            return this.mobileKeys.getEndpointInfo().getLastServerSyncDate().toString();
        } catch (Exception e) {
            LOGGER.error("getEndpointLastServerSync failed: " + e.getMessage(), e);
        }
        return null;
    }

    private void initializeMobileKeysApi(final Application application) throws IllegalStateException {
        initializeMobileKeysApi(application, null);
    }

    private void initializeMobileKeysApi(final Application application, TransactionCompleteCallback transactionCompleteCallback) throws IllegalStateException {
        this.applicationContext = application.getApplicationContext();
        mobileKeysApiConfig = ((MobileKeysApiConfig) application);
        mobileKeysApiConfig.initializeMobileKeysApi(transactionResult -> {
            if (transactionCompleteCallback != null)
                transactionCompleteCallback.onCompleted(transactionResult);
            if (TRANSACTION_SUCCESS.equals(transactionResult)) {
                origoMobileKeysApi = mobileKeysApiConfig.getMobileKeysApi();
                mobileKeys = OrigoMobileKeysApi.getInstance().getMobileKeys();
            }
        });
    }

    public void deleteEndpoint(TransactionCompleteCallback transactionCompleteListener) {
        if (isEndpointSetup()) {
            mobileKeys.unregisterEndpoint(new HIDTransactionProgressObserver(transactionResult -> {
                transactionCompleteListener.onCompleted(transactionResult);
                if (transactionResult == TRANSACTION_SUCCESS) {
                    origoMobileKeysApi.handleKeyRevokeEvent();
                }
            }));
        } else {
            transactionCompleteListener.onCompleted(NO_KEY_INSTALLED);
        }
    }

    public boolean hasWalletCards() {
        return mobileKeys == null ? false : mobileKeys.listActiveGoogleWalletCards().size() > 0;
    }

    public boolean isEndpointActive() {
        OrigoMobileKey mobileKey = getMobileKey();
        return mobileKey == null ? false : mobileKey.isActivated();
    }


    private OrigoMobileKey getMobileKey() {
        OrigoMobileKey mKey = null;
        try {
            mKey = mobileKeys.listMobileKeys().get(0);
        } catch (OrigoMobileKeysException ex) {
            LOGGER.error("Error on listMobileKeys: " + ex.getCauseMessage());
        } catch (Exception e) {
        }
        return mKey;
    }


    public void refreshEndpoint(TransactionCompleteCallback callback) {
        try {
            mobileKeys.endpointUpdate(new HIDTransactionProgressObserver(callback));
        } catch (Error error) {
            LOGGER.error("Error on refreshingEndpoint: " + error);
        }
    }


    public void doHidCredentialFirstInstall(boolean forceInstall, final String invitationCode, TransactionCompleteCallback txCb) {

        if (invitationCode == null) {
            txCb.onCompleted(TRANSACTION_FAILED_INVALID_KEY);
            return;
        }

        try {
            if (isEndpointActive()) {
                if (forceInstall) {
                    deleteEndpoint((r) -> mobileKeys.endpointSetup(new HIDEndpointSetupCallback(txCb), invitationCode));
                } else {
                    txCb.onCompleted(MOBILE_KEY_ALREADY_INSTALLED);
                }
            } else {
                if (isEndpointSetup()) {
                    deleteEndpoint((r) -> mobileKeys.endpointSetup(new HIDEndpointSetupCallback(txCb), invitationCode));
                } else {
                    mobileKeys.endpointSetup(new HIDEndpointSetupCallback(txCb), invitationCode);
                }
            }
        } catch (Exception any) {
            txCb.onCompleted(TRANSACTION_FAILED);
        }
    }

    public boolean isEndpointSetup() {
        boolean isEndpointSetup = false;
        try {
            isEndpointSetup = mobileKeys.isEndpointSetupComplete();
        } catch (OrigoMobileKeysException e) {
            LOGGER.error("Error on isEndpointSetup: " + e.getMessage(), e);
        }
        return isEndpointSetup;
    }

    /**
     * Check if app has location permission
     *
     * @return
     */
    private boolean hasLocationPermissions() {
        return (ContextCompat.checkSelfPermission(applicationContext,
                Manifest.permission.ACCESS_COARSE_LOCATION) == PackageManager.PERMISSION_GRANTED ||
                ContextCompat.checkSelfPermission(applicationContext,
                        Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED);
    }


    /**
     * Start Hce scanning or request permission
     */
    public void startScanning(TransactionCompleteCallback transactionCompleteCallback) {
        try {
            OrigoReaderConnectionController controller = origoMobileKeysApi.getOrigiReaderConnectionController();
            controller.enableHce();
            transactionCompleteCallback.onCompleted(TRANSACTION_SUCCESS);
        } catch (Exception exception) {
            LOGGER.error("Error on startScanning: " + exception.getMessage());
            transactionCompleteCallback.onCompleted(TRANSACTION_FAILED);
        }
    }

    private class HIDTransactionProgressObserver implements OrigoMobileKeysProgressCallback {

        private final TransactionCompleteCallback transactionCompleteListener;

        public HIDTransactionProgressObserver(TransactionCompleteCallback callback) {
            this.transactionCompleteListener = callback;
        }

        @Override
        public void handleMobileKeysTransactionProgress(OrigoProgressEvent origoProgressEvent) {
            LOGGER.debug("handleMobileKeysTransactionProgress: " + origoProgressEvent);
        }

        @Override
        public void handleMobileKeysTransactionCompleted() {
            transactionCompleteListener.onCompleted(TRANSACTION_SUCCESS);
        }

        @Override
        public void handleMobileKeysTransactionFailed(OrigoMobileKeysException e) {
            transactionCompleteListener.onCompleted(e.getErrorCode().toString());
        }
    }

    private class HIDEndpointSetupCallback implements OrigoEndPointSetupCallback, OrigoWalletSetupCallback, OrigoWalletHealthCallback, OrigoWalletCardStatusListener, OrigoMobileKeysListener, CreatePassRequestListener {

        private final TransactionCompleteCallback transactionCompleteListener;

        public HIDEndpointSetupCallback(TransactionCompleteCallback callback) {
            this.transactionCompleteListener = callback;
            mobileKeys.addListener(this);
            mobileKeys.addWalletCardStatusListener(this);
        }

        @Override
        public void onWalletSetupReady() {
            mobileKeys.walletHealthCheck(this);
        }

        @Override
        public void onRedeemSetupFailed(@NonNull OrigoEndpointSetupErrorResponse origoEndpointSetupErrorResponse) {
            transactionCompleteListener.onCompleted(origoEndpointSetupErrorResponse.getStatus());
            System.out.println("onRedeemSetupFailed: " + origoEndpointSetupErrorResponse.getStatus());
        }

        @Override
        public void handleMobileKeysTransactionCompleted() {
            transactionCompleteListener.onCompleted(TRANSACTION_SUCCESS);
            System.out.println("handleMobileKeysTransactionCompleted: ");
        }

        @Override
        public void handleMobileKeysTransactionFailed(OrigoMobileKeysException e) {
            transactionCompleteListener.onCompleted(e.getErrorCode().toString());
            System.out.println("handleMobileKeysTransactionFailed: " + e);
        }

        @Override
        public void onWalletProvisionSuccess(OrigoProvisionResponse provisionData) {
            System.out.println("onWalletProvisionSuccess: " + provisionData.getCardStatus());
            transactionCompleteListener.onCompleted(TRANSACTION_SUCCESS);
        }

        @Override
        public void onWalletProvisionFailed(OrigoEndpointSetupErrorResponse origoEndpointSetupErrorResponse) {
            System.out.println("onWalletProvisionFailed: " + origoEndpointSetupErrorResponse.getStatus());
            transactionCompleteListener.onCompleted(origoEndpointSetupErrorResponse.getStatus());
       }

        @Override
        public void c(@NonNull OrigoEndpointSetupErrorResponse origoEndpointSetupErrorResponse, @Nullable String s) {

            System.out.println("status: "+ origoEndpointSetupErrorResponse.getStatus());
            if (origoEndpointSetupErrorResponse.getStatus().equals(OrigoProvisioning.SetupStatus.WALLET_READY_TO_USE)) {
                mobileKeys.setupGoogleWallet(this);
                System.out.println("setupGoogleWallet: " + s);
            } else {
                transactionCompleteListener.onCompleted(origoEndpointSetupErrorResponse.getStatus());
            }
        }

        @Override
        public void onWalletCardStatusChanged(ArrayList<OrigoProvisionResponse> arrayList) {
            System.out.println("onWalletCardStatusChanged: ");
        }

        @Override
        public void onMobileKeysChanged(int i) {
            System.out.println("onMobileKeysChanged: ");
        }

        @Override
        public void onCreatePassSuccess(@NonNull String s) {
            System.out.println("onCreatePassSuccess: ");
        }

        @Override
        public void onCreatePassFailed(@NonNull CreatePassResponse createPassResponse) {
            System.out.println("onCreatePassFailed: ");
        }
    }
}

