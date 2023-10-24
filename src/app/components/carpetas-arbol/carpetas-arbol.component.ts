import { ChangeDetectorRef, Component } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { FileNode, FileNodeType } from './model/file-node';
import { DialogBodyComponent } from '../dialog-body/dialog-body.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

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
      }
    ]
  },
  {
    name: 'Applications',
    type: FileNodeType.folder,
    children: [
      {
        name: 'Calendar',
        type: FileNodeType.file
      },
      {
        name: 'Chrome',
        type: FileNodeType.file
      },
      {
        name: 'Webstorm',
        type: FileNodeType.file
      }
    ]
  },
];

@Component({
  selector: 'app-carpetas-arbol',
  templateUrl: './carpetas-arbol.component.html',
  styleUrls: ['./carpetas-arbol.component.css']
})
export class CarpetasArbolComponent {
  nestedTreeControl: NestedTreeControl<FileNode>;
  nestedDataSource: MatTreeNestedDataSource<FileNode>;


  constructor(private matDialog: MatDialog, private snackBar: MatSnackBar, private cd: ChangeDetectorRef) {
    this.nestedTreeControl = new NestedTreeControl<FileNode>(this._getChildren);
    this.nestedDataSource = new MatTreeNestedDataSource();
    this.nestedDataSource.data = FILES_DATA
  }

  nodoSelected: any

  hasNestedChild(_: number, nodeData: FileNode): boolean {
    return nodeData.type === FileNodeType.folder;
  }

  private _getChildren = (node: FileNode) => node.children;

  //Para seleccionar un nodo
  selectNode(node: FileNode) {
    console.log(node);
  }

  crearCarpeta() {

  }

  crearArchivo() {

  }

  //Dialog
  openDialog(title: string, isPackage: boolean) {
    let dialogRef = this.matDialog.open(DialogBodyComponent, {
      data: { title: title, isPackage: isPackage },
    })

    dialogRef.afterClosed().subscribe(result => {
      if (!(result.closed)) {
        if (result.isPackage) {
          if (result.name.trim() <= 0) {
            this.openSnackBar("Ingresa un nombre valido");
            return
          }
          //TODO: verificar si ya existe

          //TODO: agregar nodo al arbol
          this.nodoSelected.children.push(
            {
              name: result.name,
              type: FileNodeType.folder
            }
          )
          //this.openSnackBar("Paquete: " + result.name);
        } else {
          if (result.name.trim() <= 0) {
            this.openSnackBar("Ingresa un nombre valido");
            return
          }
          //TODO: verificar si ya existe

          //TODO: agregar nodo al arbol
          this.nodoSelected.children.push(
            {
              name: result.name,
              type: FileNodeType.file
            }
          )
          //this.openSnackBar("Archivo: " + result.name);
        }
      }
    })
  }

  //SnackBar
  openSnackBar(message: string) {
    this.snackBar.open(message, "X", { duration: 1300 });
  }

}
