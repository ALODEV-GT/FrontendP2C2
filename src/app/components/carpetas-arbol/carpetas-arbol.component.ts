import { Component } from '@angular/core';
import { FileNode, FileNodeType } from './model/file-node';
import { DialogBodyComponent } from '../dialog-body/dialog-body.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

//Prueba
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';

export interface ExampleFlatNode {
  expandable: boolean,
  archivo: FileNode,
  name: string,
  type: FileNodeType,
  level: number
}

export interface Archivo{
  archivo: FileNode,
  complete_name: string
}

let FILES_DATA: FileNode[] = [
  {
    name: 'Nombre_proyecto',
    type: FileNodeType.folder,
    children: [
      {
        name: 'schema.sql',
        type: FileNodeType.file,
        code: {
          language: 'sql',
          uri: 'schema.sql',
          value: [
            'CREATE TABLE dbo.EmployeePhoto (',
            '  EmployeeId INT NOT NULL PRIMARY KEY,',
            '  Photo VARBINARY(MAX) FILESTREAM NULL,',
            '  MyRowGuidColumn UNIQUEIDENTIFIER NOT NULL ROWGUIDCOL UNIQUE DEFAULT NEWID()',
            ');'
          ].join('\n')
        }
      },
      {
        name: 'component.style.css',
        type: FileNodeType.file,
        code: {
          language: 'css',
          uri: 'component.style.css',
          value: [
            'html {',
            '  background-color: #e2e2e2;',
            '  margin: 0;',
            '  padding: 0;',
            '}',
            '',
            'body {',
            '  background-color: #fff;',
            '  border-top: solid 10px #000;',
            '  color: #333;',
            '  font-size: .85em;',
            '  font-family: "Segoe UI","HelveticaNeue-Light", sans-serif;',
            '  margin: 0;',
            '  padding: 0;',
            '}'
          ].join('\n')
        }
      },
      {
        name: 'json.json',
        type: FileNodeType.file,
        code: {
          language: 'json',
          uri: 'main.json',
          value: [
            '{',
            '    "$schema": "http://myserver/foo-schema.json",',
            '    "p1": "v3",',
            '    "p2": false',
            '}'
          ].join('\n'),
          schemas: [
            {
              uri: 'http://custom/schema.json',
              schema: {
                type: 'object',
                properties: {
                  type: {
                    enum: ['button', 'textbox']
                  }
                }
              }
            }
          ]
        }
      },
      {
        name: 'javascript.js',
        type: FileNodeType.file,
        code: {
          language: 'javascript',
          uri: 'main.js',
          dependencies: ['@types/node'],
          value: [
            '// JavaScript Example',
            `import * as fs from 'fs';`,
            '',
            'class Person {',
            '  greet() {',
            `    console.log('hello there');`,
            `    fs.mkdir('folder');`,
            '  }',
            '}'
          ].join('\n')
        }
      },
      {
        name: 'typescript.ts',
        type: FileNodeType.file,
        code: {
          language: 'typescript',
          uri: 'main.ts',
          dependencies: [
            '@types/node',
            '@ngstack/translate',
            '@ngstack/code-editor'
          ],
          value: [
            '// TypeScript Example',
            `import { TranslateModule, TranslateService } from '@ngstack/translate';`,
            `import { CodeEditorModule } from '@ngstack/code-editor';`,
            `import * as fs from 'fs';`,
            '',
            'export class MyClass {',
            '  constructor(translate: TranslateService) {',
            '    ',
            '  }',
            '}'
          ].join('\n')
        }
      },
      {
        name: 'Applications',
        type: FileNodeType.folder,
        children: [
          {
            name: 'schema.sql',
            type: FileNodeType.file,
            code: {
              language: 'sql',
              uri: 'schema.sql',
              value: [
                'CREATE TABLE dbo.EmployeePhoto (',
                '  EmployeeId INT NOT NULL PRIMARY KEY,',
                '  Photo VARBINARY(MAX) FILESTREAM NULL,',
                '  MyRowGuidColumn UNIQUEIDENTIFIER NOT NULL ROWGUIDCOL UNIQUE DEFAULT NEWID()',
                ');'
              ].join('\n')
            }
          },
          {
            name: 'component.style.css',
            type: FileNodeType.file,
            code: {
              language: 'css',
              uri: 'component.style.css',
              value: [
                'html {',
                '  background-color: #e2e2e2;',
                '  margin: 0;',
                '  padding: 0;',
                '}',
                '',
                'body {',
                '  background-color: #fff;',
                '  border-top: solid 10px #000;',
                '  color: #333;',
                '  font-size: .85em;',
                '  font-family: "Segoe UI","HelveticaNeue-Light", sans-serif;',
                '  margin: 0;',
                '  padding: 0;',
                '}'
              ].join('\n')
            }
          },
          {
            name: 'json.json',
            type: FileNodeType.file,
            code: {
              language: 'json',
              uri: 'main.json',
              value: [
                '{',
                '    "$schema": "http://myserver/foo-schema.json",',
                '    "p1": "v3",',
                '    "p2": false',
                '}'
              ].join('\n'),
              schemas: [
                {
                  uri: 'http://custom/schema.json',
                  schema: {
                    type: 'object',
                    properties: {
                      type: {
                        enum: ['button', 'textbox']
                      }
                    }
                  }
                }
              ]
            }
          },
          {
            name: 'javascript.js',
            type: FileNodeType.file,
            code: {
              language: 'javascript',
              uri: 'main.js',
              dependencies: ['@types/node'],
              value: [
                '// JavaScript Example',
                `import * as fs from 'fs';`,
                '',
                'class Person {',
                '  greet() {',
                `    console.log('hello there');`,
                `    fs.mkdir('folder');`,
                '  }',
                '}'
              ].join('\n')
            }
          },
          {
            name: 'typescript.ts',
            type: FileNodeType.file,
            code: {
              language: 'typescript',
              uri: 'main.ts',
              dependencies: [
                '@types/node',
                '@ngstack/translate',
                '@ngstack/code-editor'
              ],
              value: [
                '// TypeScript Example',
                `import { TranslateModule, TranslateService } from '@ngstack/translate';`,
                `import { CodeEditorModule } from '@ngstack/code-editor';`,
                `import * as fs from 'fs';`,
                '',
                'export class MyClass {',
                '  constructor(translate: TranslateService) {',
                '    ',
                '  }',
                '}'
              ].join('\n')
            }
          }
        ]
      },
    ]
  },

];

