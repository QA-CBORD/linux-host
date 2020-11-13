package com.cbord.get.mcredential;

import android.Manifest;
import android.app.Application;
import android.content.Context;
import android.content.pm.PackageManager;
import android.util.Log;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.content.ContextCompat;

import com.hid.origo.OrigoKeysApiFactory;
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

import java.util.List;

public class HIDSDKManager implements OrigoReaderConnectionListener, OrigoHceConnectionListener {
    private static final String TAG = HIDSDKManager.class.getSimpleName();
    private static final String TRANSACTION_SUCCESS_FULL = "TRANSACTION_SUCCESS";
    private final String NO_KEY_INSTALLED = "NO_KEY_INSTALLED";
    private final String MOBILE_KEY_ALREADY_INSTALLED = "KEY_ALREADY_INSTALLED";
    private OrigoMobileKeys mobileKeys;
    private OrigoKeysApiFactory mobileKeysApiFactory;
    private static HIDSDKManager instance;
    private Context applicationContext;


    private HIDSDKManager(Application application){
        onInit(application);
    }

    synchronized public static HIDSDKManager getInstance(AppCompatActivity activity){
        if(instance == null)
        {
            instance = new HIDSDKManager(activity.getApplication());
        }
        return instance;
    }


    private void onInit(final Application application){
        this.applicationContext = application.getApplicationContext();
        this.mobileKeysApiFactory = (OrigoKeysApiFactory) application;
        this.mobileKeys = mobileKeysApiFactory.getMobileKeys();
        OrigoReaderConnectionCallback readerConnectionCallback = new OrigoReaderConnectionCallback(application.getApplicationContext());
        readerConnectionCallback.registerReceiver(this);
        OrigoHceConnectionCallback hceConnectionCallback = new OrigoHceConnectionCallback(application.getApplicationContext());
        hceConnectionCallback.registerReceiver(this);
    }

    public void onApplicationStarted(TransactionCompleteCallback transactionCompleteCallback){
        mobileKeys.applicationStartup(new TransactionCompleteCallbackWrapper(transactionCompleteCallback));
    }


    public void deleteCredential(TransactionCompleteCallback transactionCompleteCallback)
    {
        if(isEndpointSetUpComplete())
        {
            this.stopScanning();
            mobileKeys.unregisterEndpoint(new TransactionCompleteCallbackWrapper(transactionCompleteCallback));
        }else{
            transactionCompleteCallback.onCompleted(NO_KEY_INSTALLED);
        }
    }


    public void getCurrentEndpoint(TransactionCompleteCallback transactionCompleteCallback)
    {
        List<OrigoMobileKey> installedKeys = null;
        try{
             if(isEndpointSetUpComplete()){
                 updateEndpoint();
                 installedKeys = mobileKeys.listMobileKeys();
                 OrigoMobileKey key = installedKeys.size() > 0 ? installedKeys.get(0) : null;
                 transactionCompleteCallback.onCompleted(key);
             }
        }catch(OrigoMobileKeysException ex){
            transactionCompleteCallback.onCompleted(NO_KEY_INSTALLED);
        }
    }


    /**
     * Update mobile keys api
     */
    private void updateEndpoint() {
            mobileKeys.endpointUpdate(new OrigoMobileKeysProgressCallback() {
                @Override
                public void handleMobileKeysTransactionProgress(OrigoProgressEvent origoProgressEvent) {}

                @Override
                public void handleMobileKeysTransactionCompleted() {}

                @Override
                public void handleMobileKeysTransactionFailed(OrigoMobileKeysException e) {}
            });
    }


    public void doHidCredentialFirstInstall(final String invitationCode, TransactionCompleteCallback transactionCompleteCallback){
        if(isEndpointSetUpComplete()){
            transactionCompleteCallback.onCompleted(MOBILE_KEY_ALREADY_INSTALLED);
        }else{
               Log.d(TAG, "Endpoint setup started with invitationCode: " + invitationCode);
               mobileKeys.endpointSetup(new TransactionCompleteCallbackWrapper(transactionCompleteCallback), invitationCode);
        }
    }

    private void doScanningIfSetup(){
        if(isEndpointSetUpComplete()){
            updateEndpoint();
            startScanning();
        }
    }

    public boolean isEndpointSetUpComplete() {
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
    }

    @Override
    public void onReaderConnectionClosed(OrigoReader reader, OrigoOpeningResult openingResult) {
        //Callback method when a reader session has finished.
    }

    @Override
    public void onReaderConnectionFailed(OrigoReader reader, OrigoOpeningType openingType, OrigoOpeningStatus openingStatus) {
        //Callback when a connection could not be initialized.

    }

    @Override
    public void onHceSessionOpened() {
        //Callback to the implementing service when a HCE session with a reader has been initialized.

    }

    @Override
    public void onHceSessionClosed(int var1) {
        //Callback to the implementing service when a HCE session with a reader has been closed.

    }

    @Override
    public void onHceSessionInfo(OrigoReaderConnectionInfoType readerConnectionInfoType) {
        //Callback when a potentially interesting event happens on the connection, that is not sessionOpened or sessionClosed.

    }


    private void stopScanning() {
        OrigoReaderConnectionController controller = OrigoMobileKeysApi.getInstance().getOrigiReaderConnectionController();
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
    private void startScanning() {
        if(hasLocationPermissions()) {
            OrigoReaderConnectionController controller = OrigoMobileKeysApi.getInstance().getOrigiReaderConnectionController();
            controller.enableHce();
        } else {
            // note: maybe we need to ask for permissions on the device here....
        }
    }


    private class  TransactionCompleteCallbackWrapper implements OrigoMobileKeysProgressCallback{

        private final TransactionCompleteCallback transactionCompleteCallback;

        public TransactionCompleteCallbackWrapper(TransactionCompleteCallback transactionCompleteCallback){
            this.transactionCompleteCallback = transactionCompleteCallback;
        }

        @Override
        public void handleMobileKeysTransactionProgress(OrigoProgressEvent origoProgressEvent) {}

        @Override
        public void handleMobileKeysTransactionCompleted() {
            transactionCompleteCallback.onCompleted(TRANSACTION_SUCCESS_FULL);
            doScanningIfSetup();
        }

        @Override
        public void handleMobileKeysTransactionFailed(OrigoMobileKeysException e) {
            transactionCompleteCallback.onCompleted(e.getErrorCode().toString());
        }
    }

}

