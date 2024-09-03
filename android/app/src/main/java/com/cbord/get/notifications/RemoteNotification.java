package com.cbord.get.notifications;

import androidx.annotation.NonNull;

import com.cbord.get.plugins.AndroidPlugin;
import com.cbord.get.plugins.ExtendedPushNotificationPlugin;
import com.getcapacitor.JSObject;
import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;

public class RemoteNotification extends FirebaseMessagingService {

    @Override
    public void onNewToken(@NonNull String s) {
        super.onNewToken(s);
    }

    @Override
    public void onMessageReceived(@NonNull RemoteMessage remoteMessage) {
        super.onMessageReceived(remoteMessage);
        JSObject silentResponse = ResponseBuilder.buildSilent(remoteMessage);
       if (silentResponse != null) {
           AndroidPlugin.notifySilentListeners(silentResponse);
       } else {
           JSObject remoteMessageData = ResponseBuilder.build(remoteMessage);
           ExtendedPushNotificationPlugin.notifyAPushListeners(remoteMessageData);
       }
    }
}