package com.cbord.get.mcredential;

@FunctionalInterface
public interface TransactionCompleteCallback {
    void onCompleted(final Object transactionResult);
}
