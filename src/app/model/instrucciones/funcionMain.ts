import { Visitor } from "../visitor/visitor";
import { Instruccion } from "./instruccion";

export class FuncionMain extends Instruccion {

  private instrucciones: Instruccion[]

  constructor(line: number, column: number, instrucciones: Instruccion[]) {
    super(line, column)
    this.instrucciones = instrucciones
  }

  accept(v: Visitor): any {
    throw new Error("Method not implemented.");
  }

}

