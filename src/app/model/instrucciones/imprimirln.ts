import { Visitor } from "../visitor/visitor";
import { Instruccion } from "./instruccion";

export class ImprimirLn extends Instruccion {

  private instruccion: Instruccion

  constructor(line: number, column: number, instruccion: Instruccion) {
    super(line, column);
    this.instruccion = instruccion;
  }

  accept(v: Visitor): any {
    throw new Error("Method not implemented.");
  }

}
