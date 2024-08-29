package com.cbord.get;
import static com.cbord.get.plugin.EventType.PHOTO_UPLOAD_UPDATE;

import android.os.Bundle;
import android.os.Handler;

import com.cbord.get.mcredential.MobileCredentialStatusPlugin;
import com.cbord.get.notification.ConfigurationFactory;
import com.cbord.get.notification.LocalNotification;
import com.cbord.get.notification.RemoteNotification;
import com.cbord.get.plugin.AndroidPermissionsPlugin;
import com.cbord.get.plugin.AndroidPlugin;
import com.cbord.get.plugin.GooglePayPlugin;
import com.cbord.get.plugin.HIDPlugin;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.JSObject;
import com.google.firebase.messaging.RemoteMessage;

public class MainActivity extends BridgeActivity {

    private Handler handler;
    private Runnable runnable;
    private final int DELAY = 5000; // 5000 milliseconds = 5 seconds
    private AndroidPlugin notifier = new AndroidPlugin();

    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(HIDPlugin.class);
        registerPlugin(GooglePayPlugin.class);
        registerPlugin(MobileCredentialStatusPlugin.class);
        registerPlugin(AndroidPermissionsPlugin.class);
        registerPlugin(AndroidPlugin.class);
        super.onCreate(savedInstanceState);

        LocalNotification.createNotificationChannel(this);

        handler = new Handler();
        runnable = new Runnable() {
            @Override
            public void run() { //"category": "PHOTO_UPLOAD_UPDATE"
                System.out.println("running");
                JSObject response = new JSObject();
                response.put("title", "test" );
                response.put("status", "ACCEPTED" );
                response.put("userId", "7053d917-4e32-4981-874b-a9396205e187" );
               // response.put("category", "PHOTO_UPLOAD_UPDATE" );
                notifier.notifyListeners(response);
                // Schedule the task to run again after DELAY milliseconds
                handler.postDelayed(this, DELAY);
            }
        };

        // Start the initial execution of the task
        handler.postDelayed(runnable, DELAY);
   }

    @Override
    public void onDestroy() {
        super.onDestroy();
        // Remove callbacks to prevent memory leaks
        handler.removeCallbacks(runnable);
    }
}