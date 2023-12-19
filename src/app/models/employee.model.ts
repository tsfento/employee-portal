// Model for Employee containing info to save and retrieve
export class Employee {
  constructor(
    public name: string,
    public title: string,
    public email: string,
    public imageUrl: string,
    public reportsTo: string,
  ) {}
}
