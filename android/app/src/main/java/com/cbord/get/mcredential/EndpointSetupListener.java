package com.cbord.get.mcredential;


import com.hid.origo.api.OrigoMobileKeysApiErrorCode;

public interface EndpointSetupListener {
    void onEvent(EventTypes eventType);
    void operationFailure(OrigoMobileKeysApiErrorCode errorCode);
}
