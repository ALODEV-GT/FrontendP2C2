import { Visitor } from "../visitor/visitor";
import { Instruccion } from "./instruccion";

export class BreakI extends Instruccion {

  constructor(line: number, column: number) {
    super(line, column);
  }

  accept(v: Visitor): any {
    throw new Error("Method not implemented.");
  }

}

