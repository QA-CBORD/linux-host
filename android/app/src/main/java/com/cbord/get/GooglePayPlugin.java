package com.cbord.get;

import android.app.Application;
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
import com.google.android.gms.tapandpay.TapAndPayClient;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;

import java.util.List;

import io.reactivex.annotations.NonNull;

@NativePlugin()
public class GooglePayPlugin extends Plugin {
    private TapAndPayClient tapAndPayClient;
    private static final int REQUEST_CREATE_WALLET = 4;

    @PluginMethod()
    public void getGooglePayNonce(PluginCall call) {
        tapAndPayClient.getLinkingToken("CBORD").addOnCompleteListener(new OnCompleteListener<String>() {
            @Override
            public void onComplete(@NonNull Task<String> task) {
                if (task.isSuccessful()) { // TODO: Return GooglePayNonce
                    Log.d("onComplete","success: " + task.getResult());
                    JSObject ret = new JSObject();
                    ret.put("googlePayNonce", task.getResult());
                    call.resolve(ret);
                } else {
                    Log.d("onComplete","error: " + task.getException().getMessage());
                    if (task.getException().getMessage() == "NO_WALLET") { // TODO: If no wallet call createWallet
                        tapAndPayClient.createWallet(getActivity(), REQUEST_CREATE_WALLET);
                    } else {
                        call.reject(task.getException().getMessage());
                    }
                }
            }
        });
    }

    @PluginMethod()
    private void openGooglePay(PluginCall call) {
        String uri = call.getString("digitizationReference");
        Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(uri));
        PackageManager packageManager = getActivity().getPackageManager();
        List<ResolveInfo> activities = packageManager.queryIntentActivities(intent, 0);
        if (activities.size() > 0) {
            getActivity().getApplication().startActivity(intent);
        } else {
            Log.d("isIntentSafe", "The intent isn't safe");
        }
    }

}
