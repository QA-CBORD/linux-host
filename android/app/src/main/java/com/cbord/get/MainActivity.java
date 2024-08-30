package com.cbord.get;

import android.os.Bundle;

import com.cbord.get.mcredential.MobileCredentialStatusPlugin;
import com.cbord.get.plugin.AndroidPermissionsPlugin;
import com.cbord.get.plugin.AndroidPlugin;
import com.cbord.get.plugin.GooglePayPlugin;
import com.cbord.get.plugin.HIDPlugin;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(HIDPlugin.class);
        registerPlugin(GooglePayPlugin.class);
        registerPlugin(MobileCredentialStatusPlugin.class);
        registerPlugin(AndroidPermissionsPlugin.class);
        registerPlugin(AndroidPlugin.class);
        super.onCreate(savedInstanceState);
    }
}