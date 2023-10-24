import { Visitor } from "../visitor/visitor";
import { Instruccion } from "./instruccion";

export class Declaracion extends Instruccion {

  private isFuncion: boolean

  constructor(line: number, column: number, isFuncion: boolean) {
    super(line, column)
    this.isFuncion = isFuncion
  }

  accept(v: Visitor): any {
    //TODO: Si es funcion ejecutar el visitor de funcion de lo contrario el de variable
    throw new Error("Method not implemented.");
  }

}

