import { Component } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FileDatabase } from './model/file-database';

interface ExampleFlatNode {
  expandable: boolean
  name: string
  level: number
}

export interface FoodNode {
  name: string
  children?: FoodNode[]
}

const FILES_DATA: FoodNode[] = [
  {
    name: 'Package1',
    children: [{ name: 'archivo1.java' }, { name: 'archivo2.java' }, { name: 'archivo3.java' }],
  },
  {
    name: 'Package2',
    children: [
      {
        name: 'Package2-1',
        children: [{ name: 'archivo1.java' }, { name: 'archivo2.java' }],
      },
      {
        name: 'Package2-2',
        children: [{ name: 'archivo1.java' }, { name: 'archivo2.java' }],
      },
    ],
  },
];

@Component({
  selector: 'app-carpetas-arbol',
  templateUrl: './carpetas-arbol.component.html',
  styleUrls: ['./carpetas-arbol.component.css'],
  providers: [FileDatabase],
})
export class CarpetasArbolComponent {

  push() {
    FILES_DATA.push({
      name: "nuevo_archivo",
      children: [{name: "arhcivo.css"},{name:"arhcivo.js"}]
    });
    this.dataSource.data = FILES_DATA
    console.log("Agregando nuevo archivo 1");
  }

  constructor(database: FileDatabase) {
    this.dataSource.data = FILES_DATA
  }

  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level
    }
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable
  )

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children
  )

  dataSource = new MatTreeFlatDataSource(
    this.treeControl, this.treeFlattener
  )

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable
}
