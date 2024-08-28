package com.cbord.get.plugin;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.content.pm.ResolveInfo;
import android.net.Uri;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.google.android.gms.common.api.ApiException;
import com.google.android.gms.tapandpay.TapAndPayClient;
import com.google.android.gms.tasks.Task;
import com.getcapacitor.annotation.CapacitorPlugin;

import org.jetbrains.annotations.NotNull;

import java.util.List;

@CapacitorPlugin(name = "GooglePayPlugin")
public class GooglePayPlugin extends Plugin {

    private TapAndPayClient tapAndPayClient;
    private final int REQUEST_CREATE_WALLET = 4;
    private static final String HID_SDK_TRANSACTION_RESULT = "transactionStatus";
    private final int TAP_AND_PAY_NO_ACTIVE_WALLET = 15002;
    private final String APP_RESUME_EVENT = "appResumed";
    private final String DIGITIZATION_REFERENCE_URI = "uri";
    private final String GOOGLE_PAY_NONCE = "googlePayNonce";
    private final String EXCEPTION_MESSAGE = "Activity could not be resolved";
    private final String CLIENT_NAME = "CBORD";

    @PluginMethod()
    public void getGoogleClient(PluginCall call) {
        tapAndPayClient = TapAndPayClient.getClient(getActivity().getApplicationContext());
        call.resolve(HIDToJson("success"));
    }

    @PluginMethod()
    public void getGooglePayNonce(PluginCall call) {
        final Task<String> response = tapAndPayClient.getLinkingToken(CLIENT_NAME);
        response.addOnSuccessListener(token -> {
            call.resolve(goolePayToJSON(token));
        });
        response.addOnFailureListener(error -> {
             if (isGoogleWalletInactive((ApiException) error)) {
                 tapAndPayClient.createWallet(getActivity(), REQUEST_CREATE_WALLET);
             } else {
                call.reject(error.getMessage());
            }
        });
    }

    @PluginMethod()
    public void openGooglePay(PluginCall call) {
       try{
           Intent intent = getGooglePayIntent(call);
           if (isGooglePaySafeToLaunch(intent)) {
               getActivity().startActivityForResult(intent, 400);
           } else {
               call.reject(EXCEPTION_MESSAGE);
           }
       }catch (Exception ex){
           call.reject(EXCEPTION_MESSAGE);
       }
    }


    @Override
    protected void handleOnResume() {
            super.handleOnResume();
            notifyListeners(APP_RESUME_EVENT, new JSObject());
    }

    @NotNull
    private Intent getGooglePayIntent(PluginCall call) {
        Intent intent = new Intent(Intent.ACTION_VIEW);
        intent.setData(Uri.parse(call.getString(DIGITIZATION_REFERENCE_URI)));
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        return intent;
    }

    @NotNull
    private boolean isGooglePaySafeToLaunch(Intent intent) {
        PackageManager packageManager = getActivity().getPackageManager();
        List<ResolveInfo> activities = packageManager.queryIntentActivities(intent, 0);
        return activities.size() > 0;
    }

    private JSObject goolePayToJSON(String value) {
        JSObject jsonObject = new JSObject();
        jsonObject.put(GOOGLE_PAY_NONCE, value);
        return jsonObject;
    }

    private boolean isGoogleWalletInactive(ApiException error) {
        return error.getStatusCode() == TAP_AND_PAY_NO_ACTIVE_WALLET;
    }

    private JSObject HIDToJson(Object transactionResult){
        JSObject jsonObject = new JSObject();
        jsonObject.put(HID_SDK_TRANSACTION_RESULT, transactionResult);
        return jsonObject;
    }
}