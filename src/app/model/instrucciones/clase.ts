import { Visitor } from "../visitor/visitor";
import { Instruccion } from "./instruccion";
import { ModificadoresAcceso } from "./modificadoresAcceso";

export class Clase extends Instruccion {

  private acceso: ModificadoresAcceso
  private isFinal: boolean
  private nombre: string
  private extender: string
  private instrucciones: Instruccion[]

  constructor(line: number, column: number, acceso: ModificadoresAcceso, isFinal: boolean, nombre: string, extender: string, instrucciones: Instruccion[]) {
    super(line, column);
    this.acceso = acceso
    this.isFinal = isFinal
    this.nombre = nombre
    this.extender = extender
    this.instrucciones = instrucciones
  }

  accept(v: Visitor) {
    throw new Error("Method not implemented.");
  }
}

