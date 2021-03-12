import { ContentStringModel, NullableContent } from '@shared/model/content-strings/content-string-models';
import { defaultMobileCredentialCs } from '@shared/model/content-strings/default-strings';
import { MobileCredentialStatuses } from '../shared/credential-state';

export class NfcDialogCs {
  constructor(private content: any) {}

  get acceptTxt(): string {
    return this.content.nfc_off_dialog_accept;
  }

  get cancelTxt(): string {
    return this.content.nfc_off_dialog_cancel;
  }

  get mContent(): string {
    return this.content.nfc_off_dialog_text;
  }

  get title(): string {
    return this.content.nfc_off_dialog_title;
  }
}

export class UsageDialogCs {
  constructor(private content: any) {}

  get title(): string {
    return this.content.usage_dialog_title;
  }

  get ok(): string {
    return this.content.usage_dialog_btn_ok;
  }

  get uninstall(): string {
    return this.content.usage_dialog_btn_uninstall;
  }

  get mContent(): string {
    return this.content['usage-instructions'];
  }
}

export class CProvisionedAlert {
  constructor(protected content: any) {}

  get title(): string {
    return this.content.mc_exist_title;
  }

  get mContent(): string {
    return this.content.mc_provisioned_text;
  }

  get acceptInstall(): string {
    return this.content.accept_install;
  }

  get cancel(): string {
    return this.content.nfc_off_dialog_cancel;
  }
}

export class CInstalledAlert extends CProvisionedAlert {
  constructor(protected content: any) {
    super(content);
  }

  get mContent(): string {
    return this.content.mc_installed_text;
  }
}

export class ConfirmDialog {
  constructor(protected content: any) {}

  get title(): string {
    return this.content.confirm_title;
  }

  get mContent(): string {
    return this.content.confirm_text;
  }

  get cancel(): string {
    return this.content.nfc_off_dialog_cancel;
  }

  get confirm(): string {
    return this.content.confirm_btn;
  }
}

export class InstallErrorDialog {
  constructor(protected content: any) {}

  get ok(): string {
    return this.content.usage_dialog_btn_ok;
  }

  get title(): string {
    return this.content.install_err_title;
  }

  get mContent(): string {
    return this.content.install_err_text;
  }
}

export class TermsContent {
  constructor(protected content: any) {}

  get accept(): string {
    return this.content.terms_btn_accept;
  }

  get decline(): string {
    return this.content.terms_btn_decline;
  }

  get mContent(): string {
    return this.content.terms;
  }

  get title(): string {
    return this.content.terms_title;
  }
}

export class CredentialStatusCs {
  private statusTxt: string;

  constructor(protected content: any) {}

  private textWhenAvailable(isHid: boolean): string {
    return (isHid && this.content.cred_available) || this.content.cred_available_gpay;
  }

  private textWhenEnabled(isHid: boolean): string {
    return (isHid && this.content.cred_enabled) || this.content.cred_enabled_gpay;
  }

  private textWhenNotReady(isHid: boolean): string {
    return (isHid && this.content.cred_not_ready) || this.content.cred_not_ready_gpay;
  }
  private textWhenRevoked(): string {
    return this.content.cred_revoked;
  }

  statusText(isHid: boolean, statusCode: MobileCredentialStatuses): string {
    switch (statusCode) {
      case MobileCredentialStatuses.AVAILABLE:
        this.statusTxt = this.textWhenAvailable(isHid);
        break;
      case MobileCredentialStatuses.PROVISIONED:
        this.statusTxt = this.textWhenEnabled(isHid);
        break;
      case MobileCredentialStatuses.PROCESSING:
        this.statusTxt = this.textWhenNotReady(isHid);
        break;
      case MobileCredentialStatuses.REVOKED:
        this.statusTxt = this.textWhenRevoked();
        break;
    }
    return this.statusTxt;
  }
}

export class AndroidCredentialCsModel extends ContentStringModel {
  private nfcDialogCs: NfcDialogCs;
  private usageDialogCs: UsageDialogCs;
  private alreadyInstallDialog: CInstalledAlert;
  private alreadyProvisionedDialog: CProvisionedAlert;
  private confirmUninstallDialog: ConfirmDialog;
  private installErrorAlert: InstallErrorDialog;
  private terms: TermsContent;
  private cStatus: CredentialStatusCs;

  constructor(nullable: NullableContent, args?: any) {
    super(nullable, defaultMobileCredentialCs);
    this.init();
  }

  private init(): void {
    this.cStatus = new CredentialStatusCs(this.content);
    this.terms = new TermsContent(this.content);
    this.nfcDialogCs = new NfcDialogCs(this.content);
    this.usageDialogCs = new UsageDialogCs(this.content);
    this.alreadyInstallDialog = new CInstalledAlert(this.content);
    this.alreadyProvisionedDialog = new CProvisionedAlert(this.content);
    this.confirmUninstallDialog = new ConfirmDialog(this.content);
    this.installErrorAlert = new InstallErrorDialog(this.content);
  }

  get alreadyInstalledDialogString$(): CInstalledAlert {
    return this.alreadyInstallDialog;
  }

  get installErorDialogString$(): InstallErrorDialog {
    return this.installErrorAlert;
  }

  get alreadyProvisionedDialogString$(): CProvisionedAlert {
    return this.alreadyProvisionedDialog;
  }

  get nfcDialogString$(): NfcDialogCs {
    return this.nfcDialogCs;
  }

  get usageDialogString$(): UsageDialogCs {
    return this.usageDialogCs;
  }

  get confirmDialogString$(): ConfirmDialog {
    return this.confirmUninstallDialog;
  }

  uiStatusText(isHid: boolean, statusCode: MobileCredentialStatuses): string {
    return this.cStatus.statusText(isHid, statusCode);
  }

  get credStatuString$(): CredentialStatusCs {
    return this.cStatus;
  }

  get termString$(): TermsContent {
    return this.terms;
  }

  get retry(): string {
    return this.content.mc_install_retry;
  }

  get installError(): string {
    return this.content.mc_install_err;
  }
}
