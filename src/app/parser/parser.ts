import { Id } from '../model/instrucciones/id';
import { Nativo } from '../model/instrucciones/nativo';
import { ReturnI } from '../model/instrucciones/returnI';
import { And } from '../model/instrucciones/and';
import { Diferente } from '../model/instrucciones/diferente';
import { Division } from '../model/instrucciones/division';
import { Igual } from '../model/instrucciones/igual';
import { Imprimir } from '../model/instrucciones/imprimir';
import { ImprimirLn } from '../model/instrucciones/imprimirln';
import { Mayor } from '../model/instrucciones/mayor';
import { MayorIgual } from '../model/instrucciones/mayorIgual';
import { Menor } from '../model/instrucciones/menor';
import { MenorIgual } from '../model/instrucciones/menorIgual';
import { Modulo } from '../model/instrucciones/modulo';
import { Multiplicacion } from '../model/instrucciones/multiplicacion';
import { Not } from '../model/instrucciones/not';
import { Or } from '../model/instrucciones/or';
import { Resta } from '../model/instrucciones/resta';
import { Suma } from '../model/instrucciones/suma';
import { While } from '../model/instrucciones/while';
import { DoWhile } from '../model/instrucciones/doWhile';
import { BreakI } from '../model/instrucciones/breakI';
import { ContinueI } from '../model/instrucciones/continueI';
import { If } from '../model/instrucciones/if';
import { InstruccionIf } from '../model/instrucciones/instruccionSi';
import { Switch } from '../model/instrucciones/switch';
import { Caso } from '../model/instrucciones/caso';
import { Asignacion, TipoIgual } from '../model/instrucciones/asignacion';
import { MenosMenos } from '../model/instrucciones/menosMenos';
import { MasMas } from '../model/instrucciones/masMas';
import { LlamadaFuncion } from '../model/instrucciones/llamadaFuncion';
import { FuncionMain } from '../model/instrucciones/funcionMain';
import { Variable } from '../model/instrucciones/variable';
import { ModificadoresAcceso } from '../model/instrucciones/modificadoresAcceso';
import { DeclaracionVariable } from '../model/instrucciones/declaracionVariable';
import { For } from '../model/instrucciones/for';
import { DeclaracionFuncion } from '../model/instrucciones/declaracionFuncion';
import { Clase } from '../model/instrucciones/clase';
import { Package } from '../model/instrucciones/package';
import { Import } from '../model/instrucciones/import';
import { Archivo } from '../model/instrucciones/archivo';
import { TipoDato } from '../model/instrucciones/tipoDato';


declare var parser: any;
export class Parser {
  private yy: any;

  private readonly source: string;

  constructor(source: string) {
    this.source = source;

    parser.yy.And = And;
    parser.yy.Diferente = Diferente;
    parser.yy.Division = Division;
    parser.yy.Id = Id;
    parser.yy.Igual = Igual;
    parser.yy.Imprimir = Imprimir;
    parser.yy.ImprimirLn = ImprimirLn;
    parser.yy.Mayor = Mayor;
    parser.yy.MayorIgual = MayorIgual;
    parser.yy.Menor = Menor;
    parser.yy.MenorIgual = MenorIgual;
    parser.yy.Modulo = Modulo;
    parser.yy.Multiplicacion = Multiplicacion;
    parser.yy.Nativo = Nativo;
    parser.yy.Not = Not;
    parser.yy.Or = Or;
    parser.yy.Resta = Resta;
    parser.yy.ReturnI = ReturnI;
    parser.yy.Suma = Suma;
    parser.yy.While = While;
    parser.yy.DoWhile = DoWhile;
    parser.yy.BreakI = BreakI;
    parser.yy.ContinueI = ContinueI;
    parser.yy.If = If;
    parser.yy.InstruccionIf = InstruccionIf;
    parser.yy.Switch = Switch;
    parser.yy.Caso = Caso;
    parser.yy.Asignacion = Asignacion;
    parser.yy.TipoIgual = TipoIgual;
    parser.yy.MasMas = MasMas;
    parser.yy.MenosMenos = MenosMenos;
    parser.yy.LlamadaFuncion = LlamadaFuncion;
    parser.yy.FuncionMain = FuncionMain;
    parser.yy.Variable = Variable;
    parser.yy.ModificadoresAcceso = ModificadoresAcceso;
    parser.yy.DeclaracionVariable = DeclaracionVariable;
    parser.yy.For = For;
    parser.yy.DeclaracionFuncion = DeclaracionFuncion;
    parser.yy.Clase = Clase;
    parser.yy.Package = Package;
    parser.yy.Import = Import;
    parser.yy.Archivo = Archivo;
    parser.yy.TipoDato = TipoDato;

  }

  parse() {
    let archivo: Archivo  = parser.parse(this.source);
    console.log(archivo);
  }

}

