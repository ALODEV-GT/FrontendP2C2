%{
//Codigo JS para manejar el analizador lexico
%}


/*-------------------------LEXICO-------------------------*/
%lex

//Opciones
%options case-sensitive

%%

//Comentarios
"\/\/".*  					{}                  //de linea
"\/\\*([^*]|(\\*+[^*/]))*\\*+\/"	{}  //de bloque

//clases
"class"         return "CLASS"
"extends"       return "EXTENDS"
"import"        return "IMPORT"
"new"           return "NEW"
"package"       return "PACKAGE"
"super"         return "SUPER"
"this"          return "THIS"
"main"          return "MAIN"

//Modificadores de acceso
"public"        return "PUBLIC"
"private"       return "PRIVATE"
"protected"     return "PROTECTED"
"static"        return "STATIC"
"final"         return "FINAL"

//Tipos
"void"          return "VOID"
"byte"          return "BYTE"
"short"         return "SHORT"
"int"           return "INT"
"long"          return "LONG"
"float"         return "FLOAT"
"double"        return "DOUBLE"
"char"          return "CHAR"
"boolean"       return "BOOLEAN"
"String"        return "STRING"
"null"          return "NULL"

//Modificadores de flujo
"break"         return "BREAK"
"continue"      return "CONTINUE"
"return"        return "RETURN"

//Ciclos
"do"            return "DO"
"for"           return "FOR"
"while"         return "WHILE"

//Estructuras de control de flujo
"switch"        return "SWITCH"
"case"          return "CASE"
"default"       return "DEFAULT"
"else"          return "ELSE"
"if"            return "IF"

//Otros
"System.out.println"    return "PRINTLN"
"System.out.print"      return "PRINT"

//Signos de puntuacion
":"             return "DOS_P"
";"             return "P_COMA"
","             return "COMA"

//Operadores aritmeticos
"+"             return "MAS"
"-"             return "MENOS"
"*"             return "POR"
"/"             return "DIV"
"%"             return "MOD"

//Operadores de asignacion
"="             return "ASIGNACION"
"+="            return "MAS_ASIGNACION"
"-="            return "MENOS_ASIGNACION"
"*="            return "POR_ASIGNACION"
"/="            return "DIV_ASIGNACION"
"%="            return "MOD_ASIGNACION"

//Operadores de comparacion
"=="            return "IGUAL"
"!="            return "DIFERENTE"
"<"             return "MENOR"
">"             return "MAYOR"
"<="            return "MENOR_IGUAL"
">="            return "MAYOR_IGUAL"

//Operadores logicos
"&&"            return "AND"
"||"            return "OR"
"!"             return "NOT"

//Operadores de incremento/decremento
"++"            return "MAS_MAS"
"--"            return "MENOS_MENOS"

//Delimitadores
"{"             return "LLAVE_A"
"}"             return "LLAVE_C"
'('						  return 'PAR_A'
")"             return "PAR_C"

//Otros simbolos
"."             return "PUNTO"
"["             return "COR_A"
"]"             return "COR_C"

//Valores
"true"          return "TRUE"
"false"         return "FALSE"
\"[^\"]*\"				{ yytext = yytext.substr(0,yyleng-0); return 'CADENA'; }
"'"[^]"'"  				              return 'CHAR_EXP'
(()?[a-zA-Z]+(|[a-zA-Z0-9]+)*)  return 'ID'
[0-9]+("."[0-9]+)\b             return 'DECIMAL'
[0-9]+\b                        return 'ENTERO'

[ \t\n\r]+          /* Ignorar espacios en blanco y saltos de línea */
<<EOF>>                 return 'EOF'
.                       {Parser.yy.Err.push(new Parser.yy.InsErr("Lexico",yylloc.first_line," en la columna: " + yylloc.first_column + ". Valor: " + yytext + ". No pertenece al lenguaje")); }
/lex

/*-------------------------SINTACTICO-------------------------*/

// Asociación y precedencia
%left 'OR'
%left 'AND'
%left 'NOT'
%left 'IGUAL' 'DIFERENTE'
%left 'MAYOR' 'MENOR' 'MAYOR_IGUAL' 'MENOR_IGUAL'
%left 'MAS' 'MENOS'
%left 'POR' 'DIV' 'MOD'
%left 'umenos'
%left 'MAS_MAS' 'MENOS_MENOS'

%start s

%%

//Definición de la gramática
s
//TODO: Retornar la raiz
  : declaracion_paquete s0 EOF   { $2.setPaquete($1); return $2; }
;

s0
  : declaracion_imports declaracion_clase { $$ = new yy.Archivo(this._$.first_line, this._$.first_column, null, $1, $2); }
