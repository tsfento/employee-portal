// Model for Organization containing info to save and retrieve
export class Organization {
  constructor(
    public name: string,
    public address: string,
    public city: string,
    public state: string,
    public zip: string,
    public phone: string,
  ) {}
}
