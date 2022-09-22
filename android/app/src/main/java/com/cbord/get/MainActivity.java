package com.cbord.get;
import android.os.Bundle;

import com.cbord.get.mcredential.MobileCredentialStatusPlugin;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;

import java.util.ArrayList;
import com.getcapacitor.community.barcodescanner.BarcodeScanner;

public class MainActivity extends BridgeActivity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(HIDPlugin.class);
        registerPlugin(GooglePayPlugin.class);
        registerPlugin(MobileCredentialStatusPlugin.class);
        registerPlugin(BarcodeScanner.class);
        super.onCreate(savedInstanceState);
    }
}