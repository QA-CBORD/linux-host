package com.cbord.get;
import android.util.Log;

import com.getcapacitor.NativePlugin;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;

@NativePlugin()
public class HIDPlugin extends Plugin {

    @PluginMethod()
    public void initializeOrigo(PluginCall call) {
        Log.d("TAG", "initializeOrigo method was called.");
    }
}
