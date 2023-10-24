import { Instruccion } from "./instruccion"

export class Caso {

  private exp: Instruccion
  private instrucciones: Instruccion[]
  private isDefault: boolean

  constructor(exp: Instruccion, instrucciones: Instruccion[], isDefault: boolean) {
    this.exp = exp
    this.instrucciones = instrucciones
    this.isDefault = isDefault
  }

  isisDefault(): boolean {
    return this.isDefault
  }

  getExp() {
    return this.exp
  }

  getInstrucciones() {
    return this.instrucciones
  }

}

