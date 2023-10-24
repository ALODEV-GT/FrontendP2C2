import { Visitor } from "../visitor/visitor";
import { Instruccion } from "./instruccion";

export class Package extends Instruccion {
  private nombre: string

  constructor(line: number, column: number, nombre: string) {
    super(line, column)
    this.nombre = nombre
  }

  accept(v: Visitor) {
    throw new Error("Method not implemented.");
  }

}
