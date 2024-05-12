export class OpenifyError<Reason = any> extends Error {
  readonly reason: Reason;

  constructor(reason: Reason) {
    super('Openify error');
    this.reason = reason;
  }
}
