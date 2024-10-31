package com.cbord.get.hidCredentials;

import android.Manifest;
import android.bluetooth.BluetoothAdapter;
import android.content.pm.PackageManager;
import android.nfc.NfcAdapter;
import androidx.core.content.ContextCompat;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "MobileCredentialStatusPlugin")
public class MobileCredentialStatusPlugin extends Plugin {

    private final String DEVICE_STATE = "deviceState";
    private final String HID_CREDENTIAL_TYPE = "HID";
    private final String CREDENTIAL_TYPE = "credentialType";

    @PluginMethod()
    public void deviceNativeState(PluginCall call){
        String mobileCredentialType = call.getString(CREDENTIAL_TYPE);
        DeviceState device = new DeviceState();
        try{
            NfcAdapter nfcAdapter = NfcAdapter.getDefaultAdapter(getContext());
            device.nfcSupported = nfcAdapter != null;
            device.nfcOn = device.nfcSupported && nfcAdapter.isEnabled();
            device.nfcPermissionGranted = device.nfcOn;
            BluetoothAdapter mBluetoothAdapter = BluetoothAdapter.getDefaultAdapter();
            device.bluetoothSupported = mBluetoothAdapter != null;
            device.bluetoothOn = device.bluetoothSupported && mBluetoothAdapter.isEnabled();
            device.hasLocationPermission = hasLocationPermissions();
            if(HID_CREDENTIAL_TYPE.equals(mobileCredentialType))
                device.lastServerSync = HIDSDKManager.getInstance(getActivity().getApplication()).getEndpointLastServerSync();
        } catch(Exception ex){}


        JSObject json = new JSObject();
        json.put("hasLocationPermission" , device.hasLocationPermission);
        json.put("bluetoothSupported", device.bluetoothSupported);
        json.put("bluetoothOn", device.bluetoothOn);
        json.put("nfcSupported", device.nfcSupported);
        json.put("nfcOn", device.nfcOn);
        json.put("nfcPermissionGranted", device.nfcPermissionGranted);
        json.put("lastServerSync", device.lastServerSync);
        call.resolve(new JSObject().put(DEVICE_STATE, json));
    }


    private boolean hasLocationPermissions() {
        return (ContextCompat.checkSelfPermission(getContext(),
                Manifest.permission.ACCESS_COARSE_LOCATION) == PackageManager.PERMISSION_GRANTED ||
                ContextCompat.checkSelfPermission(getContext(),
                        Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED);
    }
}


class DeviceState {
    boolean hasLocationPermission;
    boolean bluetoothSupported;
    boolean bluetoothOn;
    boolean nfcSupported;
    boolean nfcOn;
    boolean nfcPermissionGranted;
    String lastServerSync;
}