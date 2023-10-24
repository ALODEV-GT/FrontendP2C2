import { Visitor } from "../visitor/visitor";
import { Instruccion } from './instruccion';

export class DoWhile extends Instruccion {

  private instrucciones: Instruccion[];
  private condicion: Instruccion;

  constructor(line: number, column: number, instrucciones: Instruccion[], condicion: Instruccion) {
    super(line, column);
    this.instrucciones = instrucciones;
    this.condicion = condicion;
  }

  accept(v: Visitor): any {
    throw new Error("Method not implemented.");
  }

}






