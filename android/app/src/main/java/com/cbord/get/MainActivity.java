package com.cbord.get;

import android.os.Bundle;

import com.cbord.get.mcredentials.MobileCredentialStatusPlugin;
import com.cbord.get.plugins.AndroidPermissionsPlugin;
import com.cbord.get.plugins.AndroidPlugin;
import com.cbord.get.plugins.ExtendedPushNotificationPlugin;
import com.cbord.get.plugins.GooglePayPlugin;
import com.cbord.get.plugins.HIDPlugin;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(HIDPlugin.class);
        registerPlugin(GooglePayPlugin.class);
        registerPlugin(MobileCredentialStatusPlugin.class);
        registerPlugin(AndroidPermissionsPlugin.class);
        registerPlugin(AndroidPlugin.class);
        registerPlugin(ExtendedPushNotificationPlugin.class);
        super.onCreate(savedInstanceState);
    }
}