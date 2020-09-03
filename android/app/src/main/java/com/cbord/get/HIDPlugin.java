package com.cbord.get;
import android.util.Log;

import com.getcapacitor.NativePlugin;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.hid.origo.OrigoKeysApiFactory;
import com.hid.origo.api.OrigoApiConfiguration;
import com.hid.origo.api.OrigoMobileKeys;
import com.hid.origo.api.OrigoMobileKeysApi;
import com.hid.origo.api.OrigoReaderConnectionController;
import com.hid.origo.api.ble.OrigoOpeningTrigger;
import com.hid.origo.api.ble.OrigoScanConfiguration;
import com.hid.origo.api.ble.OrigoSeamlessOpeningTrigger;
import com.hid.origo.api.ble.OrigoTapOpeningTrigger;
import com.hid.origo.api.ble.OrigoTwistAndGoOpeningTrigger;
import com.hid.origo.api.hce.OrigoNfcConfiguration;

@NativePlugin()
public class HIDPlugin extends Plugin  {

    @PluginMethod()
    public void initializeOrigo(PluginCall call) {
        Log.d("TAG", "initializeOrigo method was called.");
        OrigoInitializer origo = new OrigoInitializer();
        origo.initializeOrigo();
    }

    @PluginMethod()
    public void startupOrigo(PluginCall call) {
        Log.d("TAG", "startupOrigo method was called.");
    }
}
