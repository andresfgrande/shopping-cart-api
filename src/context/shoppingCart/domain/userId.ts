//Wrap primitives and strings
export class UserId {
  constructor(private id: string) {}

  toString(): string {
    return this.id;
  }
}
