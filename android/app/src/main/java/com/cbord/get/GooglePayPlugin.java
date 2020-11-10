package com.cbord.get;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.content.pm.ResolveInfo;
import android.net.Uri;
import android.util.Log;

import com.getcapacitor.JSObject;
import com.getcapacitor.NativePlugin;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.google.android.gms.common.api.ApiException;
import com.google.android.gms.tapandpay.TapAndPayClient;
import com.google.android.gms.tasks.Task;

import org.jetbrains.annotations.NotNull;

import java.util.List;

@NativePlugin()
public class GooglePayPlugin extends Plugin {

    private TapAndPayClient tapAndPayClient;
    private final int REQUEST_CREATE_WALLET = 4;
    private final int TAP_AND_PAY_NO_ACTIVE_WALLET = 15002;

    @PluginMethod()
    public void getGoogleClient(PluginCall call) {
        tapAndPayClient = TapAndPayClient.getClient(getActivity().getApplicationContext());
    }

    @PluginMethod()
    public void getGooglePayNonce(PluginCall call) {
        final Task<String> response = tapAndPayClient.getLinkingToken("CBORD");
        response.addOnSuccessListener(token -> {
            call.resolve(toJSON(token));
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
        Intent intent = getGooglePayIntent(call);
        if (isGooglePaySafeToLaunch(intent)) {
            getActivity().startActivityForResult(intent, 400);
        } else {
            call.reject("Activity could not be resolved");
        }
    }

    @NotNull
    private Intent getGooglePayIntent(PluginCall call) {
        Intent intent = new Intent(Intent.ACTION_VIEW);
        Log.d("digitationReference", call.getString("uri"));
        intent.setData(Uri.parse(call.getString("uri")));
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        return intent;
    }

    @NotNull
    private boolean isGooglePaySafeToLaunch(Intent intent) {
        PackageManager packageManager = getActivity().getPackageManager();
        List<ResolveInfo> activities = packageManager.queryIntentActivities(intent, 0);
        return activities.size() > 0;
    }

    private JSObject toJSON(String value) {
        JSObject jsonObject = new JSObject();
        jsonObject.put("googlePayNonce", value);
        return jsonObject;
    }

    private boolean isGoogleWalletInactive(ApiException error) {
        return error.getStatusCode() == TAP_AND_PAY_NO_ACTIVE_WALLET;
    }
}