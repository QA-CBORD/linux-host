package com.cbord.get;

import android.content.Context;
import android.util.Log;

import com.getcapacitor.NativePlugin;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;

@NativePlugin()
public class HIDPlugin extends Plugin {

    protected static Context context;
    private OrigoConfig setup;
    private OrigoStartup startup;
    public static String invitationCode;

    @PluginMethod()
    public void initializeOrigo(PluginCall call) {
        Log.d("TAG", "initializeOrigo method was called.");
        if (setup == null) {
            setup = new OrigoConfig(context);
            setup.initializeOrigo();
            call.resolve();
        } else {
            Log.d("TAG", "initializeOrigo method was called before.");
        }
        // TODO: Handle invitation code from Ionic
    }

    @PluginMethod()
    public void startupOrigo(PluginCall call) {
        Log.d("TAG", "startupOrigo method was called.");
        if (setup == null) {
            call.reject("initializeOrigo() needs to be called.");
            return;
        }
        if (startup == null) {
            startup = new OrigoStartup(context, setup);
        }
        HIDPlugin.invitationCode = call.getString("token");
        startup.mobileKeysStartup();
        call.resolve();
    }
}
