package com.cbord.get;
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
                .addOnSuccessListener(new OnSuccessListener<String>() {
                    @Override
                    public void onSuccess(String token) {
                        Log.d("onSuccess: ", token);
                        call.resolve(toJSON(token));
                    }
                });

        response.addOnFailureListener(new OnFailureListener() {
            @Override
            public void onFailure(@NonNull Exception error) {
                ApiException apiException = (ApiException) error;
                Log.d("onFailure: ", apiException.getMessage());
                if (apiException.getStatusCode() == TAP_AND_PAY_NO_ACTIVE_WALLET) {
                    tapAndPayClient.createWallet(getActivity(), REQUEST_CREATE_WALLET);
                } else {
                    call.reject(apiException.getMessage());
                }
            }
        });
    }

    @PluginMethod()
    public void openGooglePay(PluginCall call) {
         // TODO: Get URI from call
         // TODO: Send Intent with URI
         // TODO: Update active passes?
    }

    private JSObject toJSON(String transactionResult) {
        JSObject jsonObject = new JSObject();
        jsonObject.put("googlePayNonce", transactionResult);
        return jsonObject;
    }
}
