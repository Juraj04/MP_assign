export enum Unit {
  l = 1,
  kg = 2,
  pcs = 3
}

export class Food {
  id: number;

  constructor(public name: string,
              public unit: Unit) {
  }
}
