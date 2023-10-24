import { Visitor } from "../visitor/visitor";
import { Instruccion } from './instruccion';

export class Not extends Instruccion {

  private exp: Instruccion;

  constructor(line: number, column: number, exp: Instruccion) {
    super(line, column);
    this.exp = exp;
  }

  accept(v: Visitor): any {
    throw new Error("Method not implemented.");
  }

}
