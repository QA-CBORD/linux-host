package com.cbord.get.notification;


import androidx.annotation.NonNull;

import com.cbord.get.plugin.AndroidPlugin;
import com.cbord.get.plugin.EventType;
import com.getcapacitor.Bridge;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;

import java.util.HashMap;
import java.util.Map;

 public class RemoteNotification extends FirebaseMessagingService {

    @Override
    public void onMessageReceived(@NonNull RemoteMessage remoteMessage) {
        super.onMessageReceived(remoteMessage);

        System.out.println("remoteMessage = " + remoteMessage);
        JSObject response = ConfigurationFactory.createConfiguration(remoteMessage);
        AndroidPlugin.notifyListeners(response);
    }
}

