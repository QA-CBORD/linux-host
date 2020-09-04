package com.cbord.get;

import android.content.Context;
import android.util.Log;

import com.getcapacitor.NativePlugin;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;

@NativePlugin()
public class HIDPlugin extends Plugin  {

    public static Context context;
    private OrigoSetup setup;
    private OrigoStartup startup;

    @PluginMethod()
    public void initializeOrigo(PluginCall call) {
        Log.d("TAG", "initializeOrigo method was called.");
        if (setup == null) {
            setup = new OrigoSetup(this.context);
            setup.initializeOrigo();
            call.resolve();
            // TODO: resolve how to handle invitacion code from Ionic
        }
    }

    @PluginMethod()
    public void startupOrigo(PluginCall call) {
        Log.d("TAG", "startupOrigo method was called.");
        if (startup == null && this.setup != null) {
            startup = new OrigoStartup(this.context, this.setup);
            startup.mobileKeysStartup();
            call.resolve();
        }
    }
}
