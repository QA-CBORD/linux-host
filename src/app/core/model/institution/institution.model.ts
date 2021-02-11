import { BooleanValueAccessor } from '@ionic/angular';
import { AuthenticationInfo } from '../authentication/authentication-info.model';

export interface Institution {
  id: string;
  objectRevision: number;
  name: string;
  shortName: string;
  timeZone: string;
  locale: string;
  authenticationSystemType: number; // See AuthenticationSystemType for valid values
  authenticationInfo: AuthenticationInfo;
  lastChangedTerms: Date;
  cashlessPaymentSystemType: number;
  active: boolean;
  payWithGETOnly: boolean;
  type: number;
}

export class InstitutionLookupListItem {
  private _id: string;
  private _name: string;
  private _shortName: string;
  private _type: number;
  private _guestDeposit: boolean;
  private _guestLogin: boolean;
  private _guestLoginNotRequired: boolean;
  constructor(builder: InstitutionBuilder) {
    this._id = builder._id;
    this._name = builder._name;
    this._shortName = builder._shortName;
    this._type = builder._type || 0;
    this._guestDeposit = Boolean(Number(builder._guestDeposit || 0));
    this._guestLogin = Boolean(Number(builder._guestLogin || 0));
    this._guestLoginNotRequired = Boolean(Number(builder._guestLoginNotRequired || 0));
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get shorName(): string {
    return this._shortName;
  }

  get type(): number {
    return this._type;
  }

  get guestLogin(): boolean {
    return this._guestLogin;
  }

  get guestDeposit(): boolean {
    return this._guestDeposit;
  }

  get guestLoginNotRequired(): boolean {
    return this._guestLoginNotRequired;
  }

  get guestAllowed(): boolean {
    return this._guestLogin || this._guestDeposit || this._guestLoginNotRequired;
  }
}

export class InstitutionBuilder {
  _id: string;
  _name: string;
  _shortName: string;
  _type: number;
  _guestDeposit: number;
  _guestLogin: number;
  _guestLoginNotRequired: number;

  public id(data: string): InstitutionBuilder {
    this._id = data;
    return this;
  }

  public name(data: string): InstitutionBuilder {
    this._name = data;
    return this;
  }

  public shortName(data: string): InstitutionBuilder {
    this._shortName = data;
    return this;
  }

  public type(data: number): InstitutionBuilder {
    this._type = data;
    return this;
  }

  public guestDeposit(data: number): InstitutionBuilder {
    this._guestDeposit = data;
    return this;
  }

  public guestLogin(data: number): InstitutionBuilder {
    this._guestLogin = data;
    return this;
  }

  public guestLoginNotRequired(data: number): InstitutionBuilder {
    this._guestLoginNotRequired = data;
    return this;
  }

  public build(): InstitutionLookupListItem {
    return new InstitutionLookupListItem(this);
  }
}
