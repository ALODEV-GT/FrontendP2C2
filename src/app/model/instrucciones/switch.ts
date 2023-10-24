import { Visitor } from "../visitor/visitor";
import { Caso } from "./caso";
import { Instruccion } from "./instruccion";

export class Switch extends Instruccion {

  private exp: Instruccion
  private listaCasos: Caso[]

  constructor(line: number, column: number, exp: Instruccion, listaCasos: Caso[]) {
    super(line, column)
    this.exp = exp
    this.listaCasos = listaCasos
  }

  accept(v: Visitor): any {
    throw new Error("Method not implemented.");
  }

}

