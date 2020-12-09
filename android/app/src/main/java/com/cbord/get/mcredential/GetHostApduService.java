package com.cbord.get.mcredential;

import android.nfc.cardemulation.HostApduService;
import android.nfc.cardemulation.HostNfcFService;
import android.os.Bundle;

public class GetHostApduService extends HostApduService {
    @Override
    public byte[] processCommandApdu(byte[] commandApdu, Bundle extras) {
        return new byte[0];
    }

    @Override
    public void onDeactivated(int reason) {

    }
//    @Override
//    public byte[] processNfcFPacket(byte[] commandPacket, Bundle extras) {
//        return new byte[0];
//    }
//
//    @Override
//    public void onDeactivated(int reason) {
//
//    }
}
