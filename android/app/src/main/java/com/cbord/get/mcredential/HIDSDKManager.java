package com.cbord.get.mcredential;

import android.Manifest;
import android.app.Application;
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
import com.hid.origo.api.ble.OrigoScanConfiguration;
import com.hid.origo.api.hce.OrigoHceConnectionCallback;
import com.hid.origo.api.hce.OrigoHceConnectionListener;

import java.util.List;

public class HIDSDKManager implements OrigoKeysApiFacade, OrigoMobileKeysProgressCallback, OrigoMobileKeysCallback, OrigoReaderConnectionListener, OrigoHceConnectionListener {

    private static final String TAG = HIDSDKManager.class.getSimpleName();
    private static final String TRANSACTION_SUCCESS_FULL = "TRANSACTION_SUCCESS";
    public  static  String TRANSACTION_RESULT = TRANSACTION_SUCCESS_FULL;
    private final String NO_KEY_INSTALLED = "NO_KEY_INSTALLED";
    private final String MOBILE_KEY_ALREADY_INSTALLED = "KEY_ALREADY_INSTALLED";
    private final String MOBILE_KEY_INSTALLED_ON_THIS_DEVICE = "MOBILE_KEY_INSTALLED_ON_THIS_DEVICE";
    private OrigoMobileKeys mobileKeys;
    private OrigoKeysApiFactory mobileKeysApiFactory;
    private MobileKeyEndpointSetup endpointSetup;
    private OrigoMobileKeyStartup mobileKeyStartup;
    private static HIDSDKManager instance;
    private Context applicationContext;
    private HIDSDKManager(Application application){
        onInit(application);
    }

    synchronized public static HIDSDKManager getInstance(final Application application){
        if(instance == null)
        {
            instance = new HIDSDKManager(application);
        }
        TRANSACTION_RESULT = TRANSACTION_SUCCESS_FULL;
        return instance;
    }


    private void onInit(final Application application){
        Log.d(TAG, "initializing HIDSDKManager");
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


    public void onApplicationStarted(){
        Log.d(TAG, "HIDSDKManager onApplicationStarted()");
        this.mobileKeyStartup.applicationStarted();
    }


    public void deleteCredential()
    {
        if(isEndpointSetUpComplete())
        {
            mobileKeys.unregisterEndpoint(this);
        }else{
            TRANSACTION_RESULT = NO_KEY_INSTALLED;
        }
    }


    public OrigoMobileKey getCurrentEndpoint()
    {
        List<OrigoMobileKey> installedKeys = null;
        try{
            Log.d(TAG, "GOING TO UPDATE ENDPOINT");
            updateEndpoint();
           installedKeys = mobileKeys.listMobileKeys();
           Log.d(TAG, String.valueOf(installedKeys.size()));
            TRANSACTION_RESULT = MOBILE_KEY_INSTALLED_ON_THIS_DEVICE;
        }catch(OrigoMobileKeysException ex){
            Log.d(TAG, "Failed to load any mobile key");
            TRANSACTION_RESULT = NO_KEY_INSTALLED;
            return null;
        }

        if( installedKeys.size() > 0)
        {
            return installedKeys.get(0);
        }
        return null;
    }


    /**
     * Update mobile keys api
     */
    private void updateEndpoint() {
        if(isEndpointSetUpComplete()){
            getMobileKeys().endpointUpdate(this);
        }
    }


    public void doHidCredentialFirstInstall(final String invitationCode){
        try{
            if(Boolean.FALSE.equals(mobileKeys.isEndpointSetupComplete())){
                // call back ionic to tell it everything is setup.
                Log.d(TAG, "isEndpointSetupComplete(): TRUE");
                endpointSetup.doSetup(invitationCode);
            }else{
              TRANSACTION_RESULT = MOBILE_KEY_ALREADY_INSTALLED;
            }
        }catch(OrigoMobileKeysException exception) {
            exception.printStackTrace();
        }
    }

    @Override
    public void onStartUpComplete() {
        Log.d(TAG, "onStartUpComplete()");
        if(isEndpointSetUpComplete()){
            updateEndpoint();
            startScanning();
          } else {
            stopScanning();
        }
        TRANSACTION_RESULT = TRANSACTION_SUCCESS_FULL;
    }


    @Override
    public void onEndpointSetUpComplete() {
        TRANSACTION_RESULT = TRANSACTION_SUCCESS_FULL;
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
        TRANSACTION_RESULT = TRANSACTION_SUCCESS_FULL;
    }

    @Override
    public void handleMobileKeysTransactionFailed(OrigoMobileKeysException e) {
        TRANSACTION_RESULT = e.getErrorCode().toString();
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
        } else {
            Log.e(TAG, "You have no location permisison");
        }
    }

    @Override
    public void handleMobileKeysTransactionProgress(OrigoProgressEvent origoProgressEvent) {
        Log.d(TAG, "handleMobileKeysTransactionProgress: " + origoProgressEvent.progressType());
    }
}
