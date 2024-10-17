package com.cbord.get;

import android.os.Bundle;

import com.cbord.get.hidCredentials.MobileCredentialStatusPlugin;
import com.cbord.get.plugins.AndroidPermissionsPlugin;
import com.cbord.get.plugins.AndroidPlugin;
import com.cbord.get.plugins.ExtendedPushNotificationPlugin;
import com.cbord.get.plugins.GooglePayPlugin;
import com.cbord.get.plugins.HIDPlugin;
import com.getcapacitor.BridgeActivity;
import com.hid.origo.api.OrigoMobileKeysApi;
import com.hid.origo.api.OrigoMobileKeysListener;
import com.hid.origo.provisioning.data.response.OrigoProvisionResponse;
import com.hid.origo.wallet.listener.OrigoWalletCardStatusListener;

import java.util.ArrayList;

public class MainActivity extends BridgeActivity implements OrigoMobileKeysListener, OrigoWalletCardStatusListener {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(HIDPlugin.class);
        registerPlugin(GooglePayPlugin.class);
        registerPlugin(MobileCredentialStatusPlugin.class);
        registerPlugin(AndroidPermissionsPlugin.class);
        registerPlugin(AndroidPlugin.class);
        registerPlugin(ExtendedPushNotificationPlugin.class);
        OrigoMobileKeysApi.getInstance().getMobileKeys().addListener(this);
        OrigoMobileKeysApi.getInstance().getMobileKeys().addWalletCardStatusListener(this);
        super.onCreate(savedInstanceState);
    }

    @Override
    public void onMobileKeysChanged(int i) {
        System.out.println("onMobileKeysChanged - Main");
    }

    @Override
    public void onWalletCardStatusChanged(ArrayList<OrigoProvisionResponse> arrayList) {
        System.out.println("onWalletCardStatusChanged - Main");
    }
}