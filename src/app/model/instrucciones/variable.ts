import { Visitor } from "../visitor/visitor";
import { TipoDato } from "./tipoDato";

export class Variable {

  private id: string
  private tipoDato: TipoDato
  private valor: any
  private reasignable: boolean

  constructor(id: string, tipoDato: TipoDato, valor: any, reasignable: boolean) {
    this.id = id
    this.tipoDato = tipoDato
    this.valor = valor
    this.reasignable = reasignable
  }

  accept(v: Visitor): any {
    throw new Error("Method not implemented.");
  }

}

