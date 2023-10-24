import { Visitor } from "../visitor/visitor";
import { Instruccion } from './instruccion';
import { TipoDato } from "./tipoDato";

export class Nativo extends Instruccion {

  private valor: any;
  private tipo: TipoDato;

  constructor(line: number, column: number, valor: any, tipo: TipoDato) {
    super(line, column);
    this.valor = valor;
    this.tipo = tipo;
  }

  accept(v: Visitor): any {
    throw new Error("Method not implemented.");
  }

}




