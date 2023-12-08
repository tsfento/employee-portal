export class User {
  constructor(
    public firstName: string,
    public lastName: string,
    public id: string,
    public email?: string,
    private _token?: string,
    private _tokenExpDate?: Date,
  ) {}

  public get token() {
    if (!this._tokenExpDate || new Date() > this._tokenExpDate) return null;

    return this._token;
  }
}
