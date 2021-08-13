package com.cbord.get.mcredential;

import android.Manifest;
import android.app.Application;
import android.content.Context;
import android.content.pm.PackageManager;
import android.util.Log;
import androidx.core.content.ContextCompat;
import com.hid.origo.api.OrigoMobileKey;
import com.hid.origo.api.OrigoMobileKeys;
import com.hid.origo.api.OrigoMobileKeysApi;
import com.hid.origo.api.OrigoMobileKeysException;
import com.hid.origo.api.OrigoMobileKeysProgressCallback;
import com.hid.origo.api.OrigoProgressEvent;
import com.hid.origo.api.OrigoReaderConnectionController;
import com.hid.origo.api.OrigoReaderConnectionInfoType;
import com.hid.origo.api.ble.OrigoOpeningResult;
import com.hid.origo.api.ble.OrigoOpeningStatus;
import com.hid.origo.api.ble.OrigoOpeningType;
import com.hid.origo.api.ble.OrigoReader;
import com.hid.origo.api.ble.OrigoReaderConnectionCallback;
import com.hid.origo.api.ble.OrigoReaderConnectionListener;
import com.hid.origo.api.hce.OrigoHceConnectionCallback;
import com.hid.origo.api.hce.OrigoHceConnectionListener;

 
public class HIDSDKManager  {
    private static final String TAG = HIDSDKManager.class.getSimpleName();
    private static final String TRANSACTION_SUCCESS = "success";
    private static final String TRANSACTION_FAILED = "failed";
    private final String NO_KEY_INSTALLED = "NO_KEY_INSTALLED";
    private final String MOBILE_KEY_ALREADY_INSTALLED = "KEY_ALREADY_INSTALLED";
    private OrigoMobileKeys mobileKeys;
    private OrigoMobileKeysApi origoMobileKeysApi;
    private static HIDSDKManager instance;
    private Context applicationContext;
    private MobileKeysApiConfig mobileKeysApiConfig;


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
        } catch (Exception e) {}
        return null;
    }

    private void initializeMobileKeysApi(final Application application) throws IllegalStateException{
       initializeMobileKeysApi(application, null);
    }

    private void initializeMobileKeysApi(final Application application, TransactionCompleteCallback transactionCompleteCallback) throws IllegalStateException{
        this.applicationContext = application.getApplicationContext();
        mobileKeysApiConfig = ((MobileKeysApiConfig) application);
        mobileKeysApiConfig.initializeMobileKeysApi(transactionResult -> {
            if(transactionCompleteCallback != null)
                transactionCompleteCallback.onCompleted(transactionResult);
            if(TRANSACTION_SUCCESS.equals(transactionResult)){
                origoMobileKeysApi = mobileKeysApiConfig.getMobileKeysApi();
                mobileKeys = origoMobileKeysApi.getMobileKeys();
            }
        });
    }

    public void deleteEndpoint(TransactionCompleteCallback transactionCompleteListener) {
        if(isEndpointSetup())
        {
            mobileKeys.unregisterEndpoint(new HIDTransactionProgressObserver(transactionResult -> {
                transactionCompleteListener.onCompleted(transactionResult);
                if(transactionResult == TRANSACTION_SUCCESS){
                    origoMobileKeysApi.handleKeyRovokeEvent();
                }
            }));
        }else{
            transactionCompleteListener.onCompleted(NO_KEY_INSTALLED);
        }
    }

    public boolean isEndpointActive(){
        try {
            OrigoMobileKey mobileKey = getMobileKey();
            return mobileKey == null ? false : mobileKey.isActivated();
        } catch (Exception ex){

        }

        return false;
    }


    private OrigoMobileKey getMobileKey() throws Exception{
        OrigoMobileKey mKey = null;
        try{
            mKey = mobileKeys.listMobileKeys().get(0);
        }catch (Exception ex){
            throw ex;
        }
        return mKey;
    }


    public void refreshEndpoint(TransactionCompleteCallback callback){
        mobileKeys.endpointUpdate(new HIDTransactionProgressObserver(callback));
    }


    public void doHidCredentialFirstInstall(boolean forceInstall, final String invitationCode, TransactionCompleteCallback txCb){
        if(isEndpointActive()){
            if(forceInstall){
                deleteEndpoint((r) -> mobileKeys.endpointSetup(new HIDTransactionProgressObserver(txCb), invitationCode));
            } else{
                txCb.onCompleted(MOBILE_KEY_ALREADY_INSTALLED);
            }
         } else{
            if(isEndpointSetup()){
                deleteEndpoint((r) -> mobileKeys.endpointSetup(new HIDTransactionProgressObserver(txCb), invitationCode));
            }
            else {
                mobileKeys.endpointSetup(new HIDTransactionProgressObserver(txCb), invitationCode);
            }
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
            Log.e(TAG, "isEndpointSetUpComplete() error", e);

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
           }catch (Exception exception) {
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

}

