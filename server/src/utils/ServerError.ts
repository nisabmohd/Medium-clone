export default class ServerError extends Error {
  statusCode: number;
  options: any;
  constructor(statusCode: number, message: string, options?: any) {
    super(message);
    this.statusCode = statusCode;
    this.options = options;
  }
}
