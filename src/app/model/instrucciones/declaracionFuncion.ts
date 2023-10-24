import { Visitor } from "../visitor/visitor";
import { Instruccion } from "./instruccion";
import { ModificadoresAcceso } from "./modificadoresAcceso";
import { TipoDato } from "./tipoDato";
import { Variable } from "./variable";

export class DeclaracionFuncion extends Instruccion {

  private id: string
  private instrucciones: Instruccion[]
  private tipo: TipoDato
  private parametros: Variable[]
  private isStatic: boolean
  private acceso: ModificadoresAcceso

  constructor(line: number, column: number, id: string, instrucciones: Instruccion[], tipo: TipoDato, parametros: Variable[], isStatic: boolean, acceso: ModificadoresAcceso) {
    super(line, column)
    this.id = id
    this.instrucciones = instrucciones
    this.tipo = tipo
    this.parametros = parametros
    this.isStatic = isStatic
    this.acceso = acceso
  }

  accept(v: Visitor): any {
    throw new Error("Method not implemented.");
  }

}

