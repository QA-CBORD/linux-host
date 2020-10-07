package com.cbord.get;

import android.app.Application;
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
    private static final String TRANSACTION_RESULT = "transactionResult";

    @PluginMethod()
    public void initializeOrigo(PluginCall call) {
        Application application = getActivity().getApplication();
        hidsdkManager = HIDSDKManager.getInstance(application);
        call.resolve(toJson(hidsdkManager.TRANSACTION_RESULT));
    }

    @PluginMethod()
    public void startupOrigo(PluginCall call) {
        hidsdkManager.onApplicationStarted();
        call.resolve(toJson(hidsdkManager.TRANSACTION_RESULT));
    }


    @PluginMethod()
    public void addCredential(PluginCall call){
        String invitationCode = call.getString("invitationCode");
        hidsdkManager.doHidCredentialFirstInstall(invitationCode);
        call.resolve(toJson(hidsdkManager.TRANSACTION_RESULT));
    }

    @PluginMethod()
    public void deleteCredential(PluginCall call){

        hidsdkManager.deleteCredential();
        call.resolve(toJson(hidsdkManager.TRANSACTION_RESULT));
    }

    @PluginMethod()
    public void loadCredentialData(PluginCall call){
        OrigoMobileKey currentKey = hidsdkManager.getCurrentEndpoint();
        JSObject jsonObject = new JSObject();
        if(currentKey != null ){
            jsonObject.put("isActive", currentKey.isActivated());
            jsonObject.put("startDate", currentKey.getBeginDate());
            jsonObject.put("identifier", currentKey.getIdentifier().oid().dataAsHex());
            jsonObject.put("externalId", currentKey.getExternalId());
            jsonObject.put("cardNumber", currentKey.getCardNumber());
            jsonObject.put(TRANSACTION_RESULT, hidsdkManager.TRANSACTION_RESULT);
        }else{
            call.resolve(toJson(hidsdkManager.TRANSACTION_RESULT));
            return;
        }
        call.resolve(toJson(jsonObject));
    }

    private JSObject toJson(Object transactionResult){
        JSObject jsonObject = new JSObject();
        jsonObject.put(TRANSACTION_RESULT, transactionResult);
        return jsonObject;
    }

}
