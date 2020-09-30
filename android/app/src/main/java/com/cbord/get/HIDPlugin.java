package com.cbord.get;

import android.app.Application;
import android.util.Log;

import com.cbord.get.mcredential.EndpointSetupListener;
import com.cbord.get.mcredential.HIDMobileCredentialSetup;
import com.getcapacitor.JSObject;
import com.getcapacitor.NativePlugin;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;

import org.json.JSONObject;


@NativePlugin()
public class HIDPlugin extends Plugin implements EndpointSetupListener {

    private HIDMobileCredentialSetup hidMobileCredentialSetup;
    private static String invitationCode;
    private final static String hidMainEvent = "hidMainEvent";

    @PluginMethod()
    public void initializeOrigo(PluginCall call) {
        Log.d("TAG", "initializeOrigo method was called.");

        hidMobileCredentialSetup = HIDMobileCredentialSetup.getInstance(
                getActivity().getApplication(), this);
        call.resolve();
    }

    @PluginMethod()
    public void startupOrigo(PluginCall call) {
        Log.d("TAG", "startupOrigo method was called.");
        invitationCode = call.getString("token");
        hidMobileCredentialSetup.startup();
        call.resolve();
    }

    public static String getActivationCode(){
        return invitationCode;
    }


    @Override
    public void onSuccess(Object someObject) {
        JSObject jsonObject = new JSObject();
        jsonObject.put("value", "an event data from hid plugin");
        notifyListeners(hidMainEvent, jsonObject);
    }

    @Override
    public void onFailure(int errorCode) {
        JSObject jsonObject = new JSObject();
        jsonObject.put("value", "installation failed with errorCode " +  errorCode);
        notifyListeners(hidMainEvent, jsonObject);
    }
}
