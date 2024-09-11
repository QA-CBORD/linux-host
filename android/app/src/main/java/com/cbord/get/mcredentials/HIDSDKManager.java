package com.cbord.get.mcredentials;

import android.Manifest;
import android.app.Application;
import android.content.Context;
import android.content.pm.PackageManager;

import androidx.annotation.NonNull;
import androidx.core.content.ContextCompat;
import com.hid.origo.api.OrigoMobileKey;
import com.hid.origo.api.OrigoMobileKeys;
import com.hid.origo.api.OrigoMobileKeysApi;
import com.hid.origo.api.OrigoMobileKeysException;
import com.hid.origo.api.OrigoMobileKeysProgressCallback;
import com.hid.origo.api.OrigoProgressEvent;
import com.hid.origo.api.OrigoReaderConnectionController;
import com.hid.origo.logger.OrigoLogger;
import com.hid.origo.provisioning.data.response.OrigoEndpointSetupErrorResponse;
import com.hid.origo.provisioning.data.response.OrigoProvisionResponse;
import com.hid.origo.wallet.listener.OrigoEndPointSetupCallback;
import com.hid.origo.wallet.listener.OrigoWalletSetupCallback;

import org.slf4j.Logger;


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

    private HIDSDKManager(Application application) throws IllegalStateException{
        initializeMobileKeysApi(application);
    }

    private HIDSDKManager(Application application, TransactionCompleteCallback cb) throws IllegalStateException{
        initializeMobileKeysApi(application, cb);
    }

    synchronized public static HIDSDKManager getInstance(Application application) throws IllegalStateException{
        if(instance == null)
            instance = new HIDSDKManager(application);
        return instance;
    }

    synchronized public static HIDSDKManager getInstance(Application application, TransactionCompleteCallback cb) throws IllegalStateException{
        if(instance == null)
        {
            instance = new HIDSDKManager(application, cb);
        }
        return instance;
    }

    public String getEndpointLastServerSync(){
        try {
            return this.mobileKeys.getEndpointInfo().getLastServerSyncDate().toString();
        } catch (Exception e) {
            LOGGER.error("getEndpointLastServerSync failed: " + e.getMessage(), e);
        }
        return null;
    }

    private void initializeMobileKeysApi(final Application application) throws IllegalStateException{
       initializeMobileKeysApi(application, null);
    }

    private void initializeMobileKeysApi(final Application application, TransactionCompleteCallback transactionCompleteCallback) throws IllegalStateException{
        // LOGGER.debug("initializeMobileKeysApi");
        this.applicationContext = application.getApplicationContext();
        mobileKeysApiConfig = ((MobileKeysApiConfig) application);
        mobileKeysApiConfig.initializeMobileKeysApi(transactionResult -> {
            if(transactionCompleteCallback != null)
                transactionCompleteCallback.onCompleted(transactionResult);
            if(TRANSACTION_SUCCESS.equals(transactionResult)){
                System.out.println("initializeMobileKeysApi");
                origoMobileKeysApi = mobileKeysApiConfig.getMobileKeysApi();
                mobileKeys = OrigoMobileKeysApi.getInstance().getMobileKeys();
            }
        });
    }

    public void deleteEndpoint(TransactionCompleteCallback transactionCompleteListener) {
        if(isEndpointSetup())
        {
            mobileKeys.unregisterEndpoint(new HIDTransactionProgressObserver(transactionResult -> {
                transactionCompleteListener.onCompleted(transactionResult);
                if(transactionResult == TRANSACTION_SUCCESS){
                    origoMobileKeysApi.handleKeyRevokeEvent();
                }
            }));
        }else{
            transactionCompleteListener.onCompleted(NO_KEY_INSTALLED);
        }
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
            LOGGER.error("listMobileKeys: " + ex.getCauseMessage());
        } catch (Exception e) {
        }
        return mKey;
    }


    public void refreshEndpoint(TransactionCompleteCallback callback) {
        mobileKeys.endpointUpdate(new HIDTransactionProgressObserver(callback));
    }


    public void doHidCredentialFirstInstall(boolean forceInstall, final String invitationCode, TransactionCompleteCallback txCb){

        if (invitationCode == null) {
            txCb.onCompleted(TRANSACTION_FAILED_INVALID_KEY);
            return;
        }

        try {
            if(isEndpointActive()){
                if(forceInstall){
                    deleteEndpoint((r) -> mobileKeys.endpointSetup(new HIDEndpointSetupCallback(txCb), invitationCode));
                } else{
                    txCb.onCompleted(MOBILE_KEY_ALREADY_INSTALLED);
                }
            } else{
                if(isEndpointSetup()){
                    deleteEndpoint((r) -> mobileKeys.endpointSetup(new HIDEndpointSetupCallback(txCb), invitationCode));
                }
                else {
                    mobileKeys.endpointSetup(new HIDEndpointSetupCallback(txCb), invitationCode);
                }
            }
        }catch (Exception any){
            System.err.println("error: " + any.getMessage());
            txCb.onCompleted(TRANSACTION_FAILED);
        }
    }

    public boolean isEndpointSetup() {
        boolean isEndpointSetup = false;
        try
        {
            isEndpointSetup = mobileKeys.isEndpointSetupComplete();
        }
        catch (OrigoMobileKeysException e)
        {
            LOGGER.error("isEndpointSetup failed: " + e.getMessage(), e);
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
           try{
               OrigoReaderConnectionController controller = origoMobileKeysApi.getOrigiReaderConnectionController();
               controller.enableHce();
               transactionCompleteCallback.onCompleted(TRANSACTION_SUCCESS);
           } catch (Exception exception) {
               LOGGER.error("startScanning failed: " + exception.getMessage());
               transactionCompleteCallback.onCompleted(TRANSACTION_FAILED);
           }
    }

    private class HIDTransactionProgressObserver implements OrigoMobileKeysProgressCallback{

        private final TransactionCompleteCallback transactionCompleteListener;

        public HIDTransactionProgressObserver(TransactionCompleteCallback callback){
            this.transactionCompleteListener = callback;
        }

        @Override
        public void handleMobileKeysTransactionProgress(OrigoProgressEvent origoProgressEvent) {
            // I'm not worried about this event
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

    private class HIDEndpointSetupCallback implements OrigoEndPointSetupCallback, OrigoWalletSetupCallback {

        private final TransactionCompleteCallback transactionCompleteListener;

        public HIDEndpointSetupCallback(TransactionCompleteCallback callback){
            this.transactionCompleteListener = callback;
        }

        @Override
        public void onWalletSetupReady() {
            System.out.println("onWalletSetupReady: ");
            mobileKeys.setupGoogleWallet(this);
        }

        @Override
        public void onRedeemSetupFailed(@NonNull OrigoEndpointSetupErrorResponse origoEndpointSetupErrorResponse) {
            System.out.println("onRedeemSetupFailed: " + origoEndpointSetupErrorResponse.getStatus());
        }

        @Override
        public void handleMobileKeysTransactionCompleted() {
            System.out.println("handleMobileKeysTransactionCompleted: ");
            transactionCompleteListener.onCompleted(TRANSACTION_SUCCESS);
        }

        @Override
        public void handleMobileKeysTransactionFailed(OrigoMobileKeysException e) {
            System.out.println("handleMobileKeysTransactionFailed: " + e.getCauseMessage());
            LOGGER.error("handleMobileKeysTransactionFailed: " + e.getCauseMessage());
            transactionCompleteListener.onCompleted(e.getErrorCode().toString());
        }

        @Override
        public void onWalletProvisionSuccess(@NonNull OrigoProvisionResponse origoProvisionResponse) {

        }

        @Override
        public void onWalletProvisionFailed(@NonNull OrigoEndpointSetupErrorResponse origoEndpointSetupErrorResponse) {

        }
    }

}

