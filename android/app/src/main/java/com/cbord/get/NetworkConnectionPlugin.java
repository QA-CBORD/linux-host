package com.cbord.get;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import java.io.IOException;

@CapacitorPlugin
public class NetworkConnectionPlugin extends Plugin {


    @PluginMethod()
    public void isDeviceOnline(PluginCall call) {
        try {
            JSObject jsonObject = new JSObject();
            jsonObject.put("isDeviceOnline", isInternetAvailable());
            call.resolve(jsonObject);
        } catch (Exception e) {
            call.reject(e.getMessage());
        }
    }

    private boolean isInternetAvailable() throws InterruptedException, IOException {
        String command = "ping -c 1 google.com";
        return Runtime.getRuntime().exec(command).waitFor() == 0;
    }
}
