interface RPCBodyRequest {
  method: string;
  params: { [key: string]: any };
}

export class RPCQueryConfig {
  constructor(
    public method: string,
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
    return { method: this.method, params: this.params  };
  }
}
