import { Visitor } from "../visitor/visitor";
import { Instruccion } from "./instruccion";

export class If extends Instruccion {

  private condicion: Instruccion
  private instrucciones: Instruccion[]

  constructor(line: number, column: number, condicion: Instruccion, instrucciones: Instruccion[]) {
    super(line, column)
    this.condicion = condicion
    this.instrucciones = instrucciones
  }

  accept(v: Visitor): any {
    throw new Error("Method not implemented.");
  }

}

