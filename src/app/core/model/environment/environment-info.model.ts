import * as Globals from '../../../app.global';

export interface EnvironmentInfo {
  value: Globals.Environment.Value;
  baseUrl: Globals.Environment.BaseUrl;
  serviceUrl: Globals.Environment.ServiceUrl;
}
