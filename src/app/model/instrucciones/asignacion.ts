import { Visitor } from "../visitor/visitor";
import { Instruccion } from "./instruccion";

export class Asignacion extends Instruccion {

  private id: string
  private tipoIgual: TipoIgual
  private expresion: Instruccion

  constructor(line: number, column: number, id: string, tipoIgual: TipoIgual, expresion: Instruccion) {
    super(line, column)
    this.id = id
    this.tipoIgual = tipoIgual
    this.expresion = expresion
  }

  accept(v: Visitor): any {
    throw new Error("Method not implemented.");
  }

}

export enum TipoIgual {
  ASIGNACION, //1
  MAS_IGUAL,  //2
  MENOS_IGUAL //3
}

