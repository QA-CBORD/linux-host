package com.cbord.get.mcredentials;

@FunctionalInterface
public interface TransactionCompleteCallback {
    void onCompleted(final Object transactionResult);
}
