package com.cbord.get;

import com.cbord.get.mcredential.EndpointSetupListener;
import com.cbord.get.mcredential.HIDMobileCredentialSetup;
import com.cbord.get.mcredential.EventTypes;
import com.getcapacitor.JSObject;
import com.getcapacitor.NativePlugin;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.hid.origo.api.OrigoMobileKey;
import com.hid.origo.api.OrigoMobileKeysApiErrorCode;

import org.json.JSONObject;


@NativePlugin()
public class HIDPlugin extends Plugin implements EndpointSetupListener {

    private  static final String EVENT_TYPE = "eventType";
    private static final String TAG = HIDPlugin.class.getName();
    private HIDMobileCredentialSetup hidMobileCredentialSetup;
    private final static String HIDPluginEvents = "HIDPluginEvents";

    @PluginMethod()
    public void initializeOrigo(PluginCall call) {
        hidMobileCredentialSetup = HIDMobileCredentialSetup.create(
                getActivity().getApplication(), this);
        call.resolve();
    }

    @PluginMethod()
    public void startupOrigo(PluginCall call) {
        hidMobileCredentialSetup.onStart();
        call.resolve();
    }


    @PluginMethod()
    public void addCredential(PluginCall call){
        String invitationCode = call.getString("token");
        hidMobileCredentialSetup.doHidCredentialFirstInstall(invitationCode);
    }

    @PluginMethod()
    public void deleteCredential(PluginCall call){
        hidMobileCredentialSetup.deleteCredential();
    }

    @PluginMethod()
    public void loadCredentialData(PluginCall call){
        OrigoMobileKey currentKey = hidMobileCredentialSetup.getCurrentEndpoint();
        JSObject jsonObject = new JSObject();
        jsonObject.put("mobileKeys", currentKey);
        call.resolve(jsonObject);
    }


    @Override
    public void onEvent(EventTypes eventType) {
        JSObject jsonObject = new JSObject();
        jsonObject.put(EVENT_TYPE, eventType);
        notifyListeners(HIDPluginEvents, jsonObject);
    }

    @Override
    public void operationFailure(OrigoMobileKeysApiErrorCode eventType) {
        JSObject jsonObject = new JSObject();
        jsonObject.put(EVENT_TYPE, eventType);
        notifyListeners(HIDPluginEvents, jsonObject);
    }
}
