package com.cbord.get.mcredential;


import com.hid.origo.api.OrigoMobileKeysApiErrorCode;

public interface EndpointSetupListener {
    void onInstallationSuccess(Object someObject);
    void onInstallationFailure(OrigoMobileKeysApiErrorCode errorCode);
    void operationFailure(PluginErrors errorCode);
    void onStartupSuccessful();
    void onStartupFailure(OrigoMobileKeysApiErrorCode errorCode);
}
