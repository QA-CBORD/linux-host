package com.cbord.get.mcredential;

import android.Manifest;
import android.app.Application;
import android.app.Notification;
import android.content.Context;
import android.content.pm.PackageManager;
import android.util.Log;
import androidx.core.content.ContextCompat;
import com.hid.origo.OrigoKeysApiFacade;
import com.hid.origo.OrigoKeysApiFactory;
import com.hid.origo.api.OrigoMobileKey;
import com.hid.origo.api.OrigoMobileKeys;
import com.hid.origo.api.OrigoMobileKeysApi;
import com.hid.origo.api.OrigoMobileKeysCallback;
import com.hid.origo.api.OrigoMobileKeysException;
import com.hid.origo.api.OrigoReaderConnectionController;
import com.hid.origo.api.OrigoReaderConnectionInfoType;
import com.hid.origo.api.ble.OrigoOpeningResult;
import com.hid.origo.api.ble.OrigoOpeningStatus;
import com.hid.origo.api.ble.OrigoOpeningType;
import com.hid.origo.api.ble.OrigoReader;
import com.hid.origo.api.ble.OrigoReaderConnectionCallback;
import com.hid.origo.api.ble.OrigoReaderConnectionListener;
import com.hid.origo.api.ble.OrigoScanConfiguration;
import com.hid.origo.api.hce.OrigoHceConnectionCallback;
import com.hid.origo.api.hce.OrigoHceConnectionListener;

import java.util.Collections;
import java.util.List;

public class HIDMobileCredentialSetup implements OrigoKeysApiFacade, OrigoMobileKeysCallback, OrigoReaderConnectionListener, OrigoHceConnectionListener {

    private static final String TAG = HIDMobileCredentialSetup.class.getSimpleName();

    private OrigoMobileKeys mobileKeys;
    private OrigoKeysApiFactory mobileKeysApiFactory;
    private MobileKeyEndpointSetup endpointSetup;
    private OrigoMobileKeyStartup mobileKeyStartup;
    private EndpointSetupListener pluggingListener;
    private static HIDMobileCredentialSetup instance;
    private Context applicationContext;

    private HIDMobileCredentialSetup(Application application, EndpointSetupListener listener){
        onInit(application);
        this.pluggingListener = listener;
    }

    synchronized public static HIDMobileCredentialSetup getInstance(final Application application, EndpointSetupListener listener){
        if(instance == null)
        {
            instance = new HIDMobileCredentialSetup(application, listener);
        }
        return instance;
    }

    public void startup(){
       this.mobileKeyStartup.applicationStarted();
    }

    private void onInit(final Application application){
        Log.d(TAG, "initializing HIDMobileCredentialSetup");
        this.applicationContext = application.getApplicationContext();
        this.mobileKeysApiFactory = (OrigoKeysApiFactory) application;
        this.mobileKeys = mobileKeysApiFactory.getMobileKeys();
        this.mobileKeyStartup = new OrigoMobileKeyStartup(this);
        this.endpointSetup = new MobileKeyEndpointSetup(this);
        OrigoReaderConnectionCallback readerConnectionCallback = new OrigoReaderConnectionCallback(application.getApplicationContext());
        readerConnectionCallback.registerReceiver(this);
        OrigoHceConnectionCallback hceConnectionCallback = new OrigoHceConnectionCallback(application.getApplicationContext());
        hceConnectionCallback.registerReceiver(this);
    }


    private void doInitialEndpointSetupIfNotDoneAlready(){
        try{
            if(mobileKeys.isEndpointSetupComplete()){
               // call back ionic to tell it everything is setup.
                Log.d(TAG, "isEndpointSetupComplete(): TRUE");
             }else{
                // otherwise we will try to setup the endpoint
                 this.endpointSetup.doSetup();
            }
           }catch(OrigoMobileKeysException exception){
            exception.printStackTrace();
        }
    }

    @Override
    public void onStartUpComplete() {
        //
        Log.d(TAG, "onStartUpComplete()");
        doInitialEndpointSetupIfNotDoneAlready();
    }


    @Override
    public void onEndpointSetUpComplete() {
        // we need to notify ionic of this event.
        Log.d(TAG, "onEndpointSetUpComplete()");
        this.pluggingListener.onSuccess(null);
    }

    @Override
    public void endpointNotPersonalized() {
        Log.d(TAG, "endpointNotPersonalized()");
    }

    @Override
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
    public OrigoMobileKeys getMobileKeys() {
        return mobileKeysApiFactory.getMobileKeys();
    }

    @Override
    public OrigoReaderConnectionController getReaderConnectionController() {
        return mobileKeysApiFactory.getReaderConnectionController();
    }

    @Override
    public OrigoScanConfiguration getOrigoScanConfiguration() {
        return mobileKeysApiFactory.getOrigoScanConfiguration();
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

    @Override
    public void handleMobileKeysTransactionCompleted() {
        this.pluggingListener.onSuccess(null);
    }

    @Override
    public void handleMobileKeysTransactionFailed(OrigoMobileKeysException e) {
       this.pluggingListener.onFailure(e.getErrorCode().ordinal());
    }

    private void loadKeys() {
        List<OrigoMobileKey> data = null;
            try {
                data = getMobileKeys().listMobileKeys();
                Log.d(TAG, "OrigoMobileKey SIZE: " + data.size());
                Log.d(TAG, "OrigoMobileKeys:  " + data.toString());
            } catch (OrigoMobileKeysException e) {
                Log.e(TAG, "Failed to list keys", e);
            }
            if (data == null) {
                data = Collections.emptyList();
            }

            //Update scanning based if we have keys
            if (data.isEmpty()) {
                stopScanning();
            } else {
                startScanning();
            }

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
        if (hasLocationPermissions()) {
            Log.d(TAG, "Starting BLE service and enabling HCE");
            OrigoReaderConnectionController controller = OrigoMobileKeysApi.getInstance().getOrigiReaderConnectionController();
            controller.enableHce();
            Notification notification = null;//UnlockNotification.create(applicationContext);
            controller.startForegroundScanning(null);
        } else {
           // requestLocationPermission();
        }
    }
}
