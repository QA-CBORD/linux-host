package com.cbord.get;
import android.util.Log;

import com.getcapacitor.NativePlugin;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.hid.origo.OrigoKeysApiFactory;
import com.hid.origo.api.OrigoMobileKeys;
import com.hid.origo.api.OrigoReaderConnectionController;
import com.hid.origo.api.ble.OrigoScanConfiguration;

@NativePlugin()
public class HIDPlugin extends Plugin implements OrigoKeysApiFactory {

    @PluginMethod()
    public void initializeOrigo(PluginCall call) {
        Log.d("TAG", "initializeOrigo method was called.");
    }

    @Override
    public OrigoMobileKeys getMobileKeys() {
        return null;
    }

    @Override
    public OrigoReaderConnectionController getReaderConnectionController() {
        return null;
    }

    @Override
    public OrigoScanConfiguration getOrigoScanConfiguration() {
        return null;
    }
}
