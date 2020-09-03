package com.cbord.get;

import android.Manifest;
import android.content.Context;
import android.util.Log;

import com.getcapacitor.JSObject;
import com.getcapacitor.NativePlugin;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;

@NativePlugin(  permissions={
        Manifest.permission.ACCESS_NETWORK_STATE,
        Manifest.permission.INTERNET,
        Manifest.permission.NFC,
})
public class HIDPlugin extends Plugin  {

    public static Context context;
    private OrigoSetup setup;
    private OrigoStartup startup;

    @PluginMethod()
    public void initializeOrigo(PluginCall call) {
        Log.d("TAG", "initializeOrigo method was called.");
        if (this.setup == null) {
            setup = new OrigoSetup(this.context);
            setup.initializeOrigo();
            call.resolve();
        }
    }

    @PluginMethod()
    public void startupOrigo(PluginCall call) {
        Log.d("TAG", "startupOrigo method was called.");
        if (startup == null) {
            startup = new OrigoStartup(this.context, this.setup);
            startup.mobileKeysStartup();
            call.resolve();
        }
    }
}
