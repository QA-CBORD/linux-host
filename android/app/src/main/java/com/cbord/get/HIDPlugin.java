package com.cbord.get;

import android.app.Application;

import com.cbord.get.mcredential.HIDSDKManager;
import com.getcapacitor.JSObject;
import com.getcapacitor.NativePlugin;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;

@NativePlugin()
public class HIDPlugin extends Plugin {

    private HIDSDKManager hidsdkManager;
    private static final String HID_SDK_TRANSACTION_RESULT = "transactionStatus";
    private static  final String invitationCodeKey = "invitationCode";
    private static  final String FORCE_INSTALL = "forceInstall";
    private static boolean HID_SDK_INITIALIZED = false;
 
    @PluginMethod()
    public void initializeSdk(PluginCall call) {
        try{

            if(this.HID_SDK_INITIALIZED)
            {
                call.resolve(toJson("success"));
                return;
            }

            Application application = getActivity().getApplication();
            hidsdkManager = HIDSDKManager.getInstance(application, transactionResult -> {
                this.HID_SDK_INITIALIZED = true;
                call.resolve(toJson(transactionResult));
            });
        } catch (Exception  ex) {
            call.reject(ex.getMessage());
        }
    }

    @PluginMethod()
    public void setupEndpoint(PluginCall call){
        String invitationCode = call.getString(invitationCodeKey);
        boolean forceInstall = call.getBoolean(FORCE_INSTALL);
        hidsdkManager.doHidCredentialFirstInstall(forceInstall, invitationCode, (transactionResult) -> {
            call.resolve(toJson(transactionResult));
        });
    }

    @PluginMethod
    public void refreshEndpoint(PluginCall call){
       hidsdkManager.refreshEndpoint(transactionResult -> {
            call.resolve(toJson(transactionResult));
        });
    }

    @PluginMethod
    public void startScanning(PluginCall call){
        hidsdkManager.startScanning(transactionResult -> {
            call.resolve(toJson(transactionResult));
        });
    }

    @PluginMethod()
    public void deleteEndpoint(PluginCall call){
        hidsdkManager.deleteEndpoint(transactionResult -> {
            call.resolve(toJson((transactionResult)));
        });
    }

    @PluginMethod
    public void isEndpointSetup(PluginCall call){
        call.resolve(toJson(hidsdkManager.isEndpointSetup()));
    }

    @PluginMethod
    public void isEndpointActive(PluginCall call){
        call.resolve(toJson(hidsdkManager.isEndpointActive()));
    }

    private JSObject toJson(Object transactionResult){
        JSObject jsonObject = new JSObject();
        jsonObject.put(HID_SDK_TRANSACTION_RESULT, transactionResult);
        return jsonObject;
    }

}