@Component({
  selector: 'app-carpetas-arbol',
  templateUrl: './carpetas-arbol.component.html',
  styleUrls: ['./carpetas-arbol.component.css']
})
export class CarpetasArbolComponent {
  //INICIO -> Utilidades para mostrar el arbol de directorios
  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable
  )

  private _transformer = (node: FileNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      archivo: node,
      name: node.name,
      type: node.type,
      level: level,
    };
  };

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(
    private matDialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {
    this.dataSource.data = FILES_DATA;
  }

  nodoSelected: any

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable || node.type == FileNodeType.folder;
  //FIN -> Utilidades para mostrar el arbol de directorios

  //Pestañas
  editors: ExampleFlatNode[] = [];

  //Se ejecuta al seleccionar un archivo
  selectNode(node: ExampleFlatNode) {
    console.log(node);
    this.editors.push(node)
  }

  //Cierra una pestaña segun el indice
  cerrarTab(indice: number) {
    this.editors.splice(indice, 1);
  }

  //Dialog para agregar carpetas o archivos
  openDialog(title: string, isPackage: boolean) {
    let dialogRef = this.matDialog.open(DialogBodyComponent, {
      data: { title: title, isPackage: isPackage },
    })

    dialogRef.afterClosed().subscribe(result => {
      if (!(result.closed)) {
        if (result.isPackage) {
          result.name = result.name.replace(/\s/g, "");
          result.name = result.name.replace(/\./g, '_');
          if (result.name.trim() <= 0) {
            this.openSnackBar("Ingresa un nombre valido");
            return
          }

          // verificar si ya existe
          if (this.existe(this.nodoSelected.archivo.children, result)) {
            this.openSnackBar("Ya existe un paquete con este nombre.");
            return
          }

          // agregar nodo al arbol
          this.nodoSelected.archivo.children.push(
            {
              name: result.name,
              type: FileNodeType.folder,
              children: []
            }
          )
          this.dataSource.data = [...FILES_DATA];
          this.treeControl.expandAll();
          this.openSnackBar(`Paquete ${result.name} creado`);
        } else {
          result.name = result.name.replace(/\s/g, "");
          result.name = result.name.replace(/\./g, '_');
          if (result.name.trim() <= 0) {
            this.openSnackBar("Ingresa un nombre valido");
            return
          }
          result.name = result.name + ".java"
          //verificar si ya existe
          if (this.existe(this.nodoSelected.archivo.children, result)) {
            this.openSnackBar("Ya existe un archivo con este nombre.");
            return
          }

          //agregar nodo al arbol
          this.nodoSelected.archivo.children.push(
            {
              name: result.name,
              type: FileNodeType.file,
              code: {
                language: 'java',
                uri: result.name,
                value: [
                  ' '
                ].join('\n')
              }
            }
          )
          this.dataSource.data = [...FILES_DATA];
          this.treeControl.expandAll();
          this.openSnackBar(`Archivo ${result.name} creado`);
        }
      }
    })
  }

  //SnackBar
  openSnackBar(message: string) {
    this.snackBar.open(message, "X", { duration: 2000 });
  }

  //Busca paquetes o archivos con el mismo nombre
  existe(hijos: FileNode[], nuevoArchivo: any): boolean {
    for (let i = 0; i < hijos.length; i++) {
      if (hijos[i].name == nuevoArchivo.name) {
        return true;
      }
    }
    return false
  }

  //Ejecucion de archivos
  archivos: Archivo[] = []

  recorrerArbol(nodo: FileNode, nombrePadre: string) {
    if (nodo.type == FileNodeType.file) {
      this.archivos.push({archivo: nodo, complete_name: nombrePadre + "." + nodo.name})
    } else {
      for (let i = 0; i < nodo.children!.length; i++) {
        this.recorrerArbol(nodo.children![i], nombrePadre + "." + nodo.name)
      }
    }
  }

  recorrer() {
    this.archivos = []
    this.recorrerArbol(FILES_DATA[0], "")
    for (let i = 0; i < this.archivos.length; i++) {
      console.log(this.archivos[i].complete_name);
    }
  }

  //TODO: Analizar todos los archivos lexicamente y sintacticamente.
  ejecutar(){

  }
}
