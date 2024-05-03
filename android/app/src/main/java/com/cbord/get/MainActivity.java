package com.cbord.get;
import android.os.Bundle;

import com.cbord.get.mcredential.MobileCredentialStatusPlugin;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(HIDPlugin.class);
        registerPlugin(GooglePayPlugin.class);
        registerPlugin(MobileCredentialStatusPlugin.class);
        registerPlugin(AndroidPermissionsPlugin.class);
        super.onCreate(savedInstanceState);
    }
}