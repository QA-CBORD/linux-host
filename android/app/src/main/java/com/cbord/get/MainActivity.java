package com.cbord.get;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.os.Build;
import android.os.Bundle;

import androidx.core.app.NotificationCompat;

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
        LocalNotification.createNotificationChannel(this);
    }
}