package com.cbord.get;

import com.cbord.get.mcredential.EndpointSetupListener;
import com.cbord.get.mcredential.HIDMobileCredentialSetup;
import com.cbord.get.mcredential.PluginErrors;
import com.getcapacitor.JSObject;
import com.getcapacitor.NativePlugin;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.hid.origo.api.OrigoMobileKeysApiErrorCode;

import org.json.JSONObject;

import java.util.List;


@NativePlugin()
public class HIDPlugin extends Plugin implements EndpointSetupListener {

    public static final String INSTALL_SUCCESS = "installation_successful";
    public static final String INSTALL_FAILURE = "installation_failure";
    public static final String STARTUP_SUCCESS = "startup_successful";
    public  static final String STARTUP_FAILURE = "startup_failure";
    public  static final String OPERATION_FAILURE = "operation_failure";
    private  static final String MESSAGE_KEY = "message";
    private  static final String ERROR_CODE_KEY = "errorCode";
    private static final String TAG = HIDPlugin.class.getName();
    private HIDMobileCredentialSetup hidMobileCredentialSetup;
    private static String invitationCode;
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
        invitationCode = call.getString("token");
        hidMobileCredentialSetup.doHidCredentialFirstInstall(invitationCode);
    }

    @PluginMethod()
    public void deleteCredential(PluginCall call){
        invitationCode = call.getString("token");
        hidMobileCredentialSetup.deleteCredential();
    }

    @PluginMethod()
    public void loadCredentialData(PluginCall call){
        Object currentKey = hidMobileCredentialSetup.getCurrentKey();
        JSObject jsonObject = new JSObject();
        jsonObject.put("mobileKeys", JSONObject.wrap(currentKey));
        call.resolve(jsonObject);
    }


    @Override
    public void onInstallationSuccess(Object someObject) {
        JSObject jsonObject = new JSObject();
        jsonObject.put(MESSAGE_KEY, INSTALL_SUCCESS);
        notifyListeners(HIDPluginEvents, jsonObject);
    }

    @Override
    public void onInstallationFailure(OrigoMobileKeysApiErrorCode errorCode) {
        JSObject jsonObject = new JSObject();
        jsonObject.put(MESSAGE_KEY, INSTALL_FAILURE);
        jsonObject.put(ERROR_CODE_KEY, errorCode);
        notifyListeners(HIDPluginEvents, jsonObject);
    }

    @Override
    public void operationFailure(PluginErrors errorCode) {
        JSObject jsonObject = new JSObject();
        jsonObject.put(MESSAGE_KEY, OPERATION_FAILURE);
        jsonObject.put(ERROR_CODE_KEY, errorCode);
        notifyListeners(HIDPluginEvents, jsonObject);
    }

    @Override
    public void onStartupSuccessful() {
        JSObject jsonObject = new JSObject();
        jsonObject.put(MESSAGE_KEY, STARTUP_SUCCESS);
        notifyListeners(HIDPluginEvents, jsonObject);
    }

    @Override
    public void onStartupFailure(OrigoMobileKeysApiErrorCode errorCode) {
        JSObject jsonObject = new JSObject();
        jsonObject.put(MESSAGE_KEY, STARTUP_FAILURE);
        jsonObject.put(ERROR_CODE_KEY, errorCode);
        notifyListeners(HIDPluginEvents, jsonObject);
    }
}
