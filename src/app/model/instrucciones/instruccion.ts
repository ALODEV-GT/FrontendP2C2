import { Visitor } from "../visitor/visitor";

export abstract class Instruccion {
  line: number;
  column: number;

  constructor(line: number, column: number) {
    this.line = line;
    this.column = column;
  }

  abstract accept(v: Visitor): any;
}
