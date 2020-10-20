package com.cbord.get;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.content.pm.ResolveInfo;
import android.net.Uri;
import android.util.Log;

import androidx.annotation.NonNull;

import com.getcapacitor.JSObject;
import com.getcapacitor.NativePlugin;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.google.android.gms.common.api.ApiException;
import com.google.android.gms.tapandpay.TapAndPayClient;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.android.gms.tasks.Task;

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
        final Task<String> response = tapAndPayClient.getLinkingToken("CBORD")
                .addOnSuccessListener(token -> call.resolve(toJSON(token)));

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
        Intent intent = new Intent(Intent.ACTION_VIEW);
        intent.setData(Uri.parse(call.getString("uri")));

        PackageManager packageManager = getActivity().getPackageManager();
        List<ResolveInfo> activities = packageManager.queryIntentActivities(intent, 0);
        if (activities.size() > 0) {
           getActivity().startActivity(intent);
        }
        // TODO: onActivityResult to return the response to Ionic
        // TODO: call.resolve / call.reject
    }

    private JSObject toJSON(String transactionResult) {
        JSObject jsonObject = new JSObject();
        jsonObject.put("googlePayNonce", transactionResult);
        return jsonObject;
    }

    private boolean isGoogleWalletInactive(ApiException error) {
        if (error.getStatusCode() == TAP_AND_PAY_NO_ACTIVE_WALLET) {
            return true;
        }
        return false;
    }
}
