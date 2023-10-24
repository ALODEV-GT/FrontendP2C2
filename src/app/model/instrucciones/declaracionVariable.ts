import { Visitor } from "../visitor/visitor";
import { Instruccion } from "./instruccion";
import { ModificadoresAcceso } from "./modificadoresAcceso";
import { TipoDato } from "./tipoDato";

export class DeclaracionVariable extends Instruccion {

  private ids: string[]
  private expresion: Instruccion
  private tipo: TipoDato
  private reasignable: boolean
  private isStatic: boolean
  private acceso: ModificadoresAcceso

  constructor(line: number, column: number, ids: string[], expresion: Instruccion, tipo: TipoDato, reasignable: boolean, isStatic: boolean, acceso: ModificadoresAcceso) {
    super(line, column)
    this.ids = ids
    this.expresion = expresion
    this.tipo = tipo
    this.reasignable = reasignable
    this.isStatic = isStatic
    this.acceso = acceso
  }

  accept(v: Visitor): any {
    throw new Error("Method not implemented.");
  }

}

