package com.cbord.get;

import android.app.Application;
import android.util.Log;

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
    private static final String HID_SDK_TRANSACTION_RESULT = "hidSdkTransactionResult";
    private static final String TRANSACTION_SUCCESS_FULL = "TRANSACTION_SUCCESS";
    private static final String TAG = HIDPlugin.class.getSimpleName();

    @PluginMethod()
    public void initializeOrigo(PluginCall call) {
        hidsdkManager = HIDSDKManager.getInstance(getActivity());
        call.resolve(toJson(TRANSACTION_SUCCESS_FULL));
    }

    @PluginMethod()
    public void startupOrigo(PluginCall call) {
        hidsdkManager.onApplicationStarted((transactionResult -> {
            call.resolve(toJson(transactionResult));
        }));
    }

    @PluginMethod()
    public void addCredential(PluginCall call){
        String invitationCode = call.getString("invitationCode");
        hidsdkManager.doHidCredentialFirstInstall(invitationCode, (transactionResult) -> {
            call.resolve(toJson(transactionResult));
        });
    }

    @PluginMethod()
    public void deleteCredential(PluginCall call){
        hidsdkManager.deleteCredential(transactionResult -> {
            call.resolve(toJson((transactionResult)));
        });
    }

    @PluginMethod()
    public void loadCredentialData(PluginCall call){
        hidsdkManager.getCurrentEndpoint((resultObject) -> {
            OrigoMobileKey origoMobileKey = null;
            if(resultObject != null){
                JSObject jsonObject = new JSObject();
                if(resultObject instanceof OrigoMobileKey){
                    origoMobileKey =  (OrigoMobileKey)resultObject;
                    jsonObject.put("isActive", origoMobileKey.isActivated());
                    jsonObject.put("startDate", origoMobileKey.getBeginDate());
                    jsonObject.put("identifier", origoMobileKey.getIdentifier().oid().dataAsHex());
                    jsonObject.put("externalId", origoMobileKey.getExternalId());
                    jsonObject.put("cardNumber", origoMobileKey.getCardNumber());
                    call.resolve(toJson(jsonObject));
                }else{
                  call.resolve(toJson(resultObject));
                }
            }else{
                call.resolve(toJson("null"));
            }
        });
    }

    @PluginMethod
    public void checkIfEndpointIsSetup(PluginCall call){
        boolean isEndpointSetup = hidsdkManager.isEndpointSetUpComplete();
        call.resolve(toJson(isEndpointSetup));
    }


    private JSObject toJson(Object transactionResult){
        JSObject jsonObject = new JSObject();
        jsonObject.put(HID_SDK_TRANSACTION_RESULT, transactionResult);
        return jsonObject;
    }

}
