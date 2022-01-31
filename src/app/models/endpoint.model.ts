export class EndpointModel {
  name!: string;
  address!: string;
  port!: number;
  endpoints!: Array<String>;
  status!: boolean;


  setEndpoint(_endpoint: unknown) {
    const endpoint = _endpoint as EndpointModel;
    this.name = endpoint.name || '';
    this.address = endpoint.address || '';
    this.port = endpoint.port || 0;
    this.endpoints = endpoint.endpoints || [];
    this.status = endpoint.status || false;
  }
}
