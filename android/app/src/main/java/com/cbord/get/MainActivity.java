package com.cbord.get;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;
import com.google.android.gms.tapandpay.TapAndPayClient;

import java.util.ArrayList;

public class MainActivity extends BridgeActivity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // Initializes the Bridge
        this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
            add(HIDPlugin.class);
            add(GooglePayPlugin.class);
        }});
        GooglePayPlugin.tapAndPayClient = TapAndPayClient.getClient(getApplicationContext());
    }
}
