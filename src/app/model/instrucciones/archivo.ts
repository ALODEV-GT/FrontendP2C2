import { Visitor } from "../visitor/visitor";
import { Instruccion } from "./instruccion";

export class Archivo extends Instruccion {

  private paquete: Instruccion | null = null
  private imports: Instruccion[]
  private clase: Instruccion

  constructor(line: number, column: number, paquete: Instruccion, imports: Instruccion[], clase: Instruccion) {
    super(line, column)
    this.imports = imports
    this.clase = clase
  }

  accept(v: Visitor) {
    throw new Error("Method not implemented.");
  }

  setPaquete(paquete: Instruccion) {
    this.paquete = paquete;
  }

}
