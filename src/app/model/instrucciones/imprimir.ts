import { Visitor } from "../visitor/visitor";
import { Instruccion } from './instruccion';

export class Imprimir extends Instruccion {

  private instruccion: Instruccion

  constructor(line: number, column: number, instrucciones: Instruccion) {
    super(line, column);
    this.instruccion = instrucciones;
  }

  accept(v: Visitor): any {
    throw new Error("Method not implemented.");
  }

}

