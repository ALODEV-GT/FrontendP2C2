import { Visitor } from "../visitor/visitor";
import { If } from "./if";
import { Instruccion } from "./instruccion";

export class InstruccionIf extends Instruccion {

  private listaIfs: If[]

  constructor(line: number, column: number, listaIfs: If[]) {
    super(line, column)
    this.listaIfs = listaIfs
  }

  accept(v: Visitor): any {
    throw new Error("Method not implemented.");
  }

}

