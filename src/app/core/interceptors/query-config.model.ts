interface RPCBodyRequest {
  method: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params: { [key: string]: any };
  version?: number;
}

export class RPCQueryConfig {
  constructor(
    public method: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public params: { [key: string]: any } = {},
    public useSessionId: boolean = false,
    public useInstitutionId: boolean = false,
    public timeOut?: number
  ) {
    this.method = method;
    this.useInstitutionId = useInstitutionId;
    this.useSessionId = useSessionId;
    this.params = params;
    this.timeOut = timeOut;
  }

  public get requestBody(): RPCBodyRequest {
    return { method: this.method, params: this.params };
  }
}
