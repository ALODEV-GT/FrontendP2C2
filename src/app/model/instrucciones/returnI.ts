import { Visitor } from "../visitor/visitor";
import { Instruccion } from "./instruccion";

export class ReturnI extends Instruccion {

  private tieneValor: boolean;
  private valor: Instruccion

  constructor(line: number, column: number, tieneValor: boolean, valor: Instruccion) {
    super(line, column);
    this.tieneValor = tieneValor;
    this.valor = valor;
  }

  accept(v: Visitor): any {
    throw new Error("Method not implemented.");
  }

}

