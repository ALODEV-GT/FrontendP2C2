import { Visitor } from "../visitor/visitor";
import { Instruccion } from "./instruccion";

export class LlamadaFuncion extends Instruccion {

  private id: string
  private listaParametros: Instruccion[]

  constructor(line: number, column: number, id: string, listaParametros: Instruccion[]) {
    super(line, column)
    this.id = id
    this.listaParametros = listaParametros
  }

  accept(v: Visitor): any {
    throw new Error("Method not implemented.");
  }

}

