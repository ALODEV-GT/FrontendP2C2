import { Visitor } from "../visitor/visitor";
import { Instruccion } from "./instruccion";

export class For extends Instruccion {

  private declaracion: Instruccion
  private asignacion: Instruccion
  private condicion: Instruccion
  private asignacionPara: Instruccion
  private instrucciones: any

  constructor(line: number, column: number, declaracion: Instruccion, asignacion: Instruccion, condicion: Instruccion, asignacionPara: Instruccion, instrucciones: any) {
    super(line, column)
    this.declaracion = declaracion
    this.asignacion = asignacion
    this.condicion = condicion
    this.asignacionPara = asignacionPara
    this.instrucciones = instrucciones
  }

  accept(v: Visitor): any {
    throw new Error("Method not implemented.");
  }

}

