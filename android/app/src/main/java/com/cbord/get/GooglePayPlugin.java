package com.cbord.get;

import android.app.Application;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.content.pm.ResolveInfo;
import android.net.Uri;
import android.util.Log;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.core.content.ContextCompat;

import com.getcapacitor.JSObject;
import com.getcapacitor.NativePlugin;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.google.android.gms.common.api.ApiException;
import com.google.android.gms.tapandpay.TapAndPay;
import com.google.android.gms.tapandpay.TapAndPayClient;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.android.gms.tasks.Task;

import java.util.List;

import static com.google.android.gms.tapandpay.TapAndPayStatusCodes.TAP_AND_PAY_ATTESTATION_ERROR;
import static com.google.android.gms.tapandpay.TapAndPayStatusCodes.TAP_AND_PAY_INVALID_TOKEN_STATE;
import static com.google.android.gms.tapandpay.TapAndPayStatusCodes.TAP_AND_PAY_NO_ACTIVE_WALLET;
import static com.google.android.gms.tapandpay.TapAndPayStatusCodes.TAP_AND_PAY_TOKEN_NOT_FOUND;
import static com.google.android.gms.tapandpay.TapAndPayStatusCodes.TAP_AND_PAY_UNAVAILABLE;

@NativePlugin()
public class GooglePayPlugin extends Plugin {

    private TapAndPayClient tapAndPayClient;
    private final int REQUEST_CREATE_WALLET = 4;
    public static final int TAP_AND_PAY_NO_ACTIVE_WALLET = 15002;

    @PluginMethod()
    public void getGooglePayNonce(PluginCall call) {
        Log.d("getGooglePayNonce", "called");
        tapAndPayClient = TapAndPayClient.getClient(getActivity().getApplicationContext());
        tapAndPayClient.getActiveWalletId().addOnCompleteListener(
                new OnCompleteListener<String>() {
                    @Override
                    public void onComplete(@NonNull Task<String> task) {
                        if (task.isSuccessful()) {
                            Log.d("Success wallet: ", task.getResult());

                        } else {
                            ApiException apiException = (ApiException) task.getException();
                            if (apiException.getStatusCode() == TAP_AND_PAY_NO_ACTIVE_WALLET) {
                                Log.d("No wallet: ", task.getResult());
                                // If no Google Pay wallet is found, create one and then call
                                // getActiveWalletId() again.
                                tapAndPayClient.createWallet(getActivity(), REQUEST_CREATE_WALLET);
                                tapAndPayClient.getActiveWalletId();
                            } else {
                                Log.d("Failed wallet: ", task.getResult());
                            }
                        }
                    }
                });
        final Task<String> nonce = tapAndPayClient.getLinkingToken("CBORD");
        nonce.addOnSuccessListener(new OnSuccessListener<String>() {
            @Override
            public void onSuccess(String result) {
                Log.d("onComplete", "success: " + result);
                call.resolve(toJSON(result));
            }

        });
        nonce.addOnFailureListener(new OnFailureListener() {
            @Override
            public void onFailure(@NonNull Exception error) {
                Log.d("onComplete", "error: " + error.getMessage());
                ApiException apiException = (ApiException) error;
                if (apiException.getStatusCode() == TAP_AND_PAY_NO_ACTIVE_WALLET) {
                    tapAndPayClient.createWallet(getActivity(), REQUEST_CREATE_WALLET);
                }
                call.reject(apiException.getMessage());
            }
        });

    }

    @PluginMethod()
    private void openGooglePay(PluginCall call) {
        String uri = call.getString("digitizationReference");
        Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(uri));
        PackageManager packageManager = getActivity().getPackageManager();
        List<ResolveInfo> activities = packageManager.queryIntentActivities(intent, 0);
        Application application = getActivity().getApplication();
        if (activities.size() > 0) {
            application.startActivity(intent);
        } else {
            Log.d("isIntentSafe", "Not safe");
        }
    }

    private JSObject toJSON(String transactionResult) {
        JSObject jsonObject = new JSObject();
        jsonObject.put("googlePayNonce", transactionResult);
        return jsonObject;
    }
}