;

declaracion_paquete
  : PACKAGE nombre_paquete P_COMA   { $$ = new yy.Package(this._$.first_line, this._$.first_column, $2); }
;

declaracion_imports
  : declaracion_imports declaracion_import_lista  { $$ = $1; $1.push($2) }
  |                                               { $$ = [] }
;

declaracion_import_lista
  : IMPORT nombre_paquete P_COMA    { $$ = new yy.Import(this._$.first_line, this._$.first_column, $2); }
;

nombre_paquete
  : nombre_paquete PUNTO ID { $$ = $1+$2+$3; }
  | ID                      { $$ = $1; }
;

declaracion_clase
  : modificador_acceso FINAL CLASS ID extender LLAVE_A instrucciones LLAVE_C    { $$ = new yy.Clase(this._$.first_line, this._$.first_column, $1, true, $4, $5, $7); }
  | modificador_acceso CLASS ID extender LLAVE_A instrucciones LLAVE_C          { $$ = new yy.Clase(this._$.first_line, this._$.first_column, $1, false, $3, $4, $6); }
  | FINAL CLASS ID extender LLAVE_A instrucciones LLAVE_C                       { $$ = new yy.Clase(this._$.first_line, this._$.first_column, 1, true, $3, $4, $6); }
  | CLASS ID extender LLAVE_A instrucciones LLAVE_C                             { $$ = new yy.Clase(this._$.first_line, this._$.first_column, 1, false, $2, $3, $5); }
;

extender
  : EXTENDS ID  { $$ = $2; }
  |             { $$ = ""; }
;


instrucciones
  : instrucciones instruccion { $$ = $1; $$.push($2); }
  |                           { $$ = []; }
;

instruccion
  : declaracion             {$$ = $1} //*****
  | llamada_funcion         {$$ = $1} //*****
  | asignacion              {$$ = $1} //*****
  | imprimir                {$$ = $1} //*****
  | imprimir_ln             {$$ = $1} //*****
  | instruccion_if          {$$ = $1} //*****
  | switch                  {$$ = $1} //*****
  | for                     {$$ = $1} //*****
  | while                   {$$ = $1} //*****
  | do_while                {$$ = $1} //*****
  | continue                {$$ = $1} //*****
  | break                   {$$ = $1} //*****
  | return                  {$$ = $1} //*****
  | funcion_main            {$$ = $1} //*****
;

for
  : FOR PAR_A tipo_variable_primitivo ID ASIGNACION exp P_COMA exp P_COMA asignacion_para PAR_C LLAVE_A instrucciones LLAVE_C
  {
    let declaracion = new yy.DeclaracionVariable(this._$.first_line, this._$.first_column, $4, $6, $3, true, false, 1);
    $$ = new yy.For(this._$.first_line, this._$.first_column, declaracion, null, $8,  $10, $13);
  }
  | FOR PAR_A asignacion exp P_COMA asignacion_para PAR_C LLAVE_A instrucciones LLAVE_C
  {
    $$ = new yy.For(this._$.first_line, this._$.first_column, null, $3, $4,  $6, $9);
  }
;

asignacion
  : ID tipo_igual exp P_COMA  { $$ = new yy.Asignacion(this._$.first_line, this._$.first_column, $1, $2, $3); }
  | ID MAS_MAS P_COMA         { $$ = new yy.Asignacion(this._$.first_line, this._$.first_column, $1, 1, new yy.MasMas(this._$.first_line, this._$.first_column, $1)); }
  | ID MENOS_MENOS P_COMA     { $$ = new yy.Asignacion(this._$.first_line, this._$.first_column, $1, 1, new yy.MenosMenos(this._$.first_line, this._$.first_column, $1)); }
;

asignacion_para
  : ID tipo_igual exp         { $$ = new yy.Asignacion(this._$.first_line, this._$.first_column, $1, $2, $3); }
  | ID MAS_MAS                { $$ = new yy.Asignacion(this._$.first_line, this._$.first_column, $1, 1, new yy.MasMas(this._$.first_line, this._$.first_column, $1)); }
  | ID MENOS_MENOS            { $$ = new yy.Asignacion(this._$.first_line, this._$.first_column, $1, 1, new yy.MenosMenos(this._$.first_line, this._$.first_column, $1)); }
;

modificador_acceso
  : PUBLIC      { $$ = new 1 }
  | PROTECTED   { $$ = new 2 }
  | PRIVATE     { $$ = new 3 }
;

