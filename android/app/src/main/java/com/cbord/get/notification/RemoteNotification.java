package com.cbord.get.notification;

import android.net.Uri;

import androidx.annotation.NonNull;

import com.capacitorjs.plugins.pushnotifications.PushNotificationsPlugin;
import com.cbord.get.plugin.AndroidPlugin;
import com.getcapacitor.JSObject;
import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;

 public class RemoteNotification extends FirebaseMessagingService {

    @Override
    public void onMessageReceived(@NonNull RemoteMessage remoteMessage) {
        super.onMessageReceived(remoteMessage);

        System.out.println("remoteMessage = " + remoteMessage);

       JSObject response = ConfigurationFactory.createConfiguration(remoteMessage);
       if (response != null) {
           AndroidPlugin.notifyAndroidListeners(response);
       }

        JSObject remoteMessageData = new JSObject();
        remoteMessageData.put("id", remoteMessage.getMessageId());
        JSObject data = new JSObject();
        for (String key : remoteMessage.getData().keySet()) {
            Object value = remoteMessage.getData().get(key);
            data.put(key, value);
        }
        remoteMessageData.put("data", data);
        RemoteMessage.Notification notification = remoteMessage.getNotification();
        if(notification != null) {
            String title = notification.getTitle();
            String body = notification.getBody();
            remoteMessageData.put("title", title);
            remoteMessageData.put("body", body);
            remoteMessageData.put("click_action", notification.getClickAction());
            Uri link = notification.getLink();
            if (link != null) {
                remoteMessageData.put("link", link.toString());
            }
        }

        AndroidPlugin.notifyPushListeners(remoteMessageData);
    }
}