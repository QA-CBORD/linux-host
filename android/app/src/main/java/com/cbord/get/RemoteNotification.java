package com.cbord.get;

import android.util.Log;

import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;

public class RemoteNotification extends FirebaseMessagingService {

    @Override
    public void onMessageReceived(RemoteMessage remoteMessage) {
        super.onMessageReceived(remoteMessage);

        Log.d("isSilent: ", remoteMessage.getData().get("isSilent"));
        Log.d("title: ", remoteMessage.getData().get("title"));
        Log.d("body: ", remoteMessage.getData().get("body"));

        if (!Boolean.valueOf(remoteMessage.getData().get("isSilent"))) {
            LocalNotification.showNotifications(this);
        }
    }
}
