package com.cbord.get;

import com.cbord.get.mcredential.HIDSDKManager;
import com.getcapacitor.JSObject;
import com.getcapacitor.NativePlugin;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.hid.origo.api.OrigoMobileKey;


@NativePlugin()
public class HIDPlugin extends Plugin {

    private HIDSDKManager hidsdkManager;
    private static final String HID_SDK_TRANSACTION_RESULT = "transactionStatus";
    private static  final String invitationCodeKey = "invitationCode";
 
    @PluginMethod()
    public void initializeSdk(PluginCall call) {
        try{
            hidsdkManager = HIDSDKManager.getInstance(getActivity());
        }catch (IllegalStateException ex) {
            call.reject("failed");
            return;
        }
        hidsdkManager.applicationStartup(transactionResult -> {
            call.resolve(toJson(transactionResult));
        });
    }

    @PluginMethod()
    public void setupEndpoint(PluginCall call){
        String invitationCode = call.getString(invitationCodeKey);
        hidsdkManager.doHidCredentialFirstInstall(invitationCode, (transactionResult) -> {
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

    @PluginMethod()
    public void getEndpointInfo(PluginCall call){
        hidsdkManager.getCurrentEndpoint((resultObject) -> {
            if(resultObject != null){
                JSObject jsonObject = new JSObject();
                if(resultObject instanceof OrigoMobileKey){
                    OrigoMobileKey origoMobileKey =  (OrigoMobileKey)resultObject;
                    jsonObject.put("isActive", origoMobileKey.isActivated());
                    jsonObject.put("startDate", origoMobileKey.getBeginDate());
                    jsonObject.put("identifier", origoMobileKey.getIdentifier().oid().dataAsHex());
                    jsonObject.put("externalId", origoMobileKey.getExternalId());
                    jsonObject.put("cardNumber", origoMobileKey.getCardNumber());
                    call.resolve(toJson(jsonObject));
                }else{
                  call.resolve(toJson(resultObject));
                }
            } else{
                call.resolve(toJson("null"));
            }
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

    private JSObject toJson(String key, Object transactionResult){
        JSObject jsonObject = new JSObject();
        jsonObject.put(key, transactionResult);
        return jsonObject;
    }

}
