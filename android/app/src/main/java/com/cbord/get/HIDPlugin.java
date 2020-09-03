package com.cbord.get;
import android.content.Context;
import android.util.Log;

import com.getcapacitor.NativePlugin;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;

@NativePlugin()
public class HIDPlugin extends Plugin  {

    private static Context context;

    @PluginMethod()
    public void initializeOrigo(PluginCall call) {
        Log.d("TAG", "initializeOrigo method was called.");
        OrigoSetup origo = new OrigoSetup();
        origo.initializeOrigo();
        context = origo;
    }

    @PluginMethod()
    public void startupOrigo(PluginCall call) {
        Log.d("TAG", "startupOrigo method was called.");
        if (context != null) {
            OrigoStartup origo = new OrigoStartup(this.context);
            origo.mobileKeysStartup();
        }
    }
}