declaracion
  : modificador_acceso tipo_variable_primitivo s2
  | modificador_acceso FINAL tipo_variable_primitivo s2
  | modificador_acceso FINAL STATIC tipo_variable_primitivo s2
  | modificador_acceso STATIC FINAL tipo_variable_primitivo s2
  | STATIC tipo_variable_primitivo s2
  | STATIC FINAL tipo_variable_primitivo s2
  | FINAL tipo_variable_primitivo s2
  | FINAL STATIC tipo_variable_primitivo s2
  | tipo_variable_primitivo s2
;

parametro
  : tipo_variable_primitivo ID { $$ = new yy.Variable($2, $1, null, true); }
;

s2
  : ID declaracion_funcion   { $$ = $1; $$.push(true); }
  | def_variables
  {
     $$ = yy.DeclaracionVariable(this._$.first_line, this._$.first_column, $1, null, null, true, false, null);
  }
;

declaracion_funcion
  : PAR_A PAR_C LLAVE_A instrucciones LLAVE_C
  {
    $$ = yy.DeclaracionFuncion(this._$.first_line, this._$.first_column, "", $4, null, [], false, null)
  }
  | PAR_A lista_parametros PAR_C LLAVE_A instrucciones LLAVE_C
  { $$ = $2; $$.push($5); }
;

def_variables
  : ID lista_variables    { $$ = $1; $1.push($2); }
;

lista_variables
  : ASIGNACION exp P_COMA { $$ = $2 }
  | COMA def_variables    { $$ = $2 }
  | P_COMA                { $$ = null }
;

lista_parametros
  : lista_parametros COMA parametro { $$ = $1; $1.push($3) }
  | parametro { $$ = $1 }
;

llamada_funcion
  : ID PAR_A PAR_C P_COMA { $$ = new yy.LlamadaFuncion(this._$.first_line, this._$.first_column, $1, []) }
  | ID PAR_A lista_expresiones PAR_C P_COMA   { $$ = new yy.LlamadaFuncion(this._$.first_line, this._$.first_column, $1, $3) }
;

tipo_igual
  : ASIGNACION          { $$ = 1}
  | MAS_ASIGNACION      { $$ = 2}
  | MENOS_ASIGNACION    { $$ = 3}
;

funcion_main
  : VOID MAIN PAR_A STRING LLAVE_A LLAVE_C ID PAR_C LLAVE_A instrucciones LLAVE_C  { $$ = new yy.FuncionMain(this._$.first_line, this._$.first_column, $10); }
;

exp
//Operaciones aritmeticas
  : MENOS exp %prec umenos  { let negativo = new yy.Nativo(this._$.first_line, this._$.first_column, -1, 2); $$ = new yy.Multiplicacion(this._$.first_line, this._$.first_column, negativo, $2); }
  | exp MAS exp             { $$ = new yy.Suma(this._$.first_line, this._$.first_column, $1, $3); }
  | exp MENOS exp           { $$ = new yy.Resta(this._$.first_line, this._$.first_column, $1, $3); }
  | exp POR exp             { $$ = new yy.Multiplicacion(this._$.first_line, this._$.first_column, $1, $3); }
  | exp DIV exp             { $$ = new yy.Division(this._$.first_line, this._$.first_column, $1, $3); }
  | exp MOD exp             { $$ = new yy.Modulo(this._$.first_line, this._$.first_column, $1, $3); }
  | PAR_A exp PAR_C         { $$ = $2 }
//Operaciones de comparacion
  | exp MAYOR exp           { $$ = new yy.Mayor(this._$.first_line, this._$.first_column, $1, $3); }
  | exp MENOR exp           { $$ = new yy.Menor(this._$.first_line, this._$.first_column, $1, $3); }
  | exp MAYOR_IGUAL exp     { $$ = new yy.MayorIgual(this._$.first_line, this._$.first_column, $1, $3); }
  | exp MENOR_IGUAL exp     { $$ = new yy.MenorIgual(this._$.first_line, this._$.first_column, $1, $3); }
  | exp IGUAL exp           { $$ = new yy.Igual(this._$.first_line, this._$.first_column, $1, $3); }
  | exp DIFERENTE exp       { $$ = new yy.Diferente(this._$.first_line, this._$.first_column, $1, $3); }
//Operaciones logicas
  | exp AND exp             { $$ = new yy.And(this._$.first_line, this._$.first_column, $1, $3); }
  | exp OR exp              { $$ = new yy.Or(this._$.first_line, this._$.first_column, $1, $3); }
  | NOT exp                 { $$ = new yy.Not(this._$.first_line, this._$.first_column, $2); }
