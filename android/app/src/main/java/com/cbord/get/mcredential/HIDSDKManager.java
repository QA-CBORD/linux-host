package com.cbord.get.mcredential;

import android.Manifest;
import android.app.Application;
import android.content.Context;
import android.content.pm.PackageManager;
import android.util.Log;

import androidx.appcompat.app.AppCompatActivity;
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

import java.util.function.Supplier;

public class HIDSDKManager implements OrigoReaderConnectionListener, OrigoHceConnectionListener {
    private static final String TAG = HIDSDKManager.class.getSimpleName();
    private static final String TRANSACTION_SUCCESS = "success";
    private static final String TRANSACTION_FAILED = "failed";
    private static final String ENDPOINT_NOT_SETUP = "ENDPOINT_NOT_SETUP";
    private final String NO_KEY_INSTALLED = "NO_KEY_INSTALLED";
    private final String MOBILE_KEY_ALREADY_INSTALLED = "KEY_ALREADY_INSTALLED";
    private final String LOCATION_PERMISSION_REQUIRED = "LOCATION_PERMISSION_REQUIRED";
    private OrigoMobileKeys mobileKeys;
    private OrigoMobileKeysApi origoMobileKeysApi;
    private static HIDSDKManager instance;
    private Context applicationContext;

    private HIDSDKManager(Application application) throws IllegalStateException{
        initializeMobileKeysApi(application);
    }

    synchronized public static HIDSDKManager getInstance(AppCompatActivity activity) throws IllegalStateException{
        if(instance == null)
        {
            instance = new HIDSDKManager(activity.getApplication());
        }
        return instance;
    }


    private void initializeMobileKeysApi(final Application application) throws IllegalStateException{
        this.applicationContext = application.getApplicationContext();
        MobileKeysApiConfig mobileKeysApiConfig = ((MobileKeysApiConfig) application);
        this.origoMobileKeysApi = mobileKeysApiConfig.configureMobileKeysApi();
        this.mobileKeys = origoMobileKeysApi.getMobileKeys();
        OrigoReaderConnectionCallback readerConnectionCallback = new OrigoReaderConnectionCallback(applicationContext);
        readerConnectionCallback.registerReceiver(this);
        OrigoHceConnectionCallback hceConnectionCallback = new OrigoHceConnectionCallback(applicationContext);
        hceConnectionCallback.registerReceiver(this);
    }

    public void applicationStartup(TransactionCompleteCallback transactionCompleteCallback){
        mobileKeys.applicationStartup(new HIDTransactionProgressObserver(transactionCompleteCallback));
    }


    public void deleteEndpoint(TransactionCompleteCallback transactionCompleteListener)
    {
        if(isEndpointSetup())
        {
            stopScanning();
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

            boolean isEndpointActive = mobileKey == null ? false : mobileKey.isActivated();
            Log.d(TAG, "isEndpointActive: " + mobileKey.toString());
            return isEndpointActive;
        } catch (OrigoMobileKeysException ex){
            Log.d(TAG, ex.getErrorCode().toString());
        }
        catch (IndexOutOfBoundsException e) {
            Log.d(TAG, e.toString());
        } catch (Exception e) {}
        return false;
    }

    public void getCurrentEndpoint(TransactionCompleteCallback transactionCompleteCallback)
    {
        try{
             if(isEndpointSetup()){
                 transactionCompleteCallback.onCompleted(getMobileKey());
             } else{
                 transactionCompleteCallback.onCompleted(ENDPOINT_NOT_SETUP);
             }
        }catch(Exception ex){
            transactionCompleteCallback.onCompleted(NO_KEY_INSTALLED);
        }
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


    @Override
    public void onReaderConnectionOpened(OrigoReader reader, OrigoOpeningType openingType) {
        // Callback method when a reader session is started.
        Log.d(TAG, "onReaderConnectionOpened");
    }

    @Override
    public void onReaderConnectionClosed(OrigoReader reader, OrigoOpeningResult openingResult) {
        //Callback method when a reader session has finished.
        Log.d(TAG, "onReaderConnectionClosed");
    }

    @Override
    public void onReaderConnectionFailed(OrigoReader reader, OrigoOpeningType openingType, OrigoOpeningStatus openingStatus) {
        //Callback when a connection could not be initialized.
        Log.d(TAG, "onReaderConnectionFailed");
    }

    @Override
    public void onHceSessionOpened() {
        //Callback to the implementing service when a HCE session with a reader has been initialized.
        Log.d(TAG, "onHceSessionOpened initialized");
    }

    @Override
    public void onHceSessionClosed(int var1) {
        //Callback to the implementing service when a HCE session with a reader has been closed.
        Log.d(TAG, "onHceSessionClosed: var1 " + var1);
    }

    @Override
    public void onHceSessionInfo(OrigoReaderConnectionInfoType readerConnectionInfoType) {
        //Callback when a potentially interesting event happens on the connection, that is not sessionOpened or sessionClosed.
        Log.d(TAG, "onHceSessionInfo");
    }


    private void stopScanning() {
        OrigoReaderConnectionController controller = origoMobileKeysApi.getOrigiReaderConnectionController();
        controller.stopScanning();
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
     * Start BLE scanning or request permission
     */
    public void startScanning(TransactionCompleteCallback transactionCompleteCallback) {
        if(hasLocationPermissions()) {
           try{
               OrigoReaderConnectionController controller = origoMobileKeysApi.getOrigiReaderConnectionController();
               controller.enableHce();
               controller.startScanning();
               transactionCompleteCallback.onCompleted(TRANSACTION_SUCCESS);
           }catch (Exception exception){
               transactionCompleteCallback.onCompleted(TRANSACTION_FAILED);
           }
        } else {
            transactionCompleteCallback.onCompleted(LOCATION_PERMISSION_REQUIRED);
        }
    }


    private class HIDTransactionProgressObserver implements OrigoMobileKeysProgressCallback{

        private final TransactionCompleteCallback transactionCompleteListener;

        public HIDTransactionProgressObserver(TransactionCompleteCallback callback){
            this.transactionCompleteListener = callback;
        }

        @Override
        public void handleMobileKeysTransactionProgress(OrigoProgressEvent origoProgressEvent) {}

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

