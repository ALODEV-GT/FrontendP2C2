import { Visitor } from "../visitor/visitor";
import { Instruccion } from "./instruccion";

export class MenosMenos extends Instruccion {

  private id: string

  constructor(line: number, column: number, id: string) {
    super(line, column)
    this.id = id
  }

  accept(v: Visitor): any {
    throw new Error("Method not implemented.");
  }

}