//Valores primitivos
  | ENTERO                  { $$ = new yy.Nativo(this._$.first_line, this._$.first_column, $1, 2); }
  | DECIMAL                 { $$ = new yy.Nativo(this._$.first_line, this._$.first_column, $1, 3); }
  | ID                      { $$ = new yy.Id(this._$.first_line, this._$.first_column, $1); }
  | TRUE                    { $$ = new yy.Nativo(this._$.first_line, this._$.first_column, $1, 5); }
  | FALSE                   { $$ = new yy.Nativo(this._$.first_line, this._$.first_column, $1, 5); }
  | CADENA                  { $$ = new yy.Nativo(this._$.first_line, this._$.first_column, $1, 6); }
  | CHAR_EXP                { $$ = new yy.Nativo(this._$.first_line, this._$.first_column, $1, 4); }
//Funciones
  | llamada_funcion_exp     { $$ = $1 }
;

llamada_funcion_exp
  : ID PAR_A PAR_C                    { $$ = new yy.LlamadaFuncion(this._$.first_line, this._$.first_column, $1, []) }
  | ID PAR_A lista_expresiones PAR_C  { $$ = new yy.LlamadaFuncion(this._$.first_line, this._$.first_column, $1, $3) }
;

lista_expresiones
  : lista_expresiones COMA exp  { $$ = $1; $$.push($3); }
  | exp { $$ = $1; }
;

tipo_variable_primitivo
  : VOID      { $$ = new 1; }
  | INT       { $$ = new 2; }
  | FLOAT     { $$ = new 3; }
  | CHAR      { $$ = new 4; }
  | BOOLEAN   { $$ = new 5; }
  | STRING    { $$ = new 6; }
  | ID        { $$ = new 7; }
;

instruccion_if
  : if                      { $$ = new yy.InstruccionIf($1); }
  | if else                 { $$ = new yy.InstruccionIf($1); $1.push($2); }
  | if lista_else_if        { $$ = new yy.InstruccionIf($1); $1.push($2); }
  | if lista_else_if else   { $$ = new yy.InstruccionIf($1); $1.push($2); $1.push($3); }
;

if
  : IF PAR_A exp PAR_C LLAVE_A instrucciones LLAVE_C      { $$ = new yy.If(this._$.first_line, this._$.first_column, $3, $6); }
;

else
  : ELSE LLAVE_A instrucciones LLAVE_C                    { $$ = new yy.If(this._$.first_line, this._$.first_column, new yy.Nativo(this._$.first_line, this._$.first_column, "false", 5), $3); }
;

else_if
  : ELSE IF PAR_A exp PAR_C LLAVE_A instrucciones LLAVE_C { $$ = new yy.If(this._$.first_line, this._$.first_column, $4, $7); }
;

lista_else_if
  : lista_else_if else_if { $$ = $1; $1.push($2); }
  | else_if               { $$ = $1; }
;

imprimir
  : PRINT PAR_A exp PAR_C P_COMA { $$ = new yy.Imprimir(this._$.first_line, this._$.first_column, $3); }
;

imprimir_ln
  : PRINTLN PAR_A exp PAR_C P_COMA { $$ = new yy.ImprimirLn(this._$.first_line, this._$.first_column, $3); }
;

switch
  : SWITCH PAR_A exp PAR_C LLAVE_A lista_case LLAVE_C  { $$ = new yy.Switch(this._$.first_line, this._$.first_column, $3, $6); }
;

lista_case
  : lista_case case       { $$ = $1; $1.push($2); }
  | case                  { $$ = $1; }
  | default               { $$ = $1; }
  | lista_case default    { $$ = $1; $1.push($2); }
;

case
  : CASE exp DOS_P instrucciones  { $$ = new yy.Caso($2, $4, false); }
;

default
  : DEFAULT DOS_P instrucciones   { $$ = new yy.Caso(null, $3, true); }
;

while
  : WHILE PAR_A exp PAR_C LLAVE_A instrucciones LLAVE_C   { $$ = new While(this._$.first_line, this._$.first_column, $3, $6); }
;

do_while
  : DO LLAVE_A instrucciones LLAVE_C WHILE PAR_A exp PAR_C P_COMA   { $$ = new DoWhile(this._$.first_line, this._$.first_column, $3, $7); }
;

continue
  : CONTINUE P_COMA       { $$ = new yy.ContinueI(this._$.first_line, this._$.first_column); }
;

break
  : BREAK P_COMA          { $$ = new yy.BreakI(this._$.first_line, this._$.first_column); }
;

return
  : RETURN exp P_COMA     { $$ = new yy.ReturnI(this._$.first_line, this._$.first_column, true, $2); }
  | RETURN P_COMA         { $$ = new yy.ReturnI(this._$.first_line, this._$.first_column, false, null); }
;
