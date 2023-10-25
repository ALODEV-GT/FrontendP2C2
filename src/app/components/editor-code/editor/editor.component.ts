import { Component, Input } from '@angular/core';
import { Proyecto } from '../model/Proyecto';
import { ExampleFlatNode } from '../../carpetas-arbol/carpetas-arbol.component';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent {
  @Input() proyecto!: ExampleFlatNode;
  content: any;

  ngOnInit(): void {
    this.content = this.proyecto.archivo.code?.value || "";
  }
}
