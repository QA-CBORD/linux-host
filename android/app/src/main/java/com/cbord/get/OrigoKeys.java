package com.cbord.get;

import android.Manifest;
import android.content.Context;
import android.content.pm.PackageManager;
import android.util.Log;

import androidx.core.content.ContextCompat;

import com.hid.origo.OrigoKeysApiFacade;
import com.hid.origo.api.OrigoMobileKey;
import com.hid.origo.api.OrigoMobileKeysApi;
import com.hid.origo.api.OrigoMobileKeysApiErrorCode;
import com.hid.origo.api.OrigoMobileKeysCallback;
import com.hid.origo.api.OrigoMobileKeysException;
import com.hid.origo.api.OrigoMobileKeysProgressCallback;
import com.hid.origo.api.OrigoProgressEvent;
import com.hid.origo.api.OrigoReaderConnectionController;

import java.util.Collections;
import java.util.List;

public class OrigoKeys implements OrigoMobileKeysCallback, OrigoMobileKeysProgressCallback {

    private OrigoKeysApiFacade mobileKeysApiFacade;
    private List<OrigoMobileKey> data = null;
    private Context context;

    public OrigoKeys(Context context, OrigoStartup origoStartup) {
        this.context = context;
        mobileKeysApiFacade = (OrigoKeysApiFacade) origoStartup;
    }

    public void onRegistered() {
        Log.d("TAG", "onRegistered()");
        // Listen to lock changes
        loadKeys();
        // TODO: mobileKeysApiFacade.getOrigoScanConfiguration().getRootOpeningTrigger().add(closestLockTrigger); ?
    }

    public static boolean shouldRetry(OrigoMobileKeysException exception) {
        boolean shouldRetry = false;
        switch (exception.getErrorCode()) {
            case INTERNAL_ERROR:
            case SERVER_UNREACHABLE:
            case SDK_BUSY:
                shouldRetry = true;
                break;
            case INVALID_INVITATION_CODE:
            case DEVICE_SETUP_FAILED:
            case SDK_INCOMPATIBLE:
            case DEVICE_NOT_ELIGIBLE:
            case ENDPOINT_NOT_SETUP:
            default:
                break;
        }
        return shouldRetry;
    }

    private void loadKeys() {
        try {
            data = mobileKeysApiFacade.getMobileKeys().listMobileKeys();
        } catch (OrigoMobileKeysException e) {
            Log.e("TAG", "Failed to list keys", e);
        }
        if (data == null) {
            data = Collections.emptyList();
        }
        // TODO: Check if update adapter.setItems(data);
        // Update scanning based if we have keys
        if (data.isEmpty()) {
            stopScanning();
        } else {
            startScanning();
        }
    }

    // Start BLE scanning or request permission
    private void startScanning() {
        if (hasLocationPermissions()) {
            Log.d("TAG", "Starting BLE service and enabling HCE");
            OrigoReaderConnectionController controller = OrigoMobileKeysApi.getInstance().getOrigiReaderConnectionController();
            controller.enableHce();
        }
    }

    // Stop BLE scanning or HCE
    private void stopScanning() {
        OrigoReaderConnectionController controller = OrigoMobileKeysApi.getInstance().getOrigiReaderConnectionController();
        controller.stopScanning();
    }

    // Check if app has location permission
    private boolean hasLocationPermissions() {
        return (ContextCompat.checkSelfPermission(this.context,
                Manifest.permission.NFC) == PackageManager.PERMISSION_GRANTED);
    }

    @Override
    public void handleMobileKeysTransactionProgress(OrigoProgressEvent origoProgressEvent) {
        // This method will be called to notify listeners about progress of the transaction
    }

    @Override
    public void handleMobileKeysTransactionCompleted() {
        loadKeys();
    }

    @Override
    public void handleMobileKeysTransactionFailed(OrigoMobileKeysException mobileKeysException) {
        if (shouldRetry(mobileKeysException)) {
            loadKeys();
            if (mobileKeysException.getErrorCode() == OrigoMobileKeysApiErrorCode.ENDPOINT_NOT_SETUP) {
                mobileKeysApiFacade.endpointNotPersonalized();
            }
        }
    }
}
