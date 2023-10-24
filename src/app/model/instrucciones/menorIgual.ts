import { Visitor } from "../visitor/visitor";
import { Instruccion } from './instruccion';

export class MenorIgual extends Instruccion {

  private expIzq: Instruccion;
  private expDer: Instruccion;

  constructor(line: number, column: number, expIzq: Instruccion, expDer: Instruccion) {
    super(line, column);
    this.expIzq = expIzq;
    this.expDer = expDer;
  }

  accept(v: Visitor): any {
    throw new Error("Method not implemented.");
  }

}
